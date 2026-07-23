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

export const formatDays = (value: number | null | undefined, unit: string) =>
  value ? `${value} ${unit}` : "—";

export const formatContractReference = (
  contract: Pick<Contract, "id" | "publicId">,
) =>
  contract.publicId
    ? `TX-${contract.publicId}`
    : `TX-${contract.id.slice(0, 8).toUpperCase()}`;
