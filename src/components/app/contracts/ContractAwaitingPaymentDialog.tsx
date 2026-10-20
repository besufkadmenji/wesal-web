"use client";

import ClockIcon from "@/assets/icons/contracts/popup/clock.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDict } from "@/hooks/useDict";

/**
 * BRD 4.2.18 (provider): after accepting, "please wait for the payment to
 * the platform to be completed". No Figma design yet (D-23), so it follows
 * the pop-up 14 layout.
 */
export const ContractAwaitingPaymentDialog = ({
  open,
  onDone,
}: {
  open: boolean;
  onDone: () => void;
}) => {
  const dict = useDict();
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onDone()}>
      <DialogContent
        showCloseButton={false}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[657px]"
      >
        <div className="flex items-start gap-6">
          <span className="grid size-15 shrink-0 place-content-center rounded-2xl bg-[#e9f7ef]">
            <ClockIcon className="size-7.5" />
          </span>
          <div className="grid min-w-0 flex-1 gap-2 text-start">
            <DialogTitle className="text-xl leading-8 font-semibold text-[#1a1a1a]">
              {dict.payments.awaitingPaymentTitle}
            </DialogTitle>
            <DialogDescription className="text-gray text-base leading-[1.7]">
              {dict.payments.awaitingPaymentDescription}
            </DialogDescription>
          </div>
        </div>
        <Button
          type="button"
          onClick={onDone}
          className="bg-primary h-12.5 rounded-[20px] text-base font-semibold text-white"
        >
          {dict.payments.ok}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
