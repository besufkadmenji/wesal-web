"use client";

import { useLocalizedFormat } from "@/components/app/shared/ParticipantUI";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDict } from "@/hooks/useDict";
import { useSetting } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

/**
 * S4-62: re-publish an expired ad as a free ad, or as a featured one
 * (paid; it runs as free until the fee is paid).
 */
export const RepublishListingDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (featured: boolean) => void;
  isPending: boolean;
}) => {
  const dict = useDict();
  const copy = dict.myListings.expiry;
  const format = useLocalizedFormat();
  const { setting } = useSetting();
  const [featured, setFeatured] = useState(false);
  const canFeature = Boolean(setting?.premiumAdEnabled);
  const freeDays = String(setting?.freeAdValidityDays ?? 30);
  const options = [
    {
      featured: false,
      title: copy.republishFree,
      description: copy.republishFreeDescription.replace("{days}", freeDays),
      disabled: false,
    },
    {
      featured: true,
      title: copy.republishFeatured,
      description: canFeature
        ? copy.republishFeaturedDescription
            .replace("{fee}", format.money(Number(setting?.premiumAdFee ?? 0)))
            .replace("{days}", String(setting?.premiumAdDurationDays ?? 0))
        : dict.promotion.disabled,
      disabled: !canFeature,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[560px]"
      >
        <div className="grid gap-2 pe-10 text-start">
          <DialogTitle className="text-xl leading-8 font-semibold text-[#1a1a1a]">
            {copy.republishTitle}
          </DialogTitle>
          <DialogDescription className="text-gray text-base leading-[1.7]">
            {copy.republishDescription}
          </DialogDescription>
        </div>
        <div role="radiogroup" className="grid gap-3">
          {options.map((option) => (
            <button
              key={option.title}
              type="button"
              role="radio"
              aria-checked={featured === option.featured}
              disabled={option.disabled}
              onClick={() => setFeatured(option.featured)}
              className={cn(
                "border-border grid gap-1 rounded-2xl border p-4 text-start transition",
                featured === option.featured && "border-primary bg-primary/5",
                option.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <span className="font-semibold text-[#1a1a1a]">
                {option.title}
              </span>
              <span className="text-gray text-sm">{option.description}</span>
            </button>
          ))}
        </div>
        <Button
          type="button"
          className="h-12.5 rounded-[20px] text-base font-semibold"
          disabled={isPending}
          onClick={() => onConfirm(featured && canFeature)}
        >
          {featured ? copy.republishAndPay : copy.republish}
        </Button>
        <DialogClose className="text-gray border-border absolute inset-e-6 top-6 grid size-8 place-content-center rounded-2xl border bg-white transition hover:bg-[#f8f9fb]">
          <X className="size-4" />
          <span className="sr-only">{dict.common.cancel}</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
