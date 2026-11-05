import { FavoritesPage } from "@/components/app/favorites/FavoritesPage";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/hooks/useFavorites", () => ({
  useFavoriteProviders: () => ({
    isLoading: false,
    data: {
      items: [
        {
          id: "fav-1",
          providerId: "provider-1",
          provider: { name: "Provider QC", commercialName: "pro qc" },
        },
      ],
    },
  }),
}));
vi.mock("@/components/app/favorites/FavoriteButton", () => ({
  FavoriteButton: () => <button type="button">heart</button>,
}));
vi.mock("next/image", () => ({ default: () => null }));

describe("Favorites list (ClickUp 869fnvz70)", () => {
  afterEach(cleanup);

  it("opens the provider's page from a favorite", () => {
    render(<FavoritesPage />);
    expect(
      screen.getByRole("link", { name: /Provider QC/ }).getAttribute("href"),
    ).toBe("/providers/provider-1?from=favorites");
  });

  it("keeps the heart outside the link so it only toggles the favorite", () => {
    render(<FavoritesPage />);
    const link = screen.getByRole("link", { name: /Provider QC/ });
    expect(link.contains(screen.getByRole("button", { name: "heart" }))).toBe(
      false,
    );
  });
});
