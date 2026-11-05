import type { MessageAttachmentInput } from "@/gql/graphql";

/** Photos people can send in a chat (ClickUp 869fnwhm3). */
export const CHAT_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const CHAT_PHOTO_MAX_BYTES = 10 * 1024 * 1024;

/** The photo a text message carries in its metadata, if any. */
export const messageAttachment = (
  metadata: unknown,
): MessageAttachmentInput | null => {
  const value = (metadata as { attachment?: unknown } | null)?.attachment as
    | Partial<MessageAttachmentInput>
    | undefined;
  return value && typeof value.filename === "string"
    ? {
        filename: value.filename,
        originalFilename: value.originalFilename ?? value.filename,
        size: value.size ?? 0,
      }
    : null;
};

export const chatPhotoUrl = (filename: string) =>
  `${process.env.NEXT_PUBLIC_DATA}/files/${filename}`;
