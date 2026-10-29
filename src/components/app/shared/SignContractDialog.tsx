"use client";

import ContractIcon from "@/assets/icons/contracts/popup/contract.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDict } from "@/hooks/useDict";
import { X } from "lucide-react";
import Link from "next/link";

/**
 * A provider without an active e-contract is told to sign it, with the
 * choice to stay on the page (ClickUp 869fmna2q, 869fmn4gn). Same layout as
 * the pending-payment pop-up.
 */
export const SignContractDialog = ({ onClose }: { onClose: () => void }) => {
  const dict = useDict();
  const copy = dict.signContractPrompt;
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[657px]"
      >
        <div className="flex items-start gap-6">
          <span className="grid size-15 shrink-0 place-content-center rounded-2xl bg-[#eff1f6]">
            <ContractIcon className="size-7.5" />
          </span>
          <div className="grid min-w-0 flex-1 gap-2 text-start">
            <DialogTitle className="text-xl leading-8 font-semibold text-[#1a1a1a]">
              {copy.title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 font-medium text-[#4d4d4d]">
              {copy.message}
            </DialogDescription>
          </div>
          <button
            type="button"
            aria-label={dict.common.close}
            onClick={onClose}
            className="text-gray grid size-8 shrink-0 place-content-center rounded-full border border-[#f2f2f2] bg-white transition hover:bg-[#f8f9fb]"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            asChild
            className="bg-primary h-12.5 rounded-[20px] text-base font-semibold text-white"
          >
            <Link href="/profile/signed-contract">{copy.sign}</Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-12.5 rounded-[20px] border-[#f2f2f2] text-base font-semibold"
          >
            {copy.stay}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
