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
 * S4-19 blocking pop-up (BRD 4.1.16 / 4.2.18 notes). It can't be dismissed:
 * the only way on is the contract details. No Figma design yet (D-23), so it
 * follows the pop-up 14 layout.
 */
export const OverdueContractDialog = ({
  contractNumber,
  isProvider,
  onOpenDetails,
}: {
  contractNumber: string;
  isProvider: boolean;
  onOpenDetails: () => void;
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
          <span className="grid size-15 shrink-0 place-content-center rounded-2xl bg-[#fdf3e7]">
            <ClockIcon className="size-7.5" />
          </span>
          <div className="grid min-w-0 flex-1 gap-2 text-start">
            <DialogTitle className="text-xl leading-8 font-semibold text-[#1a1a1a]">
              {dict.contracts.overdueTitle}
            </DialogTitle>
            <p className="text-sm font-medium text-[#4d4d4d]">
              {dict.contracts.contractNumber}: {contractNumber}
            </p>
            <DialogDescription className="text-gray text-base leading-[1.7]">
              {isProvider
                ? dict.contracts.overdueProviderDescription
                : dict.contracts.overdueCustomerDescription}
            </DialogDescription>
          </div>
        </div>
        <Button
          type="button"
          onClick={onOpenDetails}
          className="bg-primary h-12.5 rounded-[20px] text-base font-semibold text-white"
        >
          {dict.contracts.overdueDetails}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
