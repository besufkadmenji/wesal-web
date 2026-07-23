"use client";

import LogoutIcon from "@/assets/icons/logout.outline.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useDict } from "@/hooks/useDict";

export const ContractRejectionDialog = ({
  open,
  reason,
  isPending,
  isLocked,
  onOpenChange,
  onReasonChange,
  onSubmit,
}: {
  open: boolean;
  reason: string;
  isPending: boolean;
  isLocked: boolean;
  onOpenChange: (open: boolean) => void;
  onReasonChange: (reason: string) => void;
  onSubmit: () => void;
}) => {
  const dict = useDict();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-7 rounded-[20px] border-0 p-6 sm:max-w-[657px] sm:p-10">
        <DialogHeader className="flex-row items-start gap-6 text-start">
          <span className="grid size-[60px] shrink-0 place-content-center rounded-2xl bg-[#eff1f6]">
            <LogoutIcon
              className="text-primary size-[30px]"
              aria-hidden="true"
            />
          </span>
          <div className="grid flex-1 gap-2 pt-1">
            <DialogTitle className="text-xl leading-[1.6]">
              {dict.contracts.rejectionTitle}
            </DialogTitle>
            <DialogDescription className="text-gray text-base leading-[1.7]">
              {dict.contracts.rejectionDescription}
            </DialogDescription>
          </div>
        </DialogHeader>

        <Textarea
          value={reason}
          onChange={(event) => onReasonChange(event.target.value)}
          placeholder={dict.contracts.rejectionReason}
          aria-label={dict.contracts.rejectionReason}
          disabled={isLocked}
          className="min-h-[120px] resize-none rounded-[20px] border-[#f2f2f2] p-4 text-sm"
        />

        <DialogFooter className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="ghost"
            className="h-[50px] rounded-[20px] bg-[#f2f2f2] text-base font-semibold text-[#4d4d4d] hover:bg-[#e8e8e8]"
            disabled={isLocked}
            onClick={() => onOpenChange(false)}
          >
            {dict.common.cancel}
          </Button>
          <Button
            type="button"
            className="h-[50px] rounded-[20px] text-base font-semibold text-[#eff9f0]"
            disabled={!reason.trim() || isLocked}
            onClick={onSubmit}
          >
            {isPending ? dict.contracts.rejecting : dict.contracts.send}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
