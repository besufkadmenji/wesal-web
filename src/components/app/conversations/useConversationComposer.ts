"use client";

import {
  CHAT_PHOTO_MAX_BYTES,
  CHAT_PHOTO_TYPES,
} from "@/components/app/conversations/messageAttachment";
import { useDict } from "@/hooks/useDict";
import { useSendMessage } from "@/hooks/useConversations";
import { uploadFile } from "@/utils/file.upload";
import { showErrorMessage } from "@/utils/show.messages";
import { useEffect, useState } from "react";

export const useConversationComposer = (
  conversationId: string,
  canSend: boolean,
) => {
  const dict = useDict();
  const sendMessage = useSendMessage(conversationId);
  const [content, setContent] = useState("");
  // ClickUp 869fnwhm3: one photo per message, previewed before sending.
  const [picked, setPicked] = useState<{ file: File; preview: string } | null>(
    null,
  );
  const [uploading, setUploading] = useState(false);
  const photo = picked?.file ?? null;

  const replacePhoto = (next: { file: File; preview: string } | null) =>
    setPicked(next);
  // Free each preview once it is replaced, removed or the chat closes.
  useEffect(
    () => () => {
      if (picked) URL.revokeObjectURL(picked.preview);
    },
    [picked],
  );

  const pickPhoto = (file: File | null | undefined) => {
    if (!file) return;
    if (!CHAT_PHOTO_TYPES.includes(file.type)) {
      showErrorMessage(dict.conversations.photoType);
      return;
    }
    if (file.size > CHAT_PHOTO_MAX_BYTES) {
      showErrorMessage(dict.conversations.photoTooLarge);
      return;
    }
    replacePhoto({ file, preview: URL.createObjectURL(file) });
  };

  const submitMessage = async () => {
    const value = content.trim();
    if ((!value && !photo) || !canSend || uploading) return;
    let attachment;
    if (photo) {
      setUploading(true);
      try {
        const uploaded = await uploadFile(photo);
        attachment = {
          filename: uploaded.filename,
          originalFilename: photo.name,
          size: uploaded.size || photo.size,
        };
      } catch (error) {
        showErrorMessage(
          error instanceof Error ? error.message : dict.conversations.photoType,
        );
        return;
      } finally {
        setUploading(false);
      }
    }
    sendMessage.mutate(
      { content: value, attachment },
      {
        onSuccess: () => {
          setContent("");
          replacePhoto(null);
        },
        onError: (error) => showErrorMessage(error.message),
      },
    );
  };

  return {
    content,
    setContent,
    photoPreview: picked?.preview ?? null,
    pickPhoto,
    removePhoto: () => replacePhoto(null),
    submitMessage,
    canSubmit:
      Boolean(content.trim() || photo) && !sendMessage.isPending && !uploading,
  };
};
