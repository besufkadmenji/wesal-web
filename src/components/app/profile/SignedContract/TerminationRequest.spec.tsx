import { CancelContract } from "@/components/app/profile/SignedContract/CancelContact";
import { TerminationRequestNotice } from "@/components/app/profile/SignedContract/TerminationRequestNotice";
import en from "@/config/i18n/locales/en.json";
import { SignedContractStatus } from "@/gql/graphql";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { afterEach, describe, expect, it, vi } from "vitest";

const terminateContract = vi.fn();
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/hooks/useLang", () => ({ useLang: () => "en" }));
vi.mock("@/assets/icons/logout.outline.svg", () => ({
  default: (props: object) => <svg {...props} />,
}));
vi.mock("@/assets/icons/close.svg", () => ({
  default: (props: object) => <svg {...props} />,
}));
vi.mock("@/components/app/profile/SignedContract/useSignSignature", () => ({
  useSignSignature: () => ({ terminateContract, busy: false }),
}));

const copy = en.contract.terminationRequest;

describe("E-contract termination request (S4-58)", () => {
  afterEach(() => {
    cleanup();
    terminateContract.mockReset();
  });

  it("shows a pending request with its date and reason", () => {
    render(
      <TerminationRequestNotice
        contract={{
          status: SignedContractStatus.TerminationRequested,
          terminationRequestedAt: "2026-10-20T10:00:00Z",
          terminationRequestReason: "Closing the business",
        }}
      />,
    );
    expect(screen.getByText(copy.pendingTitle)).toBeInTheDocument();
    expect(screen.getByText(/October 20, 2026/)).toBeInTheDocument();
    expect(screen.getByText("Closing the business")).toBeInTheDocument();
  });

  it("shows the admin's rejection once the contract is active again", () => {
    render(
      <TerminationRequestNotice
        contract={{
          status: SignedContractStatus.Active,
          terminationRequestedAt: "2026-10-19T10:00:00Z",
          terminationRejectedAt: "2026-10-20T10:00:00Z",
          terminationRejectionReason: "Finish your open work first",
        }}
      />,
    );
    expect(screen.getByText(copy.rejectedTitle)).toBeInTheDocument();
    expect(screen.getByText("Finish your open work first")).toBeInTheDocument();
  });

  it("shows nothing for an active contract with no request", () => {
    const { container } = render(
      <TerminationRequestNotice
        contract={{ status: SignedContractStatus.Active }}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("confirms, asks for a reason, and stays open when the request fails", async () => {
    const user = userEvent.setup();
    terminateContract.mockResolvedValue(false);
    render(
      <NuqsTestingAdapter hasMemory>
        <CancelContract>
          <span>{en.contract.cancelContract}</span>
        </CancelContract>
      </NuqsTestingAdapter>,
    );

    await user.click(screen.getByText(en.contract.cancelContract));
    expect(
      await screen.findByText(en.contract.terminateConfirm.title),
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", {
        name: en.contract.terminateConfirm.confirm,
      }),
    );

    await user.type(
      screen.getByPlaceholderText(en.contract.cancelReason.placeholder),
      "Closing the business",
    );
    await user.click(
      screen.getByRole("button", { name: en.contract.cancelReason.send }),
    );
    expect(terminateContract).toHaveBeenCalledWith("Closing the business");
    expect(
      screen.getByPlaceholderText(en.contract.cancelReason.placeholder),
    ).toHaveValue("Closing the business");
  });
});
