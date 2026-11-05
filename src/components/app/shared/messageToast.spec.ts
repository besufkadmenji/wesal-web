import { showMessageToast } from "@/components/app/shared/messageToast";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { toast } = vi.hoisted(() => ({ toast: vi.fn() }));
vi.mock("sonner", () => ({ toast }));

const options = (onView = vi.fn()) => ({
  fallbackTitle: "New message",
  photoLabel: "Photo",
  viewLabel: "View",
  onView,
});

describe("showMessageToast", () => {
  beforeEach(() => toast.mockReset());

  it("shows the sender and the message, and View opens the chat", () => {
    const onView = vi.fn();
    showMessageToast(
      {
        id: "m1",
        conversationId: "c1",
        content: "hello",
        metadata: null,
        sender: { name: "Ahmed", commercialName: "Ahmed Plumbing" },
      },
      options(onView),
    );
    const [title, opts] = toast.mock.calls[0];
    expect(title).toBe("Ahmed Plumbing");
    expect(opts.description).toBe("hello");
    expect(opts.id).toBe("message-m1");
    opts.action.onClick();
    expect(onView).toHaveBeenCalledWith("/conversations/c1");
  });

  it("says Photo for a photo without text, and falls back without a sender", () => {
    showMessageToast(
      {
        id: "m2",
        conversationId: "c1",
        content: "",
        metadata: { attachment: { filename: "a.jpg" } },
        sender: null,
      },
      options(),
    );
    const [title, opts] = toast.mock.calls[0];
    expect(title).toBe("New message");
    expect(opts.description).toBe("Photo");
  });
});
