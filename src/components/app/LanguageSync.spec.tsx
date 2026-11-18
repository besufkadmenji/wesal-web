import { LanguageSync } from "@/components/app/LanguageSync";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  lang: "ar",
  restarted: true,
  permission: "granted",
}));
const syncRealtimeLanguage = vi.hoisted(() =>
  vi.fn((lang: string) => Boolean(lang) && state.restarted),
);
const enablePush = vi.hoisted(() => vi.fn(() => Promise.resolve("granted")));

vi.mock("@/hooks/useLang", () => ({ useLang: () => state.lang }));
vi.mock("@/utils/apollo.client", () => ({ syncRealtimeLanguage }));
vi.mock("@/utils/push", () => ({
  enablePush,
  pushPermission: () => state.permission,
}));

const renderSync = () => {
  const queryClient = new QueryClient();
  const invalidate = vi.spyOn(queryClient, "invalidateQueries");
  render(
    <QueryClientProvider client={queryClient}>
      <LanguageSync />
    </QueryClientProvider>,
  );
  return invalidate;
};

describe("LanguageSync (Q-30)", () => {
  afterEach(() => {
    vi.clearAllMocks();
    Object.assign(state, {
      lang: "ar",
      restarted: true,
      permission: "granted",
    });
  });

  it("checks the live socket's language on mount (the [lang] layout remounts)", () => {
    renderSync();
    expect(syncRealtimeLanguage).toHaveBeenCalledWith("ar");
  });

  it("re-reads notifications and updates push when the socket restarted", () => {
    const invalidate = renderSync();
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["notifications"] });
    expect(invalidate).toHaveBeenCalledWith({
      queryKey: ["notification-stats"],
    });
    expect(enablePush).toHaveBeenCalledWith("ar");
  });

  it("does nothing more when the socket already matches", () => {
    state.restarted = false;
    const invalidate = renderSync();
    expect(invalidate).not.toHaveBeenCalled();
    expect(enablePush).not.toHaveBeenCalled();
  });

  it("leaves push alone when it isn't allowed", () => {
    state.permission = "default";
    renderSync();
    expect(enablePush).not.toHaveBeenCalled();
  });
});
