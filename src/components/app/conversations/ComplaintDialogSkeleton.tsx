"use client";

import MessageComplaintIcon from "@/assets/icons/message.complaint.svg";
import { SkeletonBlock } from "@/components/app/shared/ParticipantUI";

export const ComplaintDialogSkeleton = () => (
  <div className="flex items-start gap-6">
    <span className="text-primary grid size-15 shrink-0 place-content-center rounded-2xl bg-[#eff1f6]">
      <MessageComplaintIcon className="size-6" />
    </span>
    <div className="grid min-w-0 flex-1 gap-5">
      <div className="grid gap-2">
        <SkeletonBlock className="h-7 w-40 rounded-lg" />
        <SkeletonBlock className="h-5 w-full max-w-md rounded-lg" />
      </div>
      <SkeletonBlock className="h-14 rounded-[20px]" />
      <SkeletonBlock className="min-h-30 rounded-[20px]" />
      <SkeletonBlock className="h-30 rounded-[20px]" />
      <SkeletonBlock className="h-24 rounded-[20px]" />
      <div className="grid grid-cols-2 gap-4">
        <SkeletonBlock className="h-12.5 rounded-[20px]" />
        <SkeletonBlock className="h-12.5 rounded-[20px]" />
      </div>
    </div>
  </div>
);
