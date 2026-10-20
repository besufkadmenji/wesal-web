import { PendingPaymentGate } from "@/components/app/home/PendingPaymentGate";
import en from "@/config/i18n/locales/en.json";
import { ContractStatusGroup, SortOrder } from "@/gql/graphql";
import { ContractService } from "@/services/contract.service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const viewer = { me: { user: { id: "user-1" }, provider: null } as unknown };
vi.mock("@/assets/icons/contracts/popup/finance.svg", () => ({
  default: (props: object) => <svg {...props} />,
}));
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/hooks/useMe", () => ({ useMe: () => viewer }));
vi.mock("@/services/contract.service", () => ({
  ContractService: { findAll: vi.fn(), overdue: vi.fn() },
}));

const unpaid = (id: string, publicId: number) => ({ id, publicId });

const renderGate = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <PendingPaymentGate />
    </QueryClientProvider>,
  );

describe("PendingPaymentGate (BRD 4.1.16 pay reminder on home)", () => {
  beforeEach(() => {
    viewer.me = { user: { id: "user-1" }, provider: null };
    vi.mocked(ContractService.findAll).mockReset();
    vi.mocked(ContractService.overdue).mockReset();
    vi.mocked(ContractService.findAll).mockResolvedValue({
      items: [unpaid("contract-1256", 1256)],
    } as never);
    vi.mocked(ContractService.overdue).mockResolvedValue([]);
  });
  afterEach(cleanup);

  it("asks the customer to pay the oldest accepted contract", async () => {
    renderGate();
    expect(await screen.findByText(en.payments.payPromptTitle)).toBeVisible();
    expect(screen.getByText(/1256/)).toBeVisible();
    expect(
      screen.getByRole("link", { name: en.payments.goToContract }),
    ).toHaveAttribute("href", "/contracts?contractId=contract-1256&pay=1");
    expect(ContractService.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        statusGroup: ContractStatusGroup.PendingPayment,
        sortOrder: SortOrder.Asc,
        limit: 1,
      }),
    );
  });

  it("can be closed for this visit", async () => {
    renderGate();
    await screen.findByText(en.payments.payPromptTitle);
    await userEvent.click(
      screen.getByRole("button", { name: en.common.cancel }),
    );
    expect(screen.queryByText(en.payments.payPromptTitle)).toBeNull();
  });

  it("stays away while an overdue contract blocks the platform", async () => {
    vi.mocked(ContractService.overdue).mockResolvedValue([
      { id: "overdue-1" },
    ] as never);
    renderGate();
    await vi.waitFor(() => expect(ContractService.overdue).toHaveBeenCalled());
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(screen.queryByText(en.payments.payPromptTitle)).toBeNull();
  });

  it("is not shown to providers", async () => {
    viewer.me = { user: null, provider: { id: "provider-1" } };
    renderGate();
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(screen.queryByText(en.payments.payPromptTitle)).toBeNull();
    expect(ContractService.findAll).not.toHaveBeenCalled();
  });
});
