import { Categories } from "@/components/app/categories/Categories";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen } from "@testing-library/react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { afterEach, describe, expect, it, vi } from "vitest";

const categoriesState = vi.hoisted(() => ({
  value: {
    categories: null as unknown,
    isLoading: false,
    isError: false,
  },
}));

vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/hooks/useCategories", () => ({
  useCategories: () => categoriesState.value,
}));
vi.mock("@/components/app/categories/CategorySelect", () => ({
  CategorySelect: () => <input />,
}));
vi.mock("@/components/app/categories/CategoryCard", () => ({
  CategoryCard: ({ category }: { category: { name: string } }) => (
    <p>{category.name}</p>
  ),
  CategoryCardSkeleton: () => <div />,
}));
vi.mock("@/components/app/shared/AppWrapper", () => ({
  AppWrapper: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("@/components/app/shared/AppPagination", () => ({
  AppPagination: () => <nav aria-label="pagination" />,
}));
vi.mock("next/image", () => ({ default: () => null }));
vi.mock("@/assets/icons/breadcrumb.svg", () => ({ default: () => <svg /> }));
vi.mock("@/assets/icons/no.listings.svg", () => ({ default: () => <svg /> }));

const renderPage = () =>
  render(
    <NuqsTestingAdapter searchParams="?query=nnnn">
      <Categories />
    </NuqsTestingAdapter>,
  );

/** ClickUp 869fmned3: a search with no matches left a blank area. */
describe("Categories empty state", () => {
  afterEach(cleanup);

  it("shows no results and hides pagination when nothing matches", () => {
    categoriesState.value = {
      categories: { items: [], meta: { page: 1, totalPages: 0 } },
      isLoading: false,
      isError: false,
    };
    renderPage();

    expect(screen.getByText(en.categories.empty.title)).toBeTruthy();
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("lists categories without the empty state when there are matches", () => {
    categoriesState.value = {
      categories: {
        items: [{ id: "1", name: "Electrical" }],
        meta: { page: 1, totalPages: 1 },
      },
      isLoading: false,
      isError: false,
    };
    renderPage();

    expect(screen.getByText("Electrical")).toBeTruthy();
    expect(screen.queryByText(en.categories.empty.title)).toBeNull();
  });

  it("does not flash the empty state while loading", () => {
    categoriesState.value = {
      categories: undefined,
      isLoading: true,
      isError: false,
    };
    renderPage();

    expect(screen.queryByText(en.categories.empty.title)).toBeNull();
  });
});
