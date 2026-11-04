import { ListingCard } from "@/components/app/listings/ListingCard";
import en from "@/config/i18n/locales/en.json";
import { ListingType, PromotionStatus, type Listing } from "@/gql/graphql";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("next/navigation", () => ({ usePathname: () => "/en/listings" }));
vi.mock("next/image", () => ({ default: () => null }));
vi.mock("@/assets/fonts/sar", () => ({ sar: { className: "" } }));
vi.mock("@/assets/icons/rating.svg", () => ({ default: () => <svg /> }));

const listing = (type: ListingType, promotionStatus: PromotionStatus) =>
  ({
    id: "l1",
    name: "Ad",
    description: "",
    price: 10,
    photos: [],
    ratingAverage: 0,
    type,
    promotionStatus,
  }) as unknown as Listing;

describe("ListingCard featured label", () => {
  afterEach(cleanup);

  it("labels a paid ad as featured for everyone", () => {
    render(
      <ListingCard
        listing={listing(ListingType.Featured, PromotionStatus.Active)}
      />,
    );
    expect(screen.getByText(en.promotion.featured)).toBeTruthy();
  });

  it("hides pending and expired promotions from customers", () => {
    render(
      <ListingCard
        listing={listing(ListingType.Free, PromotionStatus.PendingPayment)}
      />,
    );
    expect(screen.queryByText(en.status.PENDING_PAYMENT)).toBeNull();
    expect(screen.queryByText(en.promotion.featured)).toBeNull();
  });

  it("still shows the owner a promotion awaiting payment", () => {
    render(
      <ListingCard
        listing={listing(ListingType.Free, PromotionStatus.PendingPayment)}
        showProviderLabels={false}
      />,
    );
    expect(screen.getByText(en.status.PENDING_PAYMENT)).toBeTruthy();
  });
});
