import { getContractStatusLabel } from "@/components/app/contracts/ContractStatusPill";
import ar from "@/config/i18n/locales/ar.json";
import en from "@/config/i18n/locales/en.json";
import { ContractStatus } from "@/gql/graphql";
import { describe, expect, it } from "vitest";

describe("contract status pill labels", () => {
  it("names an admin-closed contract apart from a completed one (Q-C3)", () => {
    for (const dict of [en, ar]) {
      const resolved = getContractStatusLabel(
        ContractStatus.AdminResolved,
        dict as never,
      );
      expect(resolved).toBe(dict.contracts.adminResolved);
      expect(resolved).not.toBe(
        getContractStatusLabel(ContractStatus.Completed, dict as never),
      );
    }
  });

  it("has a label for every status", () => {
    for (const status of Object.values(ContractStatus)) {
      expect(getContractStatusLabel(status, en as never)).not.toBe(
        status.replaceAll("_", " "),
      );
    }
  });
});
