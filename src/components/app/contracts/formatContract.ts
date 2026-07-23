import type { Contract } from "@/gql/graphql";

export const CONTRACT_DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export const formatContractDate = (value: string | Date | null | undefined) =>
  value ? CONTRACT_DATE_FORMATTER.format(new Date(value)) : "—";

export const formatDays = (value: number | null | undefined, unit: string) =>
  value ? `${value} ${unit}` : "—";

export const formatContractReference = (
  contract: Pick<Contract, "id" | "publicId">,
) =>
  contract.publicId
    ? `TX-${contract.publicId}`
    : `TX-${contract.id.slice(0, 8).toUpperCase()}`;
