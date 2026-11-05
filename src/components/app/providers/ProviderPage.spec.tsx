import { ProviderPage } from "@/components/app/providers/ProviderPage";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  provider: { isLoading: false, data: null as unknown },
  listings: { isLoading: false, data: null as unknown },
}));

vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/components/app/providers/useProviderPage", () => ({
  useProviderPage: () => ({ ...state, setPage: vi.fn() }),
}));
vi.mock("@/components/app/providers/ProviderPageHeader", () => ({
  ProviderPageHeader: () => <header />,
}));
vi.mock("@/components/app/shared/AppWrapper", () => ({
  AppWrapper: ({ children }: { children: ReactNode }) => <>{children}</>,
}));
vi.mock("@/components/app/favorites/FavoriteButton", () => ({
  FavoriteButton: () => <button type="button">heart</button>,
}));
vi.mock("@/components/app/listings/ListingCard", () => ({
  ListingCard: ({ listing, href }: { listing: { name: string }; href: string }) => (
    <a href={href}>{listing.name}</a>
  ),
  ListingCardSkeleton: () => <div />,
}));
vi.mock("@/components/app/shared/AppPagination", () => ({
  AppPagination: () => <nav />,
}));
vi.mock("next/image", () => ({ default: () => null }));
vi.mock("@/assets/icons/rating.svg", () => ({ default: () => <svg /> }));
vi.mock("@/assets/fonts/sar", () => ({ sar: { className: "" } }));

const provider = {
  id: "provider-1",
  name: "Provider QC",
  address: "Riyadh",
  ratingAverage: 4.5,
  ratingCount: 2,
  isNewlyAdded: false,
  listingsCount: 50,
  contractsCount: 150,
};

describe("Provider page (ClickUp 869fnvz70)", () => {
  afterEach(cleanup);

  it("shows the provider card with counts and links each ad to its page", () => {
    state.provider = { isLoading: false, data: provider };
    state.listings = {
      isLoading: false,
      data: {
        items: [{ id: "ad-1", name: "iPhone 15" }],
        meta: { page: 1, totalPages: 1 },
      },
    };
    render(<ProviderPage />);

    expect(screen.getByText("Provider QC")).toBeTruthy();
    expect(screen.getByText(`50 ${en.providerPage.adsUnit}`)).toBeTruthy();
    expect(
      screen.getByText(`150 ${en.providerPage.contractsUnit}`),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "iPhone 15" }).getAttribute("href"),
    ).toBe("/listings/ad-1");
  });

  it("says so when the provider has no ads", () => {
    state.provider = { isLoading: false, data: provider };
    state.listings = {
      isLoading: false,
      data: { items: [], meta: { page: 1, totalPages: 0 } },
    };
    render(<ProviderPage />);
    expect(screen.getByText(en.providerPage.noAds)).toBeTruthy();
  });

  it("reports a provider that no longer exists", () => {
    state.provider = { isLoading: false, data: null };
    state.listings = { isLoading: false, data: null };
    render(<ProviderPage />);
    expect(screen.getByText(en.providerPage.notFound)).toBeTruthy();
  });
});
