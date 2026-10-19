import { ContractRemovedNotice } from "@/components/app/contracts/ContractRemovedNotice";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));

describe("ContractRemovedNotice (D-13)", () => {
  afterEach(cleanup);

  it("explains that the contract was removed and can be dismissed", async () => {
    const onDismiss = vi.fn();
    render(<ContractRemovedNotice onDismiss={onDismiss} />);

    expect(screen.getByRole("status")).toHaveTextContent(
      en.contracts.removedTitle,
    );
    await userEvent.click(
      screen.getByRole("button", { name: en.common.cancel }),
    );
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
