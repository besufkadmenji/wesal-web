import { afterEach, describe, expect, it, vi } from "vitest";

type Options = { connectionParams: () => Record<string, unknown> };
const created = vi.hoisted(() => ({ options: null as Options | null }));
const terminate = vi.hoisted(() => vi.fn());
vi.mock("graphql-ws", () => ({
  createClient: vi.fn((options: Options) => {
    created.options = options;
    return { terminate, subscribe: vi.fn(), on: vi.fn(), dispose: vi.fn() };
  }),
}));

const atPath = (path: string) => window.history.replaceState(null, "", path);

describe("syncRealtimeLanguage (Q-30)", () => {
  afterEach(() => {
    vi.resetModules();
    terminate.mockClear();
    atPath("/");
  });

  it("does nothing before the live socket has connected", async () => {
    const apollo = await import("@/utils/apollo.client");
    expect(apollo.syncRealtimeLanguage("ar")).toBe(false);
    apollo.default();
    expect(apollo.syncRealtimeLanguage("ar")).toBe(false);
    expect(terminate).not.toHaveBeenCalled();
  });

  it("restarts the socket only when the page language changed", async () => {
    const apollo = await import("@/utils/apollo.client");
    apollo.default();
    atPath("/en/contracts");
    created.options!.connectionParams(); // connected in English

    expect(apollo.syncRealtimeLanguage("en")).toBe(false);
    expect(apollo.syncRealtimeLanguage("ar")).toBe(true);
    expect(terminate).toHaveBeenCalledTimes(1);
    // Until it reconnects, a second check doesn't restart it again.
    expect(apollo.syncRealtimeLanguage("ar")).toBe(false);
  });
});
