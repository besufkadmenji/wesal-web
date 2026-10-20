"use client";

import ContractCompletionIcon from "@/assets/icons/contracts/popup/contract.completion.svg";
import { SignatureInput } from "@/components/app/profile/SignedContract/SignatureInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDict } from "@/hooks/useDict";
import { X } from "lucide-react";
import { useState } from "react";

/**
 * Figma pop up 36 (6578:59570): the provider's completion signature. The
 * stored signature is reused (one per party), so it's shown read-only. BRD:
 * when a delivery company was chosen, the provider also enters delivery hours.
 */
export const ProviderCompletionDialog = ({
  open,
  onOpenChange,
  requiresDelivery,
  signatureUrl,
  isPending,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requiresDelivery: boolean;
  signatureUrl: string | null;
  isPending: boolean;
  onConfirm: (deliveryHours?: number) => void;
}) => {
  const dict = useDict();
  const [hours, setHours] = useState("");
  const parsedHours = Number(hours);
  const isValid =
    !requiresDelivery ||
    (hours !== "" && Number.isInteger(parsedHours) && parsedHours > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[657px]"
      >
        <div className="flex items-start gap-6">
          <span className="text-primary grid size-15 shrink-0 place-content-center rounded-2xl bg-[#eff1f6]">
            <ContractCompletionIcon className="size-7.5" />
          </span>
          <div className="grid min-w-0 flex-1 gap-4">
            <div className="grid gap-2 pe-10 text-start">
              <DialogTitle className="text-xl leading-8 font-semibold text-[#1a1a1a]">
                {dict.contracts.providerCompletionTitle}
              </DialogTitle>
              <DialogDescription className="text-gray text-base leading-[1.7]">
                {dict.contracts.providerCompletionDescription}
              </DialogDescription>
            </div>
            <div className="grid gap-2">
              <SignatureInput
                label={dict.contracts.providerCompletionSignature}
                initUrl={signatureUrl}
                file={null}
                disabled
              />
              <p className="text-start text-xs leading-[1.7] text-[#999]">
                {dict.contracts.signatureOnce}
              </p>
            </div>
            {requiresDelivery && (
              <div className="grid gap-2 text-start">
                <label htmlFor="delivery-hours" className="text-sm">
                  {dict.contracts.deliveryHours}
                </label>
                <Input
                  id="delivery-hours"
                  type="number"
                  min={1}
                  step={1}
                  value={hours}
                  placeholder={dict.contracts.deliveryHours}
                  onChange={(event) => setHours(event.target.value)}
                  disabled={isPending}
                  className="h-12.5 rounded-[20px] border-[#f2f2f2]"
                />
              </div>
            )}
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
            disabled={!isValid || isPending}
            onClick={() =>
              onConfirm(requiresDelivery ? parsedHours : undefined)
            }
            className="bg-primary h-12.5 rounded-[20px] text-base font-semibold text-white"
          >
            {isPending
              ? dict.contracts.completionSubmitting
              : dict.contracts.submitCompletionSignature}
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
