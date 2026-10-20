"use client";

import CloseIcon from "@/assets/icons/notifications/close.svg";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

/**
 * Figma side drawer (notifications 6242:7205, chats 6543:21353): full height,
 * 593px (full width on phones), on the header icons' side — the inline end,
 * so it slides in from the right in English and from the left in Arabic.
 */
export const SideDrawer = ({
  open,
  onOpenChange,
  title,
  closeLabel,
  trigger,
  footer,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  closeLabel: string;
  trigger: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogPortal>
      <DialogOverlay className="bg-black/30" />
      <DialogPrimitive.Content
        aria-describedby={undefined}
        className={cn(
          "fixed inset-y-0 end-0 z-50 flex h-dvh w-[min(593px,100vw)] flex-col bg-[#FCFDFE] shadow-xl outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out duration-300 motion-reduce:animate-none",
          "ltr:data-[state=open]:slide-in-from-right ltr:data-[state=closed]:slide-out-to-right",
          "rtl:data-[state=open]:slide-in-from-left rtl:data-[state=closed]:slide-out-to-left",
        )}
      >
        <div className="flex items-center gap-2.5 border-b border-[#F2F2F2] bg-white p-6">
          <DialogTitle className="flex-1 text-base leading-8 font-medium text-[#1A1A1A]">
            {title}
          </DialogTitle>
          <DialogClose
            aria-label={closeLabel}
            className="grid size-8 shrink-0 place-content-center rounded-2xl border border-[#F2F2F2] bg-white"
          >
            <CloseIcon className="size-4" />
          </DialogClose>
        </div>
        <div className="grid min-h-0 flex-1 auto-rows-max overflow-y-auto">
          {children}
        </div>
        {footer}
      </DialogPrimitive.Content>
    </DialogPortal>
  </Dialog>
);
