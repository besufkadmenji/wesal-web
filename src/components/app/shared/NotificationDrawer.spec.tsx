import { ChatDrawer } from "@/components/app/shared/ChatDrawer";
import { NotificationDrawer } from "@/components/app/shared/NotificationDrawer";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const data = {
  notifications: [] as unknown[],
  notificationUnread: 0,
  conversations: [] as unknown[],
  conversationUnread: 0,
};
vi.mock("@/assets/icons/notifications.svg", () => ({ default: () => <svg /> }));
vi.mock("@/assets/icons/conversations.svg", () => ({ default: () => <svg /> }));
vi.mock("@/assets/icons/view.all.alt.svg", () => ({ default: () => <svg /> }));
vi.mock("@/assets/icons/notifications/close.svg", () => ({ default: () => <svg /> }));
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/hooks/useLang", () => ({ useLang: () => "en" }));
vi.mock("@/hooks/useMe", () => ({ useMe: () => ({ me: { user: {} } }) }));
vi.mock("@/hooks/useNotifications", () => ({
  useNotifications: () => ({
    isLoading: false,
    data: { items: data.notifications },
  }),
  useNotificationStats: () => ({
    data: { unreadCount: data.notificationUnread },
  }),
}));
vi.mock("@/hooks/useConversations", () => ({
  useConversations: () => ({
    isLoading: false,
    data: { items: data.conversations },
  }),
  useConversationStats: () => ({
    data: { unreadCount: data.conversationUnread },
  }),
}));
vi.mock("@/components/app/shared/NotificationItem", () => ({
  NotificationItem: ({
    notification,
    onNavigate,
  }: {
    notification: { id: string; title: string };
    onNavigate: () => void;
  }) => (
    <button type="button" onClick={onNavigate}>
      {notification.title}
    </button>
  ),
}));
vi.mock("@/components/app/shared/ChatDrawerItem", () => ({
  ChatDrawerItem: ({
    conversation,
  }: {
    conversation: { id: string; unreadCount: number };
  }) => <span>{`row ${conversation.id} ${conversation.unreadCount}`}</span>,
}));

describe("header drawers (D-21, Figma 6242:7205 / 6543:21353)", () => {
  beforeEach(() => {
    data.notifications = [];
    data.notificationUnread = 0;
    data.conversations = [];
    data.conversationUnread = 0;
  });
  afterEach(cleanup);

  it("marks unread notifications with a dot, never a number", () => {
    data.notificationUnread = 12;
    render(<NotificationDrawer />);
    const bell = screen.getByRole("button", { name: /Notifications/ });
    expect(bell).toHaveTextContent(en.header.unreadNotifications);
    expect(bell).not.toHaveTextContent("12");
    expect(bell).not.toHaveTextContent("9+");
  });

  it("opens the notifications drawer and closes it from a row or the close button", async () => {
    data.notifications = [{ id: "n1", title: "Contract accepted" }];
    render(<NotificationDrawer />);
    await userEvent.click(screen.getByRole("button", { name: /Notifications/ }));
    const drawer = screen.getByRole("dialog", {
      name: en.header.notifications,
    });
    expect(drawer).toHaveTextContent("Contract accepted");
    await userEvent.click(screen.getByText("Contract accepted"));
    expect(screen.queryByRole("dialog")).toBeNull();

    await userEvent.click(screen.getByRole("button", { name: /Notifications/ }));
    await userEvent.click(
      screen.getByRole("button", { name: en.notifications.close }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("shows the empty text when there is nothing", async () => {
    render(<NotificationDrawer />);
    await userEvent.click(screen.getByRole("button", { name: /Notifications/ }));
    expect(screen.getByText(en.notifications.empty)).toBeVisible();
  });

  it("lists chats with their own counts and a view-all footer", async () => {
    data.conversationUnread = 3;
    data.conversations = [{ id: "c1", unreadCount: 3, user: {}, provider: {} }];
    render(<ChatDrawer />);
    const trigger = screen.getByRole("button", { name: /Messages/ });
    expect(trigger).toHaveTextContent(en.header.unreadMessages);
    expect(trigger).not.toHaveTextContent("3");
    await userEvent.click(trigger);
    const drawer = screen.getByRole("dialog", { name: en.header.messages });
    expect(drawer).toHaveTextContent("row c1 3");
    expect(
      screen.getByRole("link", { name: en.conversations.viewAll }),
    ).toHaveAttribute("href", "/conversations");
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
