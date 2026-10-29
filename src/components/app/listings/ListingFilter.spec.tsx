import { ListingFilter } from "@/components/app/listings/ListingFilter";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter, type UrlUpdateEvent } from "nuqs/adapters/testing";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/hooks/useLang", () => ({ useLang: () => "en" }));
vi.mock("@/hooks/useWindowSize", () => ({
  useWindowSize: () => ({ width: 1280, height: 800 }),
}));
vi.mock("@/hooks/useCities", () => ({
  useCities: () => ({
    cities: { items: [] },
    isLoading: false,
    isError: false,
  }),
}));
vi.mock("@/assets/fonts/sar", () => ({ sar: { className: "" } }));
vi.mock("@/assets/icons/chevron.down.svg", () => ({ default: () => <svg /> }));
vi.mock("@/assets/icons/city.filter.svg", () => ({ default: () => <svg /> }));
vi.mock("@/assets/icons/rating.svg", () => ({ default: () => <svg /> }));

/** ClickUp 869fmuh2u: Reset also cleared the category of the page. */
describe("ListingFilter reset", () => {
  afterEach(cleanup);

  it("keeps the category and clears every filter and the page", async () => {
    const updates: UrlUpdateEvent[] = [];
    render(
      <NuqsTestingAdapter
        hasMemory
        searchParams="?category=c1&query=pipe&city=x&minPrice=100&maxPrice=500&rating=4&page=3"
        onUrlUpdate={(event) => updates.push(event)}
      >
        <ListingFilter />
      </NuqsTestingAdapter>,
    );

    await userEvent
      .setup()
      .click(screen.getByRole("button", { name: en.listingFilter.reset }));

    const params = updates.at(-1)!.searchParams;
    expect(params.get("category")).toBe("c1");
    for (const name of [
      "query",
      "city",
      "minPrice",
      "maxPrice",
      "rating",
      "page",
    ]) {
      expect(params.has(name)).toBe(false);
    }
  });

  const renderFilter = (searchParams: string) => {
    const updates: UrlUpdateEvent[] = [];
    render(
      <NuqsTestingAdapter
        hasMemory
        searchParams={searchParams}
        onUrlUpdate={(event) => updates.push(event)}
      >
        <ListingFilter />
      </NuqsTestingAdapter>,
    );
    return updates;
  };

  it("searches on Enter, not on every keystroke (ClickUp 869fmut30)", async () => {
    const user = userEvent.setup();
    const updates = renderFilter("?category=c1&page=3");
    const input = screen.getByPlaceholderText(
      en.listingFilter.searchPlaceholder,
    );

    await user.type(input, "pipe");
    await new Promise((resolve) => setTimeout(resolve, 400));
    expect(updates).toHaveLength(0);

    await user.keyboard("{Enter}");
    await waitFor(() =>
      expect(updates.at(-1)?.searchParams.get("query")).toBe("pipe"),
    );
    expect(updates.at(-1)?.searchParams.has("page")).toBe(false);
  });

  it("toggles the rating chip (ClickUp 869fmut30)", async () => {
    const user = userEvent.setup();
    const updates = renderFilter("?category=c1");
    const four = screen.getByText("4");

    await user.click(four);
    await waitFor(() =>
      expect(updates.at(-1)?.searchParams.get("rating")).toBe("4"),
    );
    await user.click(four);
    await waitFor(() =>
      expect(updates.at(-1)?.searchParams.has("rating")).toBe(false),
    );
  });
});
