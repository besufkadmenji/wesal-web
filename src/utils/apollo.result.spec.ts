import { describe, expect, it } from "vitest";
import { requireOperationField } from "./apollo.result";

describe("requireOperationField", () => {
  it("returns a non-null mutation field", () => {
    expect(
      requireOperationField(
        { data: { updateThing: { id: "thing" } } },
        "updateThing",
        "Update thing",
      ),
    ).toEqual({ id: "thing" });
  });

  it("accepts false as a valid mutation result", () => {
    expect(
      requireOperationField(
        { data: { changed: false } },
        "changed",
        "Change thing",
      ),
    ).toBe(false);
  });

  it("throws for errors, missing data, and null fields", () => {
    const error = new Error("GraphQL failed");
    expect(() =>
      requireOperationField<{ changed: boolean }, "changed">(
        { error },
        "changed",
        "Change thing",
      ),
    ).toThrow(error);
    expect(() =>
      requireOperationField<{ changed: boolean }, "changed">(
        {},
        "changed",
        "Change thing",
      ),
    ).toThrow("Change thing returned no data");
    expect(() =>
      requireOperationField(
        { data: { changed: null } },
        "changed",
        "Change thing",
      ),
    ).toThrow("Change thing returned null for changed");
  });
});
