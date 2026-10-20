import type { Contract } from "@/gql/graphql";

export const CONTRACT_DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const toContractDate = (value: unknown): Date | null => {
  if (value == null || value === "") return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
};

export const formatContractDate = (value: unknown) => {
  const date = toContractDate(value);
  return date ? CONTRACT_DATE_FORMATTER.format(date) : "—";
};

export const formatHours = (value: number | null | undefined, unit: string) =>
  value ? `${value} ${unit}` : "—";

/**
 * Contract timeline in hours (PO 2026-10-18): execution time from the
 * provider's acceptance, delivery time from their completion (delivery
 * contracts only), and the expected total.
 */
export const contractTimeline = (
  contract: Pick<
    Contract,
    "executionHours" | "deliveryHours" | "deliveryCompanyId"
  >,
  copy: { hourUnit: string; awaitingProviderInput: string },
  isPending: boolean,
) => {
  if (isPending) {
    return {
      execution: copy.awaitingProviderInput,
      delivery: copy.awaitingProviderInput,
      total: copy.awaitingProviderInput,
    };
  }
  const usesDelivery = Boolean(contract.deliveryCompanyId);
  const deliveryKnown = !usesDelivery || contract.deliveryHours != null;
  const total =
    contract.executionHours && deliveryKnown
      ? contract.executionHours + (contract.deliveryHours ?? 0)
      : null;
  return {
    execution: formatHours(contract.executionHours, copy.hourUnit),
    delivery: usesDelivery
      ? contract.deliveryHours
        ? formatHours(contract.deliveryHours, copy.hourUnit)
        : copy.awaitingProviderInput
      : "—",
    total: total ? formatHours(total, copy.hourUnit) : "—",
  };
};

export const formatContractReference = (
  contract: Pick<Contract, "id" | "publicId">,
) =>
  contract.publicId
    ? `TX-${contract.publicId}`
    : `TX-${contract.id.slice(0, 8).toUpperCase()}`;
