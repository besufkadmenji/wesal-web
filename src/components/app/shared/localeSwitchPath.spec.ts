import { describe, expect, it } from "vitest";
import { localeSwitchPath } from "./localeSwitchPath";

describe("localeSwitchPath (ClickUp 869fmh35z)", () => {
  it("keeps the query, so a category page stays on its category", () => {
    expect(localeSwitchPath("/en/listings", "category=abc&page=2")).toBe(
      "/listings?category=abc&page=2",
    );
  });

  it("strips only the leading locale segment", () => {
    expect(localeSwitchPath("/ar", "")).toBe("");
    expect(localeSwitchPath("/en/support/area", "")).toBe("/support/area");
    expect(localeSwitchPath("/ar/arabic-coffee", "")).toBe("/arabic-coffee");
  });
});
