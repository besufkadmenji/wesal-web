import { notificationHref } from "@/components/app/shared/notificationHref";
import { describe, expect, it } from "vitest";

describe("notificationHref", () => {
  it.each([
    ["contract", "c1", "/contracts/c1"],
    ["conversation", "v1", "/conversations/v1"],
    ["listing", "l1", "/my-listings/l1"],
    ["complaint", "x1", "/complaints/x1"],
    ["provider", "p1", "/profile"],
    ["provider", null, "/profile"],
    ["category", "k1", "/categories"],
  ])("maps %s/%s to %s", (type, id, href) => {
    expect(notificationHref(type, id)).toBe(href);
  });

  it.each([
    ["broadcast", "b1"],
    ["badge", "b1"],
    ["contract", null],
    [null, "c1"],
  ])("leaves %s/%s unlinked", (type, id) => {
    expect(notificationHref(type, id)).toBeUndefined();
  });
});
