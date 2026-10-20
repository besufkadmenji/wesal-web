"use client";

import { ContractPaidNoticeDialog } from "@/components/app/contracts/ContractPaidNoticeDialog";
import { queryKeys } from "@/hooks/queryKeys";
import { useAppRouter } from "@/hooks/use.app.router";
import {
  useOverdueContracts,
  usePaidContractNotices,
} from "@/hooks/useContracts";
import { useMe } from "@/hooks/useMe";
import { ContractService } from "@/services/contract.service";
import { showErrorMessage } from "@/utils/show.messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * S4-12: tells the provider, once per contract and oldest first, that a
 * contract was paid and execution can start. The overdue pop-up wins while
 * one is showing.
 */
export const ContractPaidNoticeGate = () => {
  const { me, isLoggedIn } = useMe();
  const isProvider = isLoggedIn && Boolean(me?.provider);
  const notices = usePaidContractNotices(isProvider);
  const overdue = useOverdueContracts(isLoggedIn);
  const router = useAppRouter();
  const queryClient = useQueryClient();
  const oldest = notices.data?.[0];

  const acknowledge = useMutation({
    mutationFn: (contractId: string) =>
      ContractService.acknowledgePaid(contractId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.contracts, "paid-notices"],
      }),
    onError: (error) => showErrorMessage(error.message),
  });

  if (!isProvider || !oldest || overdue.data?.length) return null;

  return (
    <ContractPaidNoticeDialog
      contractNumber={String(oldest.publicId ?? oldest.id)}
      busy={acknowledge.isPending}
      onAcknowledge={() => acknowledge.mutate(oldest.id)}
      onOpenDetails={() =>
        acknowledge.mutate(oldest.id, {
          onSuccess: () => router.push(`/contracts?contractId=${oldest.id}`),
        })
      }
    />
  );
};
