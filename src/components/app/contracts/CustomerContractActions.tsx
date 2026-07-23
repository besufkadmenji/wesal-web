"use client";

import { InactiveAction } from "@/components/app/contracts/InactiveAction";
import { Button } from "@/components/ui/button";
import { ContractStatus, type Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";

export const CustomerContractActions = ({
  contract,
  onPay,
  onComplete,
}: {
  contract: Contract;
  onPay: () => void;
  onComplete: () => void;
}) => {
  const dict = useDict();
  const status = contract.status;
  const isPending = status === ContractStatus.Pending;
  const isPendingPayment = status === ContractStatus.Accepted;
  const isInProgress = status === ContractStatus.InProgress;
  const isCompleted = status === ContractStatus.Completed;
  const actionCount = isPendingPayment || isInProgress ? 3 : 2;

  return (
    <footer
      className={cn(
        "grid shrink-0 gap-3 bg-white p-6 pt-4",
        actionCount === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      <Link
        href={`/conversations/${contract.conversationId}`}
        className="bg-primary flex h-[50px] items-center justify-center gap-2 rounded-[20px] text-base font-semibold text-white transition hover:opacity-90"
      >
        <MessagesSquare className="size-5" />
        {dict.contracts.conversation}
      </Link>

      {isPendingPayment && (
        <Button
          type="button"
          onClick={onPay}
          className="text-primary h-[50px] rounded-[20px] bg-[#eff1f6] text-base font-semibold shadow-none hover:bg-[#e8ebf2]"
        >
          {dict.contracts.pay}
        </Button>
      )}
      {isInProgress && (
        <Button
          type="button"
          onClick={onComplete}
          className="text-primary h-[50px] rounded-[20px] bg-[#eff1f6] text-base font-semibold shadow-none hover:bg-[#e8ebf2]"
        >
          {dict.contracts.completeContract}
        </Button>
      )}
      {isCompleted && (
        <Link
          href={`/contracts/${contract.id}`}
          className="text-primary flex h-[50px] items-center justify-center rounded-[20px] bg-[#eff1f6] text-base font-semibold transition hover:bg-[#e8ebf2]"
        >
          {dict.contracts.viewDetails}
        </Link>
      )}
      {(isPending || isPendingPayment || isInProgress) && (
        <InactiveAction className="bg-[#fbe8e7] text-[#c12620]">
          {dict.contracts.cancelContract}
        </InactiveAction>
      )}
    </footer>
  );
};
