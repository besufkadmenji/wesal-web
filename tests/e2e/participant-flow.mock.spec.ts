import { expect, test, type Page } from "@playwright/test";

const conversation = {
  id: "conversation-e2e",
  listingId: "listing-e2e",
  userId: "user-e2e",
  providerId: "provider-e2e",
  status: "ACTIVE",
  expiresAt: "2099-01-01T00:00:00.000Z",
  closedAt: null,
  closeReason: null,
  feeCycle: 1,
  unreadCount: 1,
  customerFeePaidAt: "2026-01-01T00:00:00.000Z",
  providerFeePaidAt: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  access: {
    feeRequired: true,
    feeAmount: 10,
    paidAt: "2026-01-01T00:00:00.000Z",
    canSend: true,
    expiresAt: "2099-01-01T00:00:00.000Z",
    feeCycle: 1,
  },
  lastMessage: {
    id: "message-e2e",
    conversationId: "conversation-e2e",
    senderId: "provider-e2e",
    senderType: "PROVIDER",
    kind: "TEXT",
    content: "Welcome to the participant conversation",
    metadata: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    sender: { id: "provider-e2e", name: "E2E Provider" },
  },
  listing: {
    id: "listing-e2e",
    name: "E2E Featured Service",
    description: "Service",
    price: 100,
    type: "FREE",
    status: "ACTIVE",
    promotionStatus: "NONE",
    promotionCycle: 0,
    categoryId: "category-e2e",
    providerId: "provider-e2e",
    photos: [],
    category: {
      id: "category-e2e",
      nameAr: "خدمة",
      nameEn: "Service",
      rulesAr: "الشروط",
      rulesEn: "Terms",
      contractDocumentEnabled: true,
      contractDocumentText: "Contract terms",
    },
    provider: { id: "provider-e2e", name: "E2E Provider" },
  },
  user: { id: "user-e2e", name: "E2E Customer" },
  provider: { id: "provider-e2e", name: "E2E Provider" },
};

const pendingContract = {
  id: "contract-e2e",
  publicId: "CNT-E2E",
  conversationId: conversation.id,
  listingId: conversation.listingId,
  clientId: conversation.userId,
  providerId: conversation.providerId,
  categoryId: "category-e2e",
  version: 1,
  pricingVersion: 1,
  status: "PENDING",
  supersedesContractId: null,
  agreedPrice: 500,
  depositPercent: 10,
  downPayment: 50,
  commissionPercent: 2,
  commissionAmount: 10,
  vatRate: 15,
  vatAmount: 1.5,
  totalPayable: 61.5,
  providerNetAmount: 490,
  customerAddress: "Riyadh",
  customerLatitude: 24.7,
  customerLongitude: 46.7,
  providerAddress: "Riyadh",
  providerLatitude: 24.7,
  providerLongitude: 46.7,
  deliveryCompanyId: null,
  deliveryCompanyNameAr: null,
  deliveryCompanyNameEn: null,
  deliveryTimeDays: null,
  categoryRulesAr: "الشروط",
  categoryRulesEn: "Terms",
  contractDocumentText: "Contract terms",
  maxCompletionDays: 30,
  maxTerminationDays: 3,
  rejectionReason: null,
  acceptedAt: null,
  rejectedAt: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  signatures: [],
  client: conversation.user,
  provider: conversation.provider,
  conversation: {
    id: conversation.id,
    status: conversation.status,
    listing: conversation.listing,
  },
  supersedesContract: null,
};

const providerComplaint = {
  id: "complaint-e2e",
  publicId: "CMP-E2E",
  reporterId: conversation.providerId,
  reporterType: "PROVIDER",
  listingId: conversation.listingId,
  conversationId: conversation.id,
  contractId: pendingContract.id,
  title: "Provider complaint",
  description: "The customer did not provide the required details.",
  attachments: [],
  status: "UNDER_REVIEW",
  reviewedAt: "2026-01-02T00:00:00.000Z",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-02T00:00:00.000Z",
  listing: { id: conversation.listingId, name: conversation.listing.name },
  contract: { id: pendingContract.id, version: 1, status: "PENDING" },
  messages: [
    {
      id: "complaint-message-e2e",
      complaintId: "complaint-e2e",
      authorId: "admin-e2e",
      authorType: "ADMIN",
      content: "Administration is reviewing this complaint.",
      createdAt: "2026-01-02T00:00:00.000Z",
    },
  ],
};

const providerListing = {
  ...conversation.listing,
  status: "ACTIVE",
  type: "FEATURED",
  promotionStatus: "ACTIVE",
  promotionCycle: 1,
  featuredStartsAt: "2026-01-01T00:00:00.000Z",
  featuredEndsAt: "2026-01-31T00:00:00.000Z",
};

async function mockParticipantApi(
  page: Page,
  role: "user" | "provider" = "user",
) {
  let providerFeePaid = role === "user";
  const currentConversation = () => ({
    ...conversation,
    providerFeePaidAt: providerFeePaid ? "2026-01-01T00:00:00.000Z" : null,
    access: {
      ...conversation.access,
      paidAt: providerFeePaid ? "2026-01-01T00:00:00.000Z" : null,
      canSend: providerFeePaid,
    },
  });
  const currentProviderListing = () => ({ ...providerListing });

  await page.context().addCookies([
    { name: "e2e-role", value: role, domain: "127.0.0.1", path: "/" },
    { name: "token", value: "e2e-token", domain: "127.0.0.1", path: "/" },
    { name: "lang", value: "en", domain: "127.0.0.1", path: "/" },
  ]);
  await page.route("**/api/proxy/graphql", async (route) => {
    const body = route.request().postDataJSON() as {
      operationName?: string;
      query?: string;
      variables?: Record<string, unknown>;
    };
    const operation = body.operationName || body.query || "";
    let data: Record<string, unknown> = {};
    if (operation.includes("meUser")) {
      data = {
        meUser:
          role === "user" ? { id: "user-e2e", name: "E2E Customer" } : null,
      };
    } else if (operation.includes("meProvider")) {
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
    } else if (operation.includes("Conversations")) {
      data = {
        conversations: {
          items: [currentConversation()],
          meta: {
            total: 1,
            page: 1,
            limit: 50,
            totalPages: 1,
            hasNext: false,
            hasPrevious: false,
          },
        },
      };
    } else if (operation.includes("ConversationById")) {
      data = { conversation: currentConversation() };
    } else if (operation.includes("Messages")) {
      data = {
        messages: {
          items: [conversation.lastMessage],
          meta: {
            total: 1,
            page: 1,
            limit: 100,
            totalPages: 1,
            hasNext: false,
            hasPrevious: false,
          },
        },
      };
    } else if (operation.includes("Contracts")) {
      const items = role === "provider" ? [pendingContract] : [];
      data = {
        contracts: {
          items,
          meta: {
            total: items.length,
            page: 1,
            limit: 20,
            totalPages: items.length,
            hasNext: false,
            hasPrevious: false,
          },
        },
      };
    } else if (operation.includes("MyComplaints")) {
      const items = role === "provider" ? [providerComplaint] : [];
      data = {
        myComplaints: {
          items,
          meta: {
            total: items.length,
            page: 1,
            limit: 1,
            totalPages: items.length,
            hasNext: false,
            hasPrevious: false,
          },
        },
      };
    } else if (operation === "MyListing") {
      data = { myListing: currentProviderListing() };
    } else if (operation.includes("myListings")) {
      data = {
        myListings: {
          items: [currentProviderListing()],
          meta: {
            total: 17,
            page:
              Number(
                body.variables?.paginationInput &&
                  (body.variables.paginationInput as { page?: number }).page,
              ) || 1,
            limit: 16,
            totalPages: 2,
            hasNext: true,
            hasPrevious: false,
          },
        },
      };
    } else if (operation.includes("IsProviderFavorite")) {
      data = { isProviderFavorite: false };
    } else if (operation.includes("CreateMessage")) {
      data = {
        createMessage: {
          ...conversation.lastMessage,
          id: "message-sent",
          senderId: "user-e2e",
          senderType: "USER",
          content: (body.variables?.input as { content: string }).content,
        },
      };
    } else if (operation.includes("MarkConversationRead")) {
      data = { markConversationRead: { id: conversation.id, unreadCount: 0 } };
    } else if (operation.includes("PayConversationFee")) {
      providerFeePaid = true;
      data = {
        payConversationFee: {
          payment: {
            id: "chat-payment-e2e",
            purpose: "CHAT_PROVIDER",
            status: "COMPLETED",
            amount: 10,
          },
          access: currentConversation().access,
          conversation: currentConversation(),
        },
      };
    } else if (operation.includes("getSetting")) {
      data = {
        getSetting: {
          aboutAr: "",
          aboutEn: "",
          email: "support@example.com",
          phones: [],
          privacyPolicyAr: "",
          privacyPolicyEn: "",
          socialMediaLinks: [],
          termsAr: "",
          termsEn: "",
          whatsappNumber: "",
          rulesAr: "",
          rulesEn: "",
          contractAcceptanceWindowDays: 3,
          contractAcceptanceWindowEnabled: true,
          premiumAdDurationDays: 30,
          premiumAdEnabled: true,
          premiumAdFee: 50,
          vatEnabled: true,
          vatRate: 15,
        },
      };
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ data }),
    });
  });
  await page.routeWebSocket("**/graphql", (ws) => {
    ws.onMessage((raw) => {
      const message = JSON.parse(String(raw)) as { id?: string; type: string };
      if (message.type === "connection_init") {
        ws.send(JSON.stringify({ type: "connection_ack" }));
      }
      if (message.type === "subscribe" && message.id) {
        setTimeout(() => {
          ws.send(
            JSON.stringify({
              id: message.id,
              type: "next",
              payload: {
                data: {
                  messageAdded: {
                    ...conversation.lastMessage,
                    id: "message-realtime",
                    content: "Realtime update",
                  },
                },
              },
            }),
          );
        }, 1_500);
      }
    });
  });
}

test("customer opens the responsive conversation workspace and sends a message", async ({
  page,
}) => {
  await mockParticipantApi(page);
  await page.goto("/en/conversations");
  await expect(
    page.getByRole("heading", { name: "All conversations" }),
  ).toBeVisible();
  await page.getByText("E2E Provider").first().click();
  await expect(page.getByPlaceholder("Write your message")).toBeVisible();
  await expect(page.getByText("Realtime update")).toBeVisible();
  await page.getByPlaceholder("Write your message").fill("A safe message");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByText("A safe message")).toBeVisible();
});

test("customer-only favorites reject a provider principal", async ({
  page,
}) => {
  await mockParticipantApi(page, "provider");
  await page.goto("/en/profile/favorites");
  await expect(page).toHaveURL(/\/en\/?$/);
});

test("mobile conversation detail exposes list navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockParticipantApi(page);
  await page.goto("/en/conversations/conversation-e2e");
  await expect(page.getByRole("button", { name: "Back" })).toBeVisible({
    timeout: 30_000,
  });
});

test("provider pays the chat fee and opens the pending contract", async ({
  page,
}) => {
  await mockParticipantApi(page, "provider");
  await page.goto("/en/conversations/conversation-e2e");

  await expect(page.getByText("Conversation access fee")).toBeVisible();
  await page.getByRole("button", { name: "Pay now" }).click();
  await expect(page.getByPlaceholder("Write your message")).toBeVisible();

  const contractLink = page.getByRole("link", { name: "Accept contract" });
  await expect(contractLink).toBeVisible();
  await expect(contractLink).toHaveAttribute("href", "/contracts/contract-e2e");
});

test("provider sees complaint administration response", async ({ page }) => {
  await mockParticipantApi(page, "provider");
  await page.goto("/en/conversations/conversation-e2e");

  await page.getByRole("button", { name: "Submit complaint" }).click();
  await expect(page.getByText("Provider complaint")).toBeVisible();
  await expect(
    page.getByText("Administration is reviewing this complaint."),
  ).toBeVisible();
});

test("provider featured listing appears on My Ads without a promote page", async ({
  page,
}) => {
  await mockParticipantApi(page, "provider");
  await page.goto("/en/my-listings");

  await expect(page.getByRole("heading", { name: "My Ads" })).toBeVisible();
  await expect(page.getByText("Active")).toBeVisible();
  await expect(page.getByRole("button", { name: "Promote listing" })).toHaveCount(
    0,
  );
  await expect(page.getByRole("button", { name: "Pay now" })).toHaveCount(0);
});

test("provider listing management has pagination and mobile navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockParticipantApi(page, "provider");
  await page.goto("/en/my-listings");

  await expect(page.getByRole("heading", { name: "My Ads" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "2", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await expect(page).toHaveURL(/page=2/);

  await page.getByRole("button", { name: /menu/i }).click();
  await expect(page.getByRole("link", { name: "My Ads" })).toBeVisible();
});
