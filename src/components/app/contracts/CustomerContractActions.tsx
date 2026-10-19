"use client";

import { cancellationOutcomeText } from "@/components/app/contracts/cancellationOutcomeText";
import { Button } from "@/components/ui/button";
import { ContractStatus, type Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { queryKeys } from "@/hooks/queryKeys";
import { cn } from "@/lib/utils";
import { ContractService } from "@/services/contract.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ContractConfirmDialog } from "./ContractConfirmDialog";
import { ContractReasonDialog } from "./ContractReasonDialog";

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
  const lang = useLang();
  const status = contract.status;
  const isPendingPayment = status === ContractStatus.Accepted;
  const isPending = status === ContractStatus.Pending;
  const isInProgress = status === ContractStatus.InProgress;
  const isAwaitingConfirmation =
    status === ContractStatus.AwaitingCustomerConfirmation;
  const isDeliveryInProgress = status === ContractStatus.DeliveryInProgress;
  const isCompleted = status === ContractStatus.Completed;
  const isRejected = status === ContractStatus.Rejected;
  const canCancel =
    isPending ||
    isPendingPayment ||
    isInProgress ||
    isAwaitingConfirmation ||
    isDeliveryInProgress;
  const canComplete = isAwaitingConfirmation || isDeliveryInProgress;
  const outcome = cancellationOutcomeText(
    contract.cancellationPreview,
    dict.contracts,
    lang,
  );
  const [reasonMode, setReasonMode] = useState<"cancel" | "refuse" | null>(
    null,
  );
  // Figma: cancel asks "are you sure?" first (pop up 14); refuse receipt's
  // reason pop-up (38) is itself the confirmation.
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const queryClient = useQueryClient();
  const lifecycle = useMutation({
    mutationFn: (reason: string) =>
      reasonMode === "refuse"
        ? ContractService.refuseDelivery({ contractId: contract.id, reason })
        : ContractService.requestCancellation({
            contractId: contract.id,
            reason,
          }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.contracts }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.contract(contract.id),
        }),
      ]);
      showSuccessMessage(dict.contracts.requestSubmitted);
      setReasonMode(null);
    },
    onError: (error) => showErrorMessage(error.message),
  });
  const actionCount = isPendingPayment || canCancel || canComplete ? 3 : 2;

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
      {canComplete && (
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
      {isRejected && (
        <Link
          href={`/contracts/${contract.id}/resend`}
          className="text-primary flex h-[50px] items-center justify-center rounded-[20px] bg-[#eff1f6] text-base font-semibold transition hover:bg-[#e8ebf2]"
        >
          {dict.contracts.resend}
        </Link>
      )}
      {canCancel && (
        <Button
          type="button"
          onClick={() =>
            isDeliveryInProgress
              ? setReasonMode("refuse")
              : setConfirmingCancel(true)
          }
          className="h-[50px] rounded-[20px] bg-[#fbe8e7] text-[#c12620] shadow-none hover:bg-[#f7d8d6]"
        >
          {isDeliveryInProgress
            ? dict.contracts.rejectDelivery
            : dict.contracts.cancelContract}
        </Button>
      )}
      <ContractConfirmDialog
        outcome={outcome}
        open={confirmingCancel}
        onOpenChange={setConfirmingCancel}
        onConfirm={() => {
          setConfirmingCancel(false);
          setReasonMode("cancel");
        }}
      />
      <ContractReasonDialog
        outcome={outcome}
        open={reasonMode != null}
        onOpenChange={(nextOpen) => !nextOpen && setReasonMode(null)}
        variant={reasonMode ?? "cancel"}
        isPending={lifecycle.isPending}
        onConfirm={(reason) => lifecycle.mutate(reason)}
      />
    </footer>
  );
};
