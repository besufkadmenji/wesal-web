"use client";

import MessageComplaintIcon from "@/assets/icons/message.complaint.svg";
import { ComplaintEvidenceGallery } from "@/components/app/conversations/ComplaintEvidenceGallery";
import { normalizeComplaintAttachments } from "@/components/app/conversations/normalizeComplaintAttachments";
import {
  StatusBadge,
  useLocalizedFormat,
} from "@/components/app/shared/ParticipantUI";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComplaintMessageAuthorType, type Complaint } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export const ComplaintExistingView = ({
  complaint,
}: {
  complaint: Complaint;
}) => {
  const dict = useDict();
  const format = useLocalizedFormat();
  const attachments = normalizeComplaintAttachments(complaint.attachments);
  const adminMessages = complaint.messages.filter(
    (message) => message.authorType === ComplaintMessageAuthorType.Admin,
  );

  return (
    <>
      <div className="flex items-start gap-6">
        <span className="text-primary grid size-15 shrink-0 place-content-center rounded-2xl bg-[#eff1f6]">
          <MessageComplaintIcon className="size-6" />
        </span>
        <div className="grid min-w-0 flex-1 gap-5">
          <div className="grid gap-2 text-start">
            <div className="flex flex-wrap items-center gap-3">
              <DialogTitle className="text-xl leading-[1.6] font-semibold text-black">
                {complaint.title}
              </DialogTitle>
              <StatusBadge status={complaint.status} />
            </div>
            <DialogDescription className="text-gray text-base leading-[1.7]">
              {dict.complaints.duplicate}
            </DialogDescription>
          </div>

          <p className="text-start text-sm leading-[1.7] whitespace-pre-wrap text-[#1a1a1a]">
            {complaint.description}
          </p>

          <time className="text-gray block text-start text-xs leading-[1.7]">
            {format.date(complaint.createdAt)}
          </time>

          <ComplaintEvidenceGallery
            attachments={attachments}
            label={dict.complaints.evidence}
          />

          <div className="grid gap-3">
            <p className="text-start text-sm font-medium text-[#1a1a1a]">
              {dict.complaints.adminResponse}
            </p>
            {adminMessages.length ? (
              <div className="grid gap-3">
                {adminMessages.map((message) => (
                  <div
                    key={message.id}
                    className="rounded-[14px] bg-[#eff1f6] px-4 py-3 text-start"
                  >
                    <p className="text-sm leading-[1.7] whitespace-pre-wrap text-[#1a1a1a]">
                      {message.content}
                    </p>
                    <time className="text-gray mt-1 block text-[10px] leading-[1.7]">
                      {format.date(message.createdAt)}
                    </time>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray rounded-[14px] bg-[#f6f7fa] px-4 py-3 text-start text-sm leading-[1.7]">
                {dict.complaints.awaitingResponse}
              </p>
            )}
          </div>

          <DialogClose asChild>
            <Button
              type="button"
              className={cn(
                "bg-border h-12.5 rounded-[20px] text-base font-semibold text-[#4d4d4d] shadow-none hover:bg-[#e9e9e9]",
              )}
            >
              {dict.common.cancel}
            </Button>
          </DialogClose>
        </div>
      </div>

      <DialogClose className="text-gray border-border absolute inset-e-6 top-6 grid size-8 place-content-center rounded-2xl border bg-white transition hover:bg-[#f8f9fb]">
        <X className="size-4" />
        <span className="sr-only">{dict.common.cancel}</span>
      </DialogClose>
    </>
  );
};
