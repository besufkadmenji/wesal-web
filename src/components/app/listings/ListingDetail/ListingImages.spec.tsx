import { ListingImages } from "@/components/app/listings/ListingDetail/ListingImages";
import en from "@/config/i18n/locales/en.json";
import type { Listing } from "@/gql/graphql";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/assets/icons/view.all.svg", () => ({ default: () => <svg /> }));
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const listing = (photos: { filename: string }[]) =>
  ({ id: "listing-1", name: "Pipe repair", photos }) as unknown as Listing;

describe("ListingImages (H-20)", () => {
  afterEach(cleanup);

  it("shows a placeholder instead of crashing when there are no photos", () => {
    render(<ListingImages listing={listing([])} />);
    expect(screen.getByRole("img", { name: "Pipe repair" })).toBeVisible();
    expect(screen.queryAllByRole("img")).toHaveLength(1);
  });

  it("shows the first photo and its thumbnails", () => {
    render(
      <ListingImages
        listing={listing([{ filename: "a.jpg" }, { filename: "b.jpg" }])}
      />,
    );
    // The main image plus two thumbnails.
    expect(screen.getAllByRole("img")).toHaveLength(3);
    expect(screen.getAllByRole("img")[0]).toHaveAttribute(
      "src",
      expect.stringContaining("/files/a.jpg"),
    );
  });
});
