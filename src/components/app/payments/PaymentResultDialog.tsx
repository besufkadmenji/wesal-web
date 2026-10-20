"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleX, Clock, LoaderCircle } from "lucide-react";
import Link from "next/link";

export type PaymentResultTone = "success" | "failure" | "pending" | "waiting";

const ICONS = {
  success: { Icon: CircleCheck, box: "bg-[#e9f7ef] text-[#1f9254]" },
  failure: { Icon: CircleX, box: "bg-[#fdecec] text-[#d92d20]" },
  pending: { Icon: LoaderCircle, box: "bg-[#eff1f6] text-primary" },
  waiting: { Icon: Clock, box: "bg-[#fdf3e7] text-[#b54708]" },
};

/**
 * BRD 4.1.17 payment result pop-up (D-20). Figma has no failure or waiting
 * state yet (D-23), so all four follow the pop-up 14 layout.
 */
export const PaymentResultDialog = ({
  tone,
  title,
  description,
  action,
}: {
  tone: PaymentResultTone;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) => {
  const { Icon, box } = ICONS[tone];
  const block = (event: Event) => event.preventDefault();
  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={block}
        onPointerDownOutside={block}
        onInteractOutside={block}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[520px]"
      >
        <div className="grid justify-items-center gap-4 text-center">
          <span
            className={cn(
              "grid size-15 place-content-center rounded-2xl",
              box,
            )}
          >
            <Icon
              aria-hidden
              className={cn("size-7.5", tone === "pending" && "animate-spin")}
            />
          </span>
          <DialogTitle className="text-xl leading-8 font-semibold text-[#1a1a1a]">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-gray text-base leading-[1.7]">
              {description}
            </DialogDescription>
          )}
        </div>
        {action && (
          <Button
            asChild
            className="bg-primary h-12.5 rounded-[20px] text-base font-semibold text-white"
          >
            <Link href={action.href}>{action.label}</Link>
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
