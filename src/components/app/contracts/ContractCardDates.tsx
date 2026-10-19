"use client";

import { ContractCardDate } from "@/components/app/contracts/ContractCardDate";
import {
  ContractStatus,
  ContractStatusGroup,
  type Contract,
} from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";
import { CalendarCheck2, CalendarDays } from "lucide-react";

export const ContractCardDates = ({ contract }: { contract: Contract }) => {
  const dict = useDict();
  // Figma: the acceptance date once a contract is accepted (not on pending or
  // cancelled cards); the completion date only on completed ones.
  const showsAcceptance =
    Boolean(contract.acceptedAt) &&
    contract.statusGroup !== ContractStatusGroup.PendingAcceptance &&
    contract.statusGroup !== ContractStatusGroup.Cancelled;
  const isCompleted = contract.status === ContractStatus.Completed;

  if (!showsAcceptance) {
    return <div aria-hidden className="mx-3 mt-2 h-6" />;
  }

  return (
    <div
      className={cn(
        "mx-3 mt-2 flex h-6 items-start gap-2",
        isCompleted ? "justify-between" : "justify-center",
      )}
    >
      <ContractCardDate
        icon={CalendarDays}
        label={dict.contracts.acceptedAt}
        value={contract.acceptedAt}
        className={isCompleted ? "flex-1" : undefined}
      />
      {isCompleted && (
        <ContractCardDate
          icon={CalendarCheck2}
          label={dict.contracts.completedAt}
          value={contract.completedAt ?? contract.updatedAt}
          className="flex-1"
        />
      )}
    </div>
  );
};
