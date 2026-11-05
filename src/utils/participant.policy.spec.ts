import { describe, expect, it } from "vitest";
import {
  canAccessParticipantPath,
  isComplaintThreadClosed,
  mergeIncomingMessage,
  mergeUniqueById,
  settleSentMessage,
  validateComplaintEvidence,
} from "./participant.policy";

describe("Participant access policies", () => {
  it("scopes customer and provider-only routes", () => {
    expect(canAccessParticipantPath("user", "/profile/favorites")).toBe(true);
    expect(canAccessParticipantPath("provider", "/profile/favorites")).toBe(
      false,
    );
    expect(canAccessParticipantPath("provider", "/my-listings")).toBe(true);
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

  describe("sent messages don't show twice (socket before send response)", () => {
    const optimistic = { id: "optimistic-1", senderId: "me", content: "hello" };
    const saved = { id: "m1", senderId: "me", content: "hello" };

    it("replaces our optimistic copy when the socket delivers it first", () => {
      const result = mergeIncomingMessage([optimistic], saved);
      expect(result.items).toEqual([saved]);
      expect(result.added).toBe(false);
    });

    it("adds other people's messages, and ours sent from another device", () => {
      expect(
        mergeIncomingMessage([optimistic], {
          id: "m2",
          senderId: "them",
          content: "hello",
        }).items,
      ).toHaveLength(2);
      // No copy waiting here: our message came from another tab or device.
      expect(
        mergeIncomingMessage([saved], {
          id: "m3",
          senderId: "me",
          content: "other",
        }).added,
      ).toBe(true);
    });

    it("still replaces our copy when the API changed the text", () => {
      const redacted = {
        id: "m4",
        senderId: "me",
        content: "call [contact hidden]",
      };
      const result = mergeIncomingMessage(
        [{ id: "optimistic-2", senderId: "me", content: "call 0501234567" }],
        redacted,
      );
      expect(result.items).toEqual([redacted]);
      expect(result.added).toBe(false);
    });

    it("then drops the optimistic copy when the send returns", () => {
      expect(settleSentMessage([saved], "optimistic-1", saved)).toEqual({
        items: [saved],
        delta: 0,
      });
      expect(
        settleSentMessage([saved, optimistic], "optimistic-1", saved),
      ).toEqual({
        items: [saved],
        delta: -1,
      });
    });

    it("swaps the copy for the saved message when the send returns first", () => {
      expect(settleSentMessage([optimistic], "optimistic-1", saved)).toEqual({
        items: [saved],
        delta: 0,
      });
    });
  });
});
