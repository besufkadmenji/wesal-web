import { beforeEach, describe, expect, it, vi } from "vitest";

const { unregister, deleteToken } = vi.hoisted(() => ({
  unregister: vi.fn(() => Promise.resolve(true)),
  deleteToken: vi.fn(() => Promise.resolve(true)),
}));
vi.mock("@/services/push.service", () => ({
  PushService: { unregister, register: vi.fn() },
}));
vi.mock("firebase/app", () => ({
  getApps: () => [],
  getApp: vi.fn(),
  initializeApp: vi.fn(() => ({})),
}));
vi.mock("firebase/messaging", () => ({
  isSupported: () => Promise.resolve(true),
  getMessaging: vi.fn(() => ({})),
  getToken: vi.fn(),
  deleteToken,
}));

import { disablePush } from "@/utils/push";

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

describe("disablePush (ClickUp 869fp1jmt)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "localStorage", {
      value: memoryStorage(),
      configurable: true,
    });
  });

  it("unregisters this browser's token so the next person doesn't get pushes", async () => {
    window.localStorage.setItem("wesal.pushToken", "token-1");
    await disablePush();
    expect(unregister).toHaveBeenCalledWith("token-1");
    expect(deleteToken).toHaveBeenCalled();
    expect(window.localStorage.getItem("wesal.pushToken")).toBeNull();
  });

  it("does nothing when push was never turned on", async () => {
    await disablePush();
    expect(unregister).not.toHaveBeenCalled();
  });

  it("still signs out when the API call fails", async () => {
    window.localStorage.setItem("wesal.pushToken", "token-1");
    unregister.mockRejectedValueOnce(new Error("offline"));
    await expect(disablePush()).resolves.toBeUndefined();
  });
});
