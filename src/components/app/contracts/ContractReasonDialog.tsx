"use client";

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
import { X } from "lucide-react";
import { useState } from "react";

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
  const title =
    variant === "refuse"
      ? dict.contracts.refuseDeliveryTitle
      : dict.contracts.cancellationTitle;
  const description =
    variant === "refuse"
      ? dict.contracts.refuseDeliveryDescription
      : dict.contracts.cancellationDescription;

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;
    if (!nextOpen) setReason("");
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-6 rounded-[20px] border-0 bg-white p-6 shadow-xl sm:max-w-lg"
      >
        <div className="grid gap-2 text-start">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </div>
        <Textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder={dict.contracts.reasonPlaceholder}
          disabled={isPending}
          className="min-h-32 rounded-[20px]"
        />
        <div dir="ltr" className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary" disabled={isPending}>
              {dict.common.cancel}
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={reason.trim().length < 3 || isPending}
            onClick={() => onConfirm(reason.trim())}
          >
            {isPending ? dict.contracts.submitting : dict.contracts.send}
          </Button>
        </div>
        <DialogClose
          disabled={isPending}
          className="text-gray absolute inset-e-6 top-6"
        >
          <X className="size-4" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
