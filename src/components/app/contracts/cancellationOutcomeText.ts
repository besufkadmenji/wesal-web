import { CancellationOutcome, type CancellationPreview } from "@/gql/graphql";

type Copy = {
  outcomeNoCharge: string;
  outcomePartialRefund: string;
  outcomeFullRefund: string;
  outcomeHeld: string;
};

const sar = (amount: number, lang: string) => {
  const value = new Intl.NumberFormat(lang === "ar" ? "ar-SA" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return lang === "ar" ? `${value} ر.س` : `SAR ${value}`;
};

/**
 * BRD 4.1.18: the money consequence of cancelling (or refusing receipt) now,
 * from the API's preview, so it always matches what the settlement does.
 */
export const cancellationOutcomeText = (
  preview:
    | Pick<CancellationPreview, "outcome" | "refundAmount" | "providerAmount">
    | null
    | undefined,
  copy: Copy,
  lang: string,
): string | null => {
  if (!preview) return null;
  const fill = (text: string) =>
    text
      .replace("{refund}", sar(preview.refundAmount, lang))
      .replace("{provider}", sar(preview.providerAmount, lang));
  switch (preview.outcome) {
    case CancellationOutcome.NoCharge:
      return copy.outcomeNoCharge;
    case CancellationOutcome.PartialRefund:
      return fill(copy.outcomePartialRefund);
    case CancellationOutcome.FullRefund:
      return fill(copy.outcomeFullRefund);
    case CancellationOutcome.Held:
      return copy.outcomeHeld;
    default:
      return null;
  }
};
