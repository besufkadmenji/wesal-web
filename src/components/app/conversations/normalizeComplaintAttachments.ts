import { dataUrl } from "@/config/url";

export type ComplaintAttachment = {
  filename: string;
  path?: string;
  url?: string;
  originalFilename?: string;
};

export const normalizeComplaintAttachments = (
  value: unknown,
): ComplaintAttachment[] => {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (attachment): attachment is ComplaintAttachment =>
      Boolean(
        attachment &&
          typeof attachment === "object" &&
          ("filename" in attachment || "path" in attachment) &&
          (typeof (attachment as ComplaintAttachment).filename === "string" ||
            typeof (attachment as ComplaintAttachment).path === "string"),
      ),
  );
};

const filesUrlFromKey = (key: string) => `${dataUrl}/files/${key}`;

/** Resolve the S3 object key from attachment JSON returned by the API. */
export const complaintAttachmentKey = (
  attachment: ComplaintAttachment,
): string => {
  if (attachment.path) return attachment.path;
  if (attachment.url?.startsWith("/files/")) {
    return decodeURIComponent(attachment.url.slice("/files/".length));
  }
  return attachment.filename;
};

export const complaintAttachmentSrc = (attachment: ComplaintAttachment) =>
  filesUrlFromKey(complaintAttachmentKey(attachment));
