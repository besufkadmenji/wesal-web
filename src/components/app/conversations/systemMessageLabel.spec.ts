import { describe, expect, it } from "vitest";
import { systemMessageReason } from "./systemMessageLabel";

describe("systemMessageReason", () => {
  it("returns the reason a cancellation event carries", () => {
    expect(
      systemMessageReason({ contractId: "c1", reason: "  Changed my mind " }),
    ).toBe("Changed my mind");
  });

  it("ignores events without a usable reason", () => {
    expect(systemMessageReason(null)).toBeNull();
    expect(systemMessageReason({ contractId: "c1" })).toBeNull();
    expect(systemMessageReason({ reason: "   " })).toBeNull();
  });
});
