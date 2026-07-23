"use client";

import {
  complaintAttachmentSrc,
  type ComplaintAttachment,
} from "@/components/app/conversations/normalizeComplaintAttachments";
import Image from "next/image";

export const ComplaintEvidenceGallery = ({
  attachments,
  label,
}: {
  attachments: ComplaintAttachment[];
  label: string;
}) => {
  if (!attachments.length) return null;

  return (
    <div className="grid gap-2">
      <p className="text-sm leading-[1.7] text-[#1a1a1a]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {attachments.map((attachment) => (
          <a
            key={attachment.path || attachment.filename}
            href={complaintAttachmentSrc(attachment)}
            target="_blank"
            rel="noreferrer"
            className="relative block h-24 w-24 overflow-hidden rounded-[16px] border border-[#f2f2f2] bg-[#fbfbfb]"
          >
            <Image
              src={complaintAttachmentSrc(attachment)}
              alt={attachment.originalFilename || attachment.filename}
              fill
              unoptimized
              sizes="96px"
              className="object-cover"
            />
          </a>
        ))}
      </div>
    </div>
  );
};
