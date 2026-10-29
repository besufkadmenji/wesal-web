import { act, renderHook, waitFor } from "@testing-library/react";
import { NuqsTestingAdapter, type UrlUpdateEvent } from "nuqs/adapters/testing";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useAddAdAction } from "./useAddAdAction";

const state = vi.hoisted(() => ({
  me: null as null | { user?: object; provider?: object },
}));
const push = vi.fn();
vi.mock("@/hooks/useMe", () => ({ useMe: () => ({ me: state.me }) }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

const run = () => {
  const updates: UrlUpdateEvent[] = [];
  const wrapper = ({ children }: { children: ReactNode }) => (
    <NuqsTestingAdapter onUrlUpdate={(event) => updates.push(event)}>
      {children}
    </NuqsTestingAdapter>
  );
  const { result } = renderHook(() => useAddAdAction(), { wrapper });
  act(() => result.current());
  return updates;
};

/** ClickUp 869fn0fft: the home "Add your ad now" button had no action. */
describe("useAddAdAction", () => {
  afterEach(() => push.mockReset());

  it("offers a customer to become a provider", async () => {
    state.me = { user: {} };
    const updates = run();
    // nuqs writes the URL asynchronously.
    await waitFor(() =>
      expect(updates.at(-1)?.searchParams.get("be-provider")).toBe("true"),
    );
    expect(push).not.toHaveBeenCalled();
  });

  it("sends a provider to the add-ad form", () => {
    state.me = { provider: {} };
    run();
    expect(push).toHaveBeenCalledWith("/my-listings/add");
  });

  it("sends a visitor to the add-ad form (login comes first)", () => {
    state.me = null;
    run();
    expect(push).toHaveBeenCalledWith("/my-listings/add");
  });
});
