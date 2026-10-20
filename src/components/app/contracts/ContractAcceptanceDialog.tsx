"use client";

import ContractCompletionIcon from "@/assets/icons/contracts/popup/contract.completion.svg";
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

export const ContractAcceptanceDialog = ({
  open,
  onOpenChange,
  maxExecutionHours,
  isPending,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maxExecutionHours?: number | null;
  isPending: boolean;
  onConfirm: (executionHours: number) => void;
}) => {
  const dict = useDict();
  const [executionHoursInput, setExecutionHoursInput] = useState("1");
  const executionHours = Number(executionHoursInput);
  const hasValidExecutionHours =
    Number.isInteger(executionHours) &&
    executionHours > 0 &&
    (maxExecutionHours == null || executionHours <= maxExecutionHours);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isPending) {
      if (!nextOpen) setExecutionHoursInput("1");
      onOpenChange(nextOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[42vw]"
      >
        <div className="flex items-start gap-6">
          <span className="text-primary grid size-14 shrink-0 place-content-center rounded-2xl bg-[#eff1f6]">
            <ContractCompletionIcon className="size-7" />
          </span>
          <div className="grid min-w-0 flex-1 gap-2 text-start">
            <DialogTitle className="text-xl leading-8 font-semibold text-black">
              {dict.contracts.acceptanceTitle}
            </DialogTitle>
            <DialogDescription className="text-gray text-base leading-[1.7]">
              {dict.contracts.acceptanceDescription}
            </DialogDescription>
          </div>
        </div>

        <div className="grid gap-2">
          <label
            htmlFor="accept-execution-hours"
            className="text-base leading-8 font-medium text-black"
          >
            {dict.contracts.executionHours}{" "}
            <span className="text-[#b3251e]">*</span>
          </label>
          <Input
            id="accept-execution-hours"
            type="number"
            min={1}
            max={maxExecutionHours ?? undefined}
            step={1}
            required
            value={executionHoursInput}
            onChange={(event) => setExecutionHoursInput(event.target.value)}
            disabled={isPending}
            className="h-[50px] rounded-[20px] border-[#f2f2f2] px-4"
          />
          {maxExecutionHours != null && (
            <p className="text-gray text-xs leading-[1.7]">
              {dict.contracts.maxExecutionHours.replace(
                "{hours}",
                String(maxExecutionHours),
              )}
            </p>
          )}
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
            disabled={!hasValidExecutionHours || isPending}
            onClick={() => onConfirm(executionHours)}
            className="bg-primary h-12.5 rounded-[20px] text-base font-semibold text-white"
          >
            {isPending
              ? dict.contracts.accepting
              : dict.contracts.confirmAcceptance}
          </Button>
        </div>

        <DialogClose
          disabled={isPending}
          className="text-gray border-border absolute inset-e-6 top-6 grid size-8 place-content-center rounded-full border bg-white transition hover:bg-[#f8f9fb] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="size-4" />
          <span className="sr-only">{dict.common.cancel}</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
