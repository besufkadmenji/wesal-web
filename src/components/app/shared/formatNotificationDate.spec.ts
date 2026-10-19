import { formatNotificationDate } from "@/components/app/shared/formatNotificationDate";
import { describe, expect, it } from "vitest";

describe("formatNotificationDate", () => {
  const date = new Date(2025, 0, 1, 17, 0);

  it("formats Arabic with Gregorian dates and Latin digits", () => {
    expect(formatNotificationDate(date.toISOString(), "ar")).toBe(
      "1/01/2025 • 05:00 م",
    );
  });

  it("formats English", () => {
    expect(formatNotificationDate(date.toISOString(), "en")).toMatch(
      /^1\/01\/2025 • 05:00\spm$/i,
    );
  });

  it("returns an empty string for missing dates", () => {
    expect(formatNotificationDate(null, "ar")).toBe("");
  });
});
