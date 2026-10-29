import en from "@/config/i18n/locales/en.json";
import { SignedContractStatus } from "@/gql/graphql";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SignContractGate } from "./SignContractGate";

const state = vi.hoisted(() => ({
  me: null as null | { user?: object; provider?: object | null },
  pathname: "/en",
}));
vi.mock("@/hooks/useMe", () => ({ useMe: () => ({ me: state.me }) }));
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("next/navigation", () => ({ usePathname: () => state.pathname }));
vi.mock("@/assets/icons/contracts/popup/contract.svg", () => ({
  default: () => <svg />,
}));

const copy = en.signContractPrompt;
const provider = (status?: SignedContractStatus) => ({
  provider: { id: "p1", signedContract: status ? { status } : null },
});

/** ClickUp 869fmna2q, 869fmn4gn: explain instead of bouncing every link. */
describe("SignContractGate", () => {
  afterEach(() => {
    cleanup();
    state.pathname = "/en";
  });

  it.each([undefined, SignedContractStatus.Pending])(
    "asks a provider with contract %s to sign",
    (status) => {
      state.me = provider(status);
      render(<SignContractGate />);
      expect(screen.getByText(copy.title)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: copy.sign })).toHaveAttribute(
        "href",
        "/profile/signed-contract",
      );
    },
  );

  it("lets the provider stay, and asks again on the next page", async () => {
    state.me = provider(SignedContractStatus.Pending);
    const { rerender } = render(<SignContractGate />);
    await userEvent
      .setup()
      .click(screen.getByRole("button", { name: copy.stay }));
    expect(screen.queryByText(copy.title)).not.toBeInTheDocument();

    state.pathname = "/en/my-listings";
    rerender(<SignContractGate />);
    expect(screen.getByText(copy.title)).toBeInTheDocument();
  });

  it.each([
    ["the contract page", provider(), "/en/profile/signed-contract"],
    ["an active contract", provider(SignedContractStatus.Active), "/en"],
    ["a customer", { user: {} }, "/en"],
    ["a visitor", null, "/en"],
  ])("stays hidden for %s", (_label, me, pathname) => {
    state.me = me;
    state.pathname = pathname;
    render(<SignContractGate />);
    expect(screen.queryByText(copy.title)).not.toBeInTheDocument();
  });
});
