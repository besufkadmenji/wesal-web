import { selectableCategories } from "@/components/app/listings/my-listings/manage/selectableCategories";
import { CategoryStatus } from "@/gql/graphql";
import { describe, expect, it } from "vitest";

const categories = [
  { id: "active", status: CategoryStatus.Active },
  { id: "inactive", status: CategoryStatus.Inactive },
];

describe("selectableCategories (S4-56)", () => {
  it("offers only active sections for a new ad", () => {
    expect(selectableCategories(categories).map((c) => c.id)).toEqual([
      "active",
    ]);
  });

  it("keeps an edited ad's own section even when it is inactive", () => {
    expect(
      selectableCategories(categories, "inactive").map((c) => c.id),
    ).toEqual(["active", "inactive"]);
  });
});
