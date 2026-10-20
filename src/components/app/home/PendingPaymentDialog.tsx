"use client";

import WalletIcon from "@/assets/icons/contracts/popup/finance.svg";
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
 * BRD 4.1.16 (customer): once the provider accepts, reaching home shows
 * "please pay the contract amount to start it" with "Go to contract". No
 * Figma design yet (D-23), so it follows the pop-up 14 layout.
 */
export const PendingPaymentDialog = ({
  contractNumber,
  href,
  onClose,
}: {
  contractNumber: string;
  href: string;
  onClose: () => void;
}) => {
  const dict = useDict();
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[657px]"
      >
        <div className="flex items-start gap-6">
          <span className="grid size-15 shrink-0 place-content-center rounded-2xl bg-[#eff1f6]">
            <WalletIcon className="size-7.5" />
          </span>
          <div className="grid min-w-0 flex-1 gap-2 text-start">
            <DialogTitle className="text-xl leading-8 font-semibold text-[#1a1a1a]">
              {dict.payments.payPromptTitle}
            </DialogTitle>
            <DialogDescription className="text-sm font-medium text-[#4d4d4d]">
              {dict.contracts.contractNumber}: {contractNumber}
            </DialogDescription>
          </div>
          <button
            type="button"
            aria-label={dict.common.cancel}
            onClick={onClose}
            className="text-gray grid size-8 shrink-0 place-content-center rounded-full border border-[#f2f2f2] bg-white transition hover:bg-[#f8f9fb]"
          >
            <X className="size-4" />
          </button>
        </div>
        <Button
          asChild
          className="bg-primary h-12.5 rounded-[20px] text-base font-semibold text-white"
        >
          <Link href={href}>{dict.payments.goToContract}</Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
};
