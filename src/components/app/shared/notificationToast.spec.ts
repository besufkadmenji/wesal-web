import { showNotificationToast } from "@/components/app/shared/notificationToast";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { toast } = vi.hoisted(() => ({ toast: vi.fn() }));
vi.mock("sonner", () => ({ toast }));

describe("showNotificationToast (ClickUp 869fp1jmt)", () => {
  beforeEach(() => toast.mockReset());

  it("pops up the title and message with a View action to the related page", () => {
    const onView = vi.fn();
    showNotificationToast(
      {
        id: "n1",
        title: "Contract updated",
        message: "Contract 1182 is now In progress",
        relatedEntityType: "contract",
        relatedEntityId: "c1",
      },
      { viewLabel: "View", onView },
    );

    expect(toast).toHaveBeenCalledTimes(1);
    const [title, options] = toast.mock.calls[0];
    expect(title).toBe("Contract updated");
    expect(options.description).toBe("Contract 1182 is now In progress");
    expect(options.id).toBe("notification-n1");
    expect(options.action.label).toBe("View");
    options.action.onClick();
    expect(onView).toHaveBeenCalledWith("/contracts/c1");
  });

  it("has no action when the notification has no page", () => {
    showNotificationToast(
      { id: "n2", title: "Hello", message: "Broadcast", relatedEntityType: null },
      { viewLabel: "View", onView: vi.fn() },
    );
    expect(toast.mock.calls[0][1].action).toBeUndefined();
  });
});
