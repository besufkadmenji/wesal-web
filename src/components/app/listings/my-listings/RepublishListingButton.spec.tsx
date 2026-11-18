import { RepublishListingButton } from "@/components/app/listings/my-listings/RepublishListingButton";
import en from "@/config/i18n/locales/en.json";
import { CheckoutPurpose } from "@/gql/graphql";
import ListingService from "@/services/listing.service";
import { PaymentService } from "@/services/payment.service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const setting = vi.hoisted(() => ({
  current: {
    premiumAdEnabled: true,
    premiumAdFee: 75,
    premiumAdDurationDays: 14,
    freeAdValidityDays: 30,
  },
}));
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/hooks/useLang", () => ({ useLang: () => "en" }));
vi.mock("@/hooks/useSettings", () => ({
  useSetting: () => ({ setting: setting.current }),
}));
vi.mock("@/services/listing.service", () => ({
  default: { republishListing: vi.fn() },
}));
vi.mock("@/services/payment.service", () => ({
  PaymentService: { startCheckout: vi.fn(), redirect: vi.fn() },
}));
vi.mock("@/utils/show.messages", () => ({
  showErrorMessage: vi.fn(),
  showSuccessMessage: vi.fn(),
}));

const renderButton = () =>
  render(
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { mutations: { retry: false } } })
      }
    >
      <RepublishListingButton listingId="listing-1" />
    </QueryClientProvider>,
  );
const copy = en.myListings.expiry;

describe("RepublishListingButton (S4-62)", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("re-publishes as a free ad by default, without a payment", async () => {
    vi.mocked(ListingService.republishListing).mockResolvedValue({} as never);
    renderButton();
    await userEvent.click(screen.getByRole("button", { name: copy.republish }));

    expect(screen.getByRole("radio", { name: /Free ad/ })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByText("Shown for 30 days.")).toBeVisible();
    await userEvent.click(
      screen.getAllByRole("button", { name: copy.republish }).at(-1)!,
    );

    await waitFor(() =>
      expect(ListingService.republishListing).toHaveBeenCalledWith(
        "listing-1",
        false,
      ),
    );
    expect(PaymentService.startCheckout).not.toHaveBeenCalled();
  });

  it("re-publishes as featured and leaves for the premium-ad checkout", async () => {
    vi.mocked(ListingService.republishListing).mockResolvedValue({} as never);
    vi.mocked(PaymentService.startCheckout).mockResolvedValue({
      paymentId: "p1",
      redirectUrl: "https://pay.example/p1",
      completed: false,
    } as never);
    renderButton();
    await userEvent.click(screen.getByRole("button", { name: copy.republish }));
    await userEvent.click(screen.getByRole("radio", { name: /Featured ad/ }));
    await userEvent.click(
      screen.getByRole("button", { name: copy.republishAndPay }),
    );

    await waitFor(() =>
      expect(PaymentService.redirect).toHaveBeenCalledTimes(1),
    );
    expect(ListingService.republishListing).toHaveBeenCalledWith(
      "listing-1",
      true,
    );
    expect(PaymentService.startCheckout).toHaveBeenCalledWith(
      expect.objectContaining({
        purpose: CheckoutPurpose.PremiumAd,
        targetId: "listing-1",
      }),
    );
  });

  it("can't choose featured while featured ads are off", async () => {
    setting.current = { ...setting.current, premiumAdEnabled: false };
    renderButton();
    await userEvent.click(screen.getByRole("button", { name: copy.republish }));
    expect(screen.getByRole("radio", { name: /Featured ad/ })).toBeDisabled();
    expect(screen.getByText(en.promotion.disabled)).toBeVisible();
  });
});
