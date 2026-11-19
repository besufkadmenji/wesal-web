import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen } from "@testing-library/react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BeProvider } from "./BeProvider";

const state = vi.hoisted(() => ({
  me: null as null | { user?: object; provider?: object },
}));
vi.mock("@/hooks/useMe", () => ({
  useMe: () => ({ me: state.me, logout: vi.fn() }),
}));
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/hooks/use.app.router", () => ({ useAppRouter: () => ({}) }));
vi.mock("@/assets/icons/be.provider.svg", () => ({ default: () => <svg /> }));

const note = en.auth.choose.providerSignOutNote;
const renderOpen = () =>
  render(
    <NuqsTestingAdapter searchParams="?be-provider=true">
      <BeProvider />
    </NuqsTestingAdapter>,
  );

/** ClickUp 869fmv02x: say that continuing signs the customer out. */
describe("BeProvider", () => {
  afterEach(cleanup);

  it("tells a signed-in customer they will be signed out", async () => {
    state.me = { user: {} };
    renderOpen();
    expect(await screen.findByText(note)).toBeInTheDocument();
  });

  it("shows no sign-out notice to a visitor", async () => {
    state.me = null;
    renderOpen();
    expect(
      await screen.findByText(en.auth.choose.providerDescription),
    ).toBeInTheDocument();
    expect(screen.queryByText(note)).not.toBeInTheDocument();
  });
});
