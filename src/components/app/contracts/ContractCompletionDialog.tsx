"use client";

import ContractIcon from "@/assets/icons/contracts/popup/contract.svg";
import { SignatureInput } from "@/components/app/profile/SignedContract/SignatureInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Contract } from "@/gql/graphql";
import { ContractSignatureType } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { ContractService } from "@/services/contract.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";

export const ContractCompletionDialog = ({
  contract,
  open,
  onOpenChange,
  onCompleted,
}: {
  contract: Contract;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleted: () => void;
}) => {
  const dict = useDict();
  const queryClient = useQueryClient();
  const { me } = useMe();
  const acceptanceSignature = contract.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.CustomerAcceptance,
  )?.signatureData;
  const customerSignature =
    me?.user?.contractSignature || acceptanceSignature || null;

  const complete = useMutation({
    mutationFn: () => ContractService.complete({ contractId: contract.id }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.contracts }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.contract(contract.id),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.conversation(contract.conversationId),
        }),
      ]);
      showSuccessMessage(dict.contracts.completionSubmitted);
      onOpenChange(false);
      onCompleted();
    },
    onError: (error) => showErrorMessage(error.message),
  });

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[657px]"
      >
        <div className="flex items-start gap-6">
          <div className="min-w-0 flex-1">
            <div className="grid gap-2 text-start">
              <DialogTitle className="text-xl leading-8 font-semibold text-[#1a1a1a]">
                {dict.contracts.completionTitle}
              </DialogTitle>
              <DialogDescription className="text-gray text-base leading-[1.7]">
                {dict.contracts.completionDescription}
              </DialogDescription>
            </div>

            <div className="mt-4 grid gap-8">
              <div className="grid gap-2">
                <SignatureInput
                  label={dict.contracts.signature}
                  initUrl={customerSignature}
                  file={null}
                  disabled
                />
                <p className="text-gray text-start text-xs leading-[1.7]">
                  {dict.contracts.signatureOnce}
                </p>
              </div>
            </div>
          </div>

          <span className="text-primary grid size-[60px] shrink-0 place-content-center rounded-2xl bg-[#eff1f6]">
            <ContractIcon className="size-[30px]" />
          </span>
        </div>

        <div dir="ltr" className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button
              type="button"
              disabled={complete.isPending}
              className="h-[50px] rounded-[20px] bg-[#f2f2f2] text-base font-semibold text-[#4d4d4d] shadow-none hover:bg-[#e9e9e9]"
            >
              {dict.common.cancel}
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={complete.isPending}
            onClick={() => complete.mutate()}
            className="bg-primary h-[50px] rounded-[20px] text-base font-semibold text-white"
          >
            {complete.isPending
              ? dict.contracts.completionSubmitting
              : dict.contracts.submitCompletionSignature}
          </Button>
        </div>

        <DialogClose
          disabled={complete.isPending}
          className="text-gray absolute end-6 top-6 grid size-8 place-content-center rounded-full border border-[#f2f2f2] bg-white transition hover:bg-[#f8f9fb] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="size-4" />
          <span className="sr-only">{dict.common.cancel}</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
