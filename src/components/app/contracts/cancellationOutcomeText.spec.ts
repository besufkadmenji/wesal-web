import { cancellationOutcomeText } from "@/components/app/contracts/cancellationOutcomeText";
import ar from "@/config/i18n/locales/ar.json";
import en from "@/config/i18n/locales/en.json";
import { CancellationOutcome } from "@/gql/graphql";
import { describe, expect, it } from "vitest";

const preview = (outcome: CancellationOutcome, refund = 0, provider = 0) => ({
  outcome,
  refundAmount: refund,
  providerAmount: provider,
});

describe("cancellationOutcomeText (BRD 4.1.18)", () => {
  it("states the refund and the provider's share in English", () => {
    expect(
      cancellationOutcomeText(
        preview(CancellationOutcome.PartialRefund, 315, 24),
        en.contracts,
        "en",
      ),
    ).toBe(
      "You will get back SAR 315.00. The deposit goes to the service provider (SAR 24.00 after the platform commission).",
    );
    expect(
      cancellationOutcomeText(
        preview(CancellationOutcome.FullRefund, 345),
        en.contracts,
        "en",
      ),
    ).toContain("SAR 345.00");
  });

  it("uses Arabic digits and currency in Arabic", () => {
    const text = cancellationOutcomeText(
      preview(CancellationOutcome.PartialRefund, 315, 24),
      ar.contracts,
      "ar",
    );
    expect(text).toContain("٣١٥٫٠٠ ر.س");
    expect(text).not.toContain("{refund}");
  });

  it("explains held money and no-charge cancellations, and stays quiet otherwise", () => {
    expect(
      cancellationOutcomeText(
        preview(CancellationOutcome.Held),
        en.contracts,
        "en",
      ),
    ).toBe(en.contracts.outcomeHeld);
    expect(
      cancellationOutcomeText(
        preview(CancellationOutcome.NoCharge),
        en.contracts,
        "en",
      ),
    ).toBe(en.contracts.outcomeNoCharge);
    expect(
      cancellationOutcomeText(
        preview(CancellationOutcome.NotCancellable),
        en.contracts,
        "en",
      ),
    ).toBeNull();
    expect(cancellationOutcomeText(null, en.contracts, "en")).toBeNull();
  });
});
