"use client";

import CancelContractIcon from "@/assets/icons/contracts/popup/cancel.contract.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDict } from "@/hooks/useDict";
import { X } from "lucide-react";

/** Figma pop up 14 (6578:59613): "are you sure?" before the cancel reason. */
export const ContractConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) => {
  const dict = useDict();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[657px]"
      >
        <div className="flex items-start gap-6">
          <span className="grid size-15 shrink-0 place-content-center rounded-2xl bg-[#fbeae9]">
            <CancelContractIcon className="size-7.5" />
          </span>
          <div className="grid min-w-0 flex-1 gap-2 pe-10 text-start">
            <DialogTitle className="text-xl leading-8 font-semibold text-[#1a1a1a]">
              {dict.contracts.confirmCancelTitle}
            </DialogTitle>
            <DialogDescription className="text-gray text-base leading-[1.7]">
              {dict.contracts.confirmCancelDescription}
            </DialogDescription>
          </div>
        </div>
        <div dir="ltr" className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-border h-12.5 rounded-[20px] text-base font-semibold text-[#4d4d4d] shadow-none hover:bg-[#e9e9e9]"
            >
              {dict.contracts.confirmCancelNo}
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={onConfirm}
            className="h-12.5 rounded-[20px] bg-[#b3251e] text-base font-semibold text-white hover:bg-[#9c1f19]"
          >
            {dict.contracts.confirmCancelYes}
          </Button>
        </div>
        <DialogClose className="text-gray border-border absolute inset-e-6 top-6 grid size-8 place-content-center rounded-2xl border bg-white transition hover:bg-[#f8f9fb]">
          <X className="size-4" />
          <span className="sr-only">{dict.common.cancel}</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
