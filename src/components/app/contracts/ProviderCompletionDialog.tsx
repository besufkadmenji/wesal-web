"use client";

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
import { useState } from "react";

export const ProviderCompletionDialog = ({
  open,
  onOpenChange,
  requiresDelivery,
  isPending,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requiresDelivery: boolean;
  isPending: boolean;
  onConfirm: (deliveryEstimateDays?: number) => void;
}) => {
  const dict = useDict();
  const [days, setDays] = useState("1");
  const parsedDays = Number(days);
  const isValid =
    !requiresDelivery || (Number.isInteger(parsedDays) && parsedDays > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-6 rounded-[20px] border-0 bg-white p-6 shadow-xl sm:max-w-lg"
      >
        <div className="grid gap-2 text-start">
          <DialogTitle>{dict.contracts.providerCompletionTitle}</DialogTitle>
          <DialogDescription>
            {dict.contracts.providerCompletionDescription}
          </DialogDescription>
        </div>
        {requiresDelivery && (
          <div className="grid gap-2 text-start">
            <label htmlFor="delivery-estimate">
              {dict.contracts.deliveryEstimate}
            </label>
            <Input
              id="delivery-estimate"
              type="number"
              min={1}
              step={1}
              value={days}
              onChange={(event) => setDays(event.target.value)}
              disabled={isPending}
            />
          </div>
        )}
        <div dir="ltr" className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary" disabled={isPending}>
              {dict.common.cancel}
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={!isValid || isPending}
            onClick={() =>
              onConfirm(requiresDelivery ? parsedDays : undefined)
            }
          >
            {isPending
              ? dict.contracts.completionSubmitting
              : dict.contracts.submitCompletionSignature}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
