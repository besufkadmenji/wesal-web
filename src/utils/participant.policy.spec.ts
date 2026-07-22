import { describe, expect, it } from "vitest";
import {
  canAccessParticipantPath,
  isComplaintThreadClosed,
  mergeUniqueById,
  validateComplaintEvidence,
} from "./participant.policy";

describe("Participant access policies", () => {
  it("scopes customer and provider-only routes", () => {
    expect(canAccessParticipantPath("user", "/profile/favorites")).toBe(true);
    expect(canAccessParticipantPath("provider", "/profile/favorites")).toBe(false);
    expect(canAccessParticipantPath("provider", "/my-listings/1/promotion")).toBe(
      true,
    );
    expect(canAccessParticipantPath("user", "/my-listings")).toBe(false);
    expect(canAccessParticipantPath(null, "/contracts")).toBe(false);
  });

  it("validates complaint evidence limits", () => {
    const png = new File([new Uint8Array(10)], "proof.png", {
      type: "image/png",
    });
    expect(validateComplaintEvidence([png])).toBeNull();
    expect(validateComplaintEvidence([png, png, png, png])).toBe("TOO_MANY");
    expect(
      validateComplaintEvidence([
        new File(["text"], "proof.txt", { type: "text/plain" }),
      ]),
    ).toBe("INVALID_TYPE");
    expect(
      validateComplaintEvidence([
        new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.jpg", {
          type: "image/jpeg",
        }),
      ]),
    ).toBe("TOO_LARGE");
  });

  it("deduplicates mutation and subscription messages", () => {
    const first = { id: "m1", content: "first" };
    expect(mergeUniqueById([first], first)).toHaveLength(1);
    expect(
      mergeUniqueById([first], { id: "m2", content: "second" }),
    ).toHaveLength(2);
  });

  it("closes reporter input for terminal complaint statuses", () => {
    expect(isComplaintThreadClosed("RESOLVED")).toBe(true);
    expect(isComplaintThreadClosed("REJECTED")).toBe(true);
    expect(isComplaintThreadClosed("CLOSED")).toBe(true);
    expect(isComplaintThreadClosed("UNDER_REVIEW")).toBe(false);
  });
});
