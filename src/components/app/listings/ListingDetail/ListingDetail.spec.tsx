import { ListingDetail } from "@/components/app/listings/ListingDetail/ListingDetail";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const state = { listing: null as unknown, isLoading: false };
vi.mock("@/components/app/listings/ListingDetail/useListing", () => ({
  useListing: () => ({ ...state, isError: false }),
}));
vi.mock("@/components/app/shared/AppWrapper", () => ({
  AppWrapper: ({ children }: { children: ReactNode }) => <>{children}</>,
}));
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("next/navigation", () => ({
  usePathname: () => "/listings/x",
  useRouter: () => ({ push: vi.fn() }),
}));
vi.mock("@/assets/icons/edit.svg", () => ({ default: () => <svg /> }));
vi.mock("@/components/app/listings/ListingDetail/DetailSkeleton", () => ({
  DetailSkeleton: () => <div>loading</div>,
}));
vi.mock("@/components/app/listings/ListingDetail/MainInfo", () => ({
  MainInfo: () => null,
}));
vi.mock("@/components/app/listings/ListingDetail/ListingImages", () => ({
  ListingImages: () => null,
}));
vi.mock("@/components/app/listings/ListingDetail/StoryVideo", () => ({
  StoryVideo: () => null,
}));
vi.mock("@/components/app/listings/ListingDetail/Reviews", () => ({
  Reviews: () => null,
}));
vi.mock("@/components/app/listings/ListingDetail/ProviderData", () => ({
  ProviderData: () => null,
}));

describe("ListingDetail when the ad can't be shown (S4-56)", () => {
  afterEach(cleanup);

  it("says the ad is unavailable instead of loading forever", () => {
    state.listing = null;
    state.isLoading = false;
    render(<ListingDetail />);
    expect(screen.getByText(en.listingDetail.unavailableTitle)).toBeVisible();
    expect(screen.queryByText("loading")).toBeNull();
  });

  it("still shows the skeleton while loading", () => {
    state.isLoading = true;
    render(<ListingDetail />);
    expect(screen.getByText("loading")).toBeVisible();
  });
});
