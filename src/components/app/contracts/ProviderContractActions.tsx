"use client";

import { Button } from "@/components/ui/button";
import { ContractStatus, type Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { queryKeys } from "@/hooks/queryKeys";
import { cn } from "@/lib/utils";
import { ContractService } from "@/services/contract.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProviderCompletionDialog } from "./ProviderCompletionDialog";
import { ContractSignatureType } from "@/gql/graphql";

export const ProviderContractActions = ({
  contract,
}: {
  contract: Contract;
}) => {
  const dict = useDict();
  const status = contract.status;
  const isInProgress = status === ContractStatus.InProgress;
  const isCompleted = status === ContractStatus.Completed;
  const [completionOpen, setCompletionOpen] = useState(false);
  const queryClient = useQueryClient();
  const complete = useMutation({
    mutationFn: (deliveryEstimateDays?: number) => {
      const signatureData = contract.signatures.find(
        (signature) =>
          signature.signatureType === ContractSignatureType.ProviderAcceptance,
      )?.signatureData;
      if (!signatureData) {
        throw new Error(dict.contracts.completionSignatureRequired);
      }
      return ContractService.providerComplete({
        contractId: contract.id,
        signatureData,
        deliveryEstimateDays,
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.contracts }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.contract(contract.id),
        }),
      ]);
      showSuccessMessage(dict.contracts.completionSubmitted);
      setCompletionOpen(false);
    },
    onError: (error) => showErrorMessage(error.message),
  });
  const actionCount = isCompleted || isInProgress ? 2 : 1;

  return (
    <footer
      className={cn(
        "grid shrink-0 gap-3 bg-white p-6 pt-4",
        actionCount === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1",
      )}
    >
      <Link
        href={`/conversations/${contract.conversationId}`}
        className="bg-primary flex h-[50px] items-center justify-center gap-2 rounded-[20px] text-base font-semibold text-white transition hover:opacity-90"
      >
        <MessagesSquare className="size-5" />
        {dict.contracts.conversation}
      </Link>

      {isCompleted && (
        <Link
          href={`/contracts/${contract.id}`}
          className="text-primary flex h-[50px] items-center justify-center rounded-[20px] bg-[#eff1f6] text-base font-semibold transition hover:bg-[#e8ebf2]"
        >
          {dict.contracts.viewDetails}
        </Link>
      )}
      {isInProgress && (
        <Button
          type="button"
          onClick={() => setCompletionOpen(true)}
          className="text-primary h-[50px] rounded-[20px] bg-[#eff1f6] text-base font-semibold shadow-none hover:bg-[#e8ebf2]"
        >
          {dict.contracts.completeContract}
        </Button>
      )}
      <ProviderCompletionDialog
        open={completionOpen}
        onOpenChange={setCompletionOpen}
        requiresDelivery={Boolean(contract.deliveryCompanyId)}
        isPending={complete.isPending}
        onConfirm={(deliveryEstimateDays) =>
          complete.mutate(deliveryEstimateDays)
        }
      />
    </footer>
  );
};
