import { PaymentReturnPage } from "@/components/app/payments/PaymentReturnPage";
import en from "@/config/i18n/locales/en.json";
import { PaymentPurpose, PaymentStatus } from "@/gql/graphql";
import { PaymentService } from "@/services/payment.service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const search = { paymentId: "payment-1" as string | null };
vi.mock("next/navigation", () => ({
  useSearchParams: () => ({ get: () => search.paymentId }),
}));
vi.mock("@/components/app/shared/AppWrapper", () => ({
  AppWrapper: ({ children }: { children: ReactNode }) => <>{children}</>,
}));
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/services/payment.service", () => ({
  PaymentService: { result: vi.fn() },
}));

const payment = (status: PaymentStatus, purpose = PaymentPurpose.Contract) => ({
  id: "payment-1",
  status,
  purpose,
  contractId: "contract-1",
  conversationId: "conversation-1",
  listingId: null,
});

const renderPage = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <PaymentReturnPage />
    </QueryClientProvider>,
  );

describe("PaymentReturnPage (BRD 4.1.17 result pop-ups)", () => {
  beforeEach(() => {
    search.paymentId = "payment-1";
    vi.mocked(PaymentService.result).mockReset();
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("shows the success pop-up with the way back to the contract", async () => {
    vi.mocked(PaymentService.result).mockResolvedValue(
      payment(PaymentStatus.Completed) as never,
    );
    renderPage();
    expect(await screen.findByText(en.payments.successTitle)).toBeVisible();
    expect(
      screen.getByRole("link", { name: en.payments.contractDetails }),
    ).toHaveAttribute("href", "/contracts?contractId=contract-1");
  });

  it("shows the failure pop-up and lets the payer try again from the chat", async () => {
    vi.mocked(PaymentService.result).mockResolvedValue(
      payment(PaymentStatus.Failed, PaymentPurpose.ChatCustomer) as never,
    );
    renderPage();
    expect(await screen.findByText(en.payments.failureTitle)).toBeVisible();
    expect(
      screen.getByRole("link", { name: en.payments.tryAgain }),
    ).toHaveAttribute("href", "/conversations/conversation-1");
  });

  it("waits for the gateway, then shows the confirmed result", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.mocked(PaymentService.result)
      .mockResolvedValueOnce(payment(PaymentStatus.Pending) as never)
      .mockResolvedValue(payment(PaymentStatus.Completed) as never);
    renderPage();
    expect(await screen.findByText(en.payments.pendingTitle)).toBeVisible();
    await act(() => vi.advanceTimersByTimeAsync(2_100));
    expect(await screen.findByText(en.payments.successTitle)).toBeVisible();
  });

  it("stops waiting after a while and says it is still processing", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.mocked(PaymentService.result).mockResolvedValue(
      payment(PaymentStatus.Pending) as never,
    );
    renderPage();
    expect(await screen.findByText(en.payments.pendingTitle)).toBeVisible();
    await act(() => vi.advanceTimersByTimeAsync(30_100));
    expect(await screen.findByText(en.payments.timeoutTitle)).toBeVisible();
  });

  it("says the payment can't be found without an id", async () => {
    search.paymentId = null;
    renderPage();
    expect(await screen.findByText(en.payments.notFound)).toBeVisible();
    expect(PaymentService.result).not.toHaveBeenCalled();
  });
});
