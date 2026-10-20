"use client";

import FinanceIcon from "@/assets/icons/contracts/popup/finance.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDict } from "@/hooks/useDict";

/**
 * BRD 4.1.17: the provider's "contract paid, please execute" pop-up (S4-12).
 * No Figma design yet (D-23), so it follows the pop-up 14 layout.
 */
export const ContractPaidNoticeDialog = ({
  contractNumber,
  busy,
  onOpenDetails,
  onAcknowledge,
}: {
  contractNumber: string;
  busy: boolean;
  onOpenDetails: () => void;
  onAcknowledge: () => void;
}) => {
  const dict = useDict();
  const block = (event: Event) => event.preventDefault();
  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={block}
        onPointerDownOutside={block}
        onInteractOutside={block}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[657px]"
      >
        <div className="flex items-start gap-6">
          <span className="grid size-15 shrink-0 place-content-center rounded-2xl bg-[#e9f7ef]">
            <FinanceIcon className="size-7.5" />
          </span>
          <div className="grid min-w-0 flex-1 gap-2 text-start">
            <DialogTitle className="text-xl leading-8 font-semibold text-[#1a1a1a]">
              {dict.payments.paidNoticeTitle}
            </DialogTitle>
            <p className="text-sm font-medium text-[#4d4d4d]">
              {dict.contracts.contractNumber}: {contractNumber}
            </p>
            <DialogDescription className="text-gray text-base leading-[1.7]">
              {dict.payments.paidNoticeDescription}
            </DialogDescription>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            disabled={busy}
            onClick={onOpenDetails}
            className="bg-primary h-12.5 rounded-[20px] text-base font-semibold text-white"
          >
            {dict.payments.contractDetails}
          </Button>
          <Button
            type="button"
            disabled={busy}
            onClick={onAcknowledge}
            className="h-12.5 rounded-[20px] bg-[#f2f2f2] text-base font-semibold text-[#4d4d4d] shadow-none hover:bg-[#e9e9e9]"
          >
            {dict.payments.ok}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
