"use client";

import CancelReasonIcon from "@/assets/icons/contracts/popup/cancel.reason.svg";
import RefuseReceiptIcon from "@/assets/icons/contracts/popup/refuse.receipt.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

/**
 * Figma pop up 13 (cancellation reason, 6442:10690) and pop up 38 (refuse
 * receipt, 6588:13358). The reason is mandatory (BRD "يجب إدخال السبب اولا").
 */
export const ContractReasonDialog = ({
  open,
  onOpenChange,
  variant,
  isPending,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "cancel" | "refuse";
  isPending: boolean;
  onConfirm: (reason: string) => void;
}) => {
  const dict = useDict();
  const [reason, setReason] = useState("");
  const [showError, setShowError] = useState(false);
  const refuse = variant === "refuse";
  const Icon = refuse ? RefuseReceiptIcon : CancelReasonIcon;

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;
    if (!nextOpen) {
      setReason("");
      setShowError(false);
    }
    onOpenChange(nextOpen);
  };

  const submit = () => {
    if (!reason.trim()) {
      setShowError(true);
      return;
    }
    onConfirm(reason.trim());
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[657px]"
      >
        <div className="flex items-start gap-6">
          <span className="text-primary grid size-15 shrink-0 place-content-center rounded-2xl bg-[#eff1f6]">
            <Icon className="size-7.5" />
          </span>
          <div className="grid min-w-0 flex-1 gap-4">
            <div className="grid gap-2 pe-10 text-start">
              <DialogTitle className="text-xl leading-8 font-semibold text-[#1a1a1a]">
                {refuse
                  ? dict.contracts.refuseDeliveryTitle
                  : dict.contracts.cancellationTitle}
              </DialogTitle>
              <DialogDescription className="text-gray text-base leading-[1.7]">
                {refuse
                  ? dict.contracts.refuseDeliveryDescription
                  : dict.contracts.cancellationDescription}
              </DialogDescription>
            </div>
            <div className="grid gap-1.5">
              <Textarea
                value={reason}
                onChange={(event) => {
                  setReason(event.target.value);
                  if (event.target.value.trim()) setShowError(false);
                }}
                placeholder={dict.contracts.reasonPlaceholder}
                disabled={isPending}
                aria-invalid={showError}
                className={cn(
                  "h-30 min-h-30 rounded-[20px] border-[#f2f2f2] px-4 py-4 text-sm",
                  showError && "border-[#b3251e]",
                )}
              />
              {showError && (
                <p role="alert" className="text-start text-sm text-[#b3251e]">
                  {dict.contracts.reasonRequired}
                </p>
              )}
            </div>
          </div>
        </div>
        <div dir="ltr" className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button
              type="button"
              disabled={isPending}
              className="bg-border h-12.5 rounded-[20px] text-base font-semibold text-[#4d4d4d] shadow-none hover:bg-[#e9e9e9]"
            >
              {dict.common.cancel}
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={isPending}
            onClick={submit}
            className="bg-primary h-12.5 rounded-[20px] text-base font-semibold text-white"
          >
            {isPending ? dict.contracts.submitting : dict.contracts.send}
          </Button>
        </div>
        <DialogClose
          disabled={isPending}
          className="text-gray border-border absolute inset-e-6 top-6 grid size-8 place-content-center rounded-2xl border bg-white transition hover:bg-[#f8f9fb] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="size-4" />
          <span className="sr-only">{dict.common.cancel}</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
