import { PushNotificationsGate } from "@/components/app/PushNotificationsGate";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  me: { user: { id: "u1" }, provider: null } as unknown,
  permission: "default" as string,
}));
const { toast, enablePush } = vi.hoisted(() => ({
  toast: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
  enablePush: vi.fn(() => Promise.resolve("granted")),
}));
vi.mock("sonner", () => ({ toast }));
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/hooks/useLang", () => ({ useLang: () => "en" }));
vi.mock("@/hooks/useMe", () => ({
  useMe: () => ({ me: state.me, isLoggedIn: Boolean(state.me) }),
}));
vi.mock("@/utils/push", () => ({
  enablePush,
  pushPermission: () => state.permission,
}));

// jsdom here has no usable localStorage; give each test a fresh one.
const memoryStorage = () => {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => void values.set(key, value),
    removeItem: (key: string) => void values.delete(key),
    clear: () => values.clear(),
  };
};

describe("PushNotificationsGate (ClickUp 869fp1jmt)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    Object.defineProperty(window, "localStorage", {
      value: memoryStorage(),
      configurable: true,
    });
    state.me = { user: { id: "u1" }, provider: null };
    state.permission = "default";
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("offers push once to a signed-in person who hasn't decided", () => {
    render(<PushNotificationsGate />);
    vi.advanceTimersByTime(3000);

    expect(toast).toHaveBeenCalledTimes(1);
    const [message, options] = toast.mock.calls[0];
    expect(message).toBe(en.push.prompt);
    expect(options.action.label).toBe(en.push.enable);
    expect(options.cancel.label).toBe(en.push.notNow);
    expect(enablePush).not.toHaveBeenCalled();
  });

  it("asks for permission only when Enable is clicked", () => {
    render(<PushNotificationsGate />);
    vi.advanceTimersByTime(3000);
    toast.mock.calls[0][1].action.onClick();
    expect(enablePush).toHaveBeenCalledWith("en");
  });

  it("doesn't ask again for a week after Not now", () => {
    render(<PushNotificationsGate />);
    vi.advanceTimersByTime(3000);
    toast.mock.calls[0][1].cancel.onClick();
    cleanup();
    toast.mockClear();

    render(<PushNotificationsGate />);
    vi.advanceTimersByTime(3000);
    expect(toast).not.toHaveBeenCalled();
  });

  it("re-registers quietly when permission was already granted", () => {
    state.permission = "granted";
    render(<PushNotificationsGate />);
    vi.advanceTimersByTime(3000);
    expect(enablePush).toHaveBeenCalledWith("en");
    expect(toast).not.toHaveBeenCalled();
  });

  it("does nothing for guests or blocked browsers", () => {
    state.me = null;
    render(<PushNotificationsGate />);
    cleanup();
    state.me = { user: { id: "u1" }, provider: null };
    state.permission = "denied";
    render(<PushNotificationsGate />);
    vi.advanceTimersByTime(3000);
    expect(toast).not.toHaveBeenCalled();
    expect(enablePush).not.toHaveBeenCalled();
  });
});
