import type { Page } from "@playwright/test";

/**
 * S4-46: a stateful, in-browser stand-in for the API's contract lifecycle.
 * It answers /api/proxy GraphQL by operation name and moves one contract
 * through its statuses the way the API does, so the web flows can be driven
 * end to end without a database or a payment gateway (D-2: mock gateway).
 * Checkout redirects to a stand-in gateway page (/__gateway/…) that applies
 * the chosen outcome and bounces back to /payments/return, like the API's
 * mock gateway does (S4-10).
 */

type Role = "user" | "provider";
type Status =
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "AWAITING_CUSTOMER_CONFIRMATION"
  | "DELIVERY_IN_PROGRESS"
  | "DISPUTED"
  | "COMPLETED"
  | "CANCELLED";

const STATUS_GROUP: Record<Status, string> = {
  ACCEPTED: "PENDING_PAYMENT",
  IN_PROGRESS: "IN_PROGRESS",
  AWAITING_CUSTOMER_CONFIRMATION: "IN_PROGRESS",
  DELIVERY_IN_PROGRESS: "IN_DELIVERY",
  DISPUTED: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const CONTRACT_ID = "contract-lifecycle-e2e";
export const CONTRACT_NUMBER = 2001;
const NOW = "2026-10-19T09:00:00.000Z";
// 1x1 transparent PNG for signature previews.
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "base64",
);

const listing = {
  id: "listing-lifecycle",
  name: "Lifecycle Plumbing Repair",
  description: "Service",
  price: 300,
  type: "FREE",
  status: "ACTIVE",
  promotionStatus: "NONE",
  promotionCycle: 0,
  categoryId: "category-lifecycle",
  providerId: "provider-e2e",
  photos: [],
  category: {
    id: "category-lifecycle",
    nameAr: "سباكة",
    nameEn: "Plumbing",
    rulesAr: "الشروط",
    rulesEn: "Terms",
    contractDocumentEnabled: true,
    contractDocumentText: "Contract terms",
  },
  provider: { id: "provider-e2e", name: "E2E Provider" },
};

const baseContract = {
  id: CONTRACT_ID,
  publicId: CONTRACT_NUMBER,
  conversationId: "conversation-lifecycle",
  listingId: listing.id,
  clientId: "user-e2e",
  providerId: "provider-e2e",
  categoryId: listing.categoryId,
  version: 1,
  pricingVersion: 1,
  supersedesContractId: null,
  agreedPrice: 300,
  depositPercent: 10,
  downPayment: 30,
  commissionPercent: 2,
  commissionAmount: 6,
  isCharity: false,
  charityAmount: 0,
  vatRate: 15,
  vatAmount: 45,
  totalPayable: 345,
  providerNetAmount: 294,
  customerAddress: "Riyadh",
  customerLatitude: 24.7,
  customerLongitude: 46.7,
  providerAddress: "Riyadh",
  providerLatitude: 24.7,
  providerLongitude: 46.7,
  deliveryCompanyId: null,
  deliveryCompanyNameAr: null,
  deliveryCompanyNameEn: null,
  executionHours: 24,
  categoryRulesAr: "الشروط",
  categoryRulesEn: "Terms",
  contractDocumentText: "Contract terms",
  undertakingTextAr: "",
  undertakingTextEn: "",
  refundPolicyAr: "",
  refundPolicyEn: "",
  maxExecutionHours: 72,
  maxTerminationHours: 24,
  rejectionReason: null as string | null,
  cancellationReason: null as string | null,
  disputeReason: null as string | null,
  paidAt: null as string | null,
  paymentMethod: null as string | null,
  acceptedAt: NOW,
  rejectedAt: null,
  providerCompletedAt: null as string | null,
  deliveryStartedAt: null as string | null,
  deliveryHours: null as number | null,
  confirmationDeadlineAt: null as string | null,
  cancellationRequestedAt: null as string | null,
  disputedAt: null as string | null,
  completedAt: null as string | null,
  cancelledAt: null as string | null,
  createdAt: NOW,
  updatedAt: NOW,
  signatures: [
    {
      id: "signature-provider-acceptance",
      contractId: CONTRACT_ID,
      contractVersion: 1,
      signerId: "provider-e2e",
      signerType: "PROVIDER",
      signatureType: "PROVIDER_ACCEPTANCE",
      signatureData: "provider-signature.png",
      signedAt: NOW,
    },
  ],
  client: { id: "user-e2e", name: "E2E Customer", phone: "+966500000001" },
  provider: { id: "provider-e2e", name: "E2E Provider" },
  conversation: { id: "conversation-lifecycle", status: "ACTIVE", listing },
  supersedesContract: null,
  settlements: [],
  audits: [] as Array<Record<string, unknown>>,
  document: null,
  rating: null as null | { id: string; rating: number; comment: string },
};

/** Mirrors the API's cancellationOutcome (customer only), BRD 4.1.18. */
const previewFor = (contract: {
  status: string;
  totalPayable: number;
  downPayment: number;
  commissionAmount: number;
}) => {
  switch (contract.status) {
    case "ACCEPTED":
      return { outcome: "NO_CHARGE", refundAmount: 0, providerAmount: 0 };
    case "IN_PROGRESS":
      return {
        outcome: "PARTIAL_REFUND",
        refundAmount: contract.totalPayable - contract.downPayment,
        providerAmount: contract.downPayment - contract.commissionAmount,
      };
    case "AWAITING_CUSTOMER_CONFIRMATION":
    case "DELIVERY_IN_PROGRESS":
      return { outcome: "HELD", refundAmount: 0, providerAmount: 0 };
    default:
      return { outcome: "NOT_CANCELLABLE", refundAmount: 0, providerAmount: 0 };
  }
};

export type ContractApi = {
  /** Variables of every mutation, by operation name, in call order. */
  calls: Record<string, Array<Record<string, unknown>>>;
  /** What the other party did meanwhile (seen on the next fetch). */
  serverSide: (status: Status) => void;
  /** Make the contract overdue for the signed-in party. */
  setOverdue: (overdue: boolean) => void;
  /** How the stand-in gateway answers the next checkout (default success). */
  setGatewayOutcome: (outcome: "SUCCEEDED" | "FAILED") => void;
  /** Whether the provider still has the "contract paid" pop-up to see. */
  setPaidNotice: (pending: boolean) => void;
};

export async function mockContractApi(
  page: Page,
  {
    role = "user",
    status = "ACCEPTED",
    lang = "en",
  }: { role?: Role; status?: Status; lang?: "en" | "ar" } = {},
): Promise<ContractApi> {
  let contract = { ...baseContract, status, statusGroup: STATUS_GROUP[status] };
  let overdue = false;
  let gatewayOutcome: "SUCCEEDED" | "FAILED" = "SUCCEEDED";
  let paidNotice = false;
  let attempt = 0;
  let payment = {
    id: "payment-e2e",
    purpose: "CONTRACT",
    status: "PENDING",
    amount: baseContract.totalPayable,
    paymentMethod: "ELECTRONIC",
    contractId: CONTRACT_ID,
    conversationId: baseContract.conversationId,
    listingId: null,
    paidAt: null as string | null,
    failedAt: null as string | null,
  };
  const calls: ContractApi["calls"] = {};
  const transition = (next: Status, extra: Partial<typeof contract> = {}) => {
    contract = {
      ...contract,
      ...extra,
      status: next,
      statusGroup: STATUS_GROUP[next],
      updatedAt: new Date().toISOString(),
    };
  };
  if (status !== "ACCEPTED") {
    contract.paidAt = NOW;
    contract.paymentMethod = "TABBY";
  }
  // BRD 4.1.18 (D-13): cancelled before payment means deleted.
  const removed = () => contract.status === "CANCELLED" && !contract.paidAt;
  const view = () => ({
    ...contract,
    cancellationPreview: role === "user" ? previewFor(contract) : null,
    // The API offers methods to the customer while payment is due.
    paymentMethods:
      role === "user" && contract.status === "ACCEPTED"
        ? ["ELECTRONIC", "TABBY", "TAMARA"]
        : null,
  });

  await page.context().addCookies(
    [
      { name: "e2e-role", value: role },
      { name: "token", value: "e2e-token" },
      { name: "lang", value: lang },
    ].map((cookie) => ({ ...cookie, domain: "127.0.0.1", path: "/" })),
  );

  await page.route("**/api/proxy/graphql", async (route) => {
    const body = route.request().postDataJSON() as {
      operationName?: string;
      query?: string;
      variables?: Record<string, unknown>;
    };
    const operation = body.operationName || "";
    const input = (body.variables?.input ?? body.variables ?? {}) as Record<
      string,
      unknown
    >;
    const now = new Date().toISOString();
    let data: Record<string, unknown> = {};

    if (/mutation/.test(body.query ?? "")) {
      (calls[operation] ??= []).push(input);
    }

    switch (operation) {
      case "meUser":
        data = {
          meUser:
            role === "user"
              ? {
                  id: "user-e2e",
                  name: "E2E Customer",
                  contractSignature: null,
                }
              : null,
        };
        break;
      case "meProvider":
        data = {
          meProvider:
            role === "provider"
              ? {
                  id: "provider-e2e",
                  name: "E2E Provider",
                  status: "ACTIVE",
                  signedContract: { status: "ACTIVE" },
                }
              : null,
        };
        break;
      case "ContractById":
        if (removed()) {
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              data: null,
              errors: [{ message: "Contract not found" }],
            }),
          });
          return;
        }
        data = { contract: view() };
        break;
      case "Contracts":
        data = {
          contracts: {
            items: removed() ? [] : [view()],
            meta: {
              total: 1,
              page: 1,
              limit: 30,
              totalPages: 1,
              hasNext: false,
              hasPrevious: false,
            },
          },
        };
        break;
      case "MyOverdueContracts":
        data = { myOverdueContracts: overdue ? [contract] : [] };
        break;
      case "StartPaymentCheckout":
        attempt += 1;
        payment = {
          ...payment,
          status: "PENDING",
          paymentMethod: String(input.method),
          paidAt: null,
          failedAt: null,
        };
        data = {
          startPaymentCheckout: {
            paymentId: payment.id,
            redirectUrl: `/__gateway/checkout/attempt-${attempt}`,
          },
        };
        break;
      case "PaymentResult":
        data = { payment };
        break;
      case "MyPaidContractNotices":
        data = {
          myPaidContractNotices:
            role === "provider" && paidNotice && contract.paidAt
              ? [{ id: contract.id, publicId: contract.publicId }]
              : [],
        };
        break;
      case "AcknowledgeContractPaid":
        paidNotice = false;
        data = { acknowledgeContractPaid: true };
        break;
      case "ProviderCompleteContract":
        transition("AWAITING_CUSTOMER_CONFIRMATION", {
          providerCompletedAt: now,
          confirmationDeadlineAt: now,
        });
        data = { providerCompleteContract: contract };
        break;
      case "CompleteContract":
        transition("COMPLETED", { completedAt: now });
        data = { completeContract: contract };
        break;
      case "RequestContractCancellation":
        transition("CANCELLED", {
          cancellationReason: String(input.reason),
          cancellationRequestedAt: now,
          cancelledAt: now,
        });
        data = { requestContractCancellation: contract };
        break;
      case "RefuseContractDelivery":
        transition("DISPUTED", {
          disputeReason: String(input.reason),
          disputedAt: now,
          audits: [
            ...contract.audits,
            {
              id: "audit-refused",
              actorType: "USER",
              action: "DELIVERY_REFUSED",
              previousStatus: contract.status,
              newStatus: "DISPUTED",
              reason: String(input.reason),
              createdAt: now,
            },
          ],
        });
        data = { refuseContractDelivery: contract };
        break;
      case "RateContract":
        contract = {
          ...contract,
          rating: {
            id: "rating-e2e",
            rating: Number(input.rating),
            comment: String(input.comment ?? ""),
          },
        };
        data = {
          rateContract: {
            ...contract.rating,
            status: "PUBLISHED",
            createdAt: now,
          },
        };
        break;
      case "ConversationStats":
        data = { conversationStats: { unreadCount: 0 } };
        break;
      case "Conversations":
      case "Notifications":
        data = {
          [operation === "Conversations" ? "conversations" : "notifications"]: {
            items: [],
            meta: {
              total: 0,
              page: 1,
              limit: 10,
              totalPages: 0,
              hasNext: false,
              hasPrevious: false,
            },
          },
        };
        break;
      case "NotificationStats":
        data = {
          notificationStats: {
            totalNotifications: 0,
            unreadCount: 0,
            readCount: 0,
          },
        };
        break;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ data }),
    });
  });

  // The stand-in gateway: settle the attempt, then return like a 303 would.
  await page.route("**/__gateway/checkout/**", async (route) => {
    const now = new Date().toISOString();
    if (gatewayOutcome === "SUCCEEDED") {
      payment = { ...payment, status: "COMPLETED", paidAt: now };
      transition("IN_PROGRESS", {
        paidAt: now,
        paymentMethod: payment.paymentMethod,
      });
      paidNotice = true;
    } else {
      payment = { ...payment, status: "FAILED", failedAt: now };
    }
    await route.fulfill({
      status: 303,
      headers: { location: `/${lang}/payments/return?paymentId=${payment.id}` },
    });
  });

  // Contract PDF and tax invoice (participant routes, through the proxy).
  await page.route("**/api/proxy/contract-documents/**", async (route) => {
    const invoice = route.request().url().includes("/invoice");
    await route.fulfill({
      status: 200,
      contentType: "application/pdf",
      headers: {
        "content-disposition": `attachment; filename="${
          invoice ? `invoice-INV-${CONTRACT_NUMBER}` : `contract-${CONTRACT_ID}`
        }.pdf"`,
      },
      body: Buffer.from("%PDF-1.4\n% e2e\n"),
    });
  });
  await page.route("**/files/**", (route) =>
    route.fulfill({ status: 200, contentType: "image/png", body: PNG }),
  );
  // Realtime stays quiet: acknowledge the socket and never push.
  await page.routeWebSocket("**/graphql", (ws) => {
    ws.onMessage((raw) => {
      const message = JSON.parse(String(raw)) as { type: string };
      if (message.type === "connection_init") {
        ws.send(JSON.stringify({ type: "connection_ack" }));
      }
    });
  });

  return {
    calls,
    serverSide: (next) =>
      transition(
        next,
        next === "AWAITING_CUSTOMER_CONFIRMATION"
          ? { providerCompletedAt: NOW, confirmationDeadlineAt: NOW }
          : {},
      ),
    setOverdue: (value) => {
      overdue = value;
    },
    setGatewayOutcome: (outcome) => {
      gatewayOutcome = outcome;
    },
    setPaidNotice: (pending) => {
      paidNotice = pending;
    },
  };
}
