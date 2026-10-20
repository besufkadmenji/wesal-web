import { ContractPaymentDialog } from "@/components/app/contracts/ContractPaymentDialog";
import en from "@/config/i18n/locales/en.json";
import { CheckoutPurpose, PaymentMethod, type Contract } from "@/gql/graphql";
import { PaymentService } from "@/services/payment.service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: () => <span data-testid="logo" />,
}));
vi.mock("@/components/app/contracts/MoneyValue", () => ({
  MoneyValue: ({ value }: { value: number }) => <span>{value}</span>,
}));
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/services/payment.service", () => ({
  PaymentService: { startCheckout: vi.fn(), redirect: vi.fn() },
}));
vi.mock("@/utils/show.messages", () => ({
  showErrorMessage: vi.fn(),
}));

const renderDialog = (paymentMethods: PaymentMethod[] | null) =>
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { mutations: { retry: false } } })}
    >
      <ContractPaymentDialog
        contract={
          {
            id: "contract-1",
            totalPayable: 1150,
            paymentMethods,
          } as unknown as Contract
        }
        open
        onOpenChange={vi.fn()}
      />
    </QueryClientProvider>,
  );

describe("ContractPaymentDialog (S4-11)", () => {
  afterEach(cleanup);

  it("offers only the methods the API allows for this amount", () => {
    renderDialog([PaymentMethod.Electronic, PaymentMethod.Tamara]);
    expect(
      screen.getByRole("radio", { name: en.contracts.electronicPayment }),
    ).toHaveAttribute("aria-checked", "true");
    expect(
      screen.getByRole("radio", { name: en.contracts.tamaraInstallments }),
    ).toBeVisible();
    expect(
      screen.queryByRole("radio", { name: en.contracts.tabbyInstallments }),
    ).toBeNull();
  });

  it("starts a checkout with the chosen method and leaves for the gateway", async () => {
    vi.mocked(PaymentService.startCheckout).mockResolvedValue({
      paymentId: "payment-1",
      redirectUrl: "https://gateway.test/checkout/ref",
    });
    renderDialog([PaymentMethod.Electronic, PaymentMethod.Tamara]);
    await userEvent.click(
      screen.getByRole("radio", { name: en.contracts.tamaraInstallments }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: en.contracts.continuePayment }),
    );
    await waitFor(() =>
      expect(PaymentService.redirect).toHaveBeenCalledWith(
        "https://gateway.test/checkout/ref",
      ),
    );
    expect(PaymentService.startCheckout).toHaveBeenCalledWith({
      purpose: CheckoutPurpose.Contract,
      targetId: "contract-1",
      method: PaymentMethod.Tamara,
    });
    expect(
      screen.getByRole("button", { name: en.contracts.paymentProcessing }),
    ).toBeDisabled();
  });
});
