"use client";

import { useSendMessage } from "@/hooks/useConversations";
import { showErrorMessage } from "@/utils/show.messages";
import { useState } from "react";

export const useConversationComposer = (
  conversationId: string,
  canSend: boolean,
) => {
  const sendMessage = useSendMessage(conversationId);
  const [content, setContent] = useState("");

  const submitMessage = () => {
    const value = content.trim();
    if (!value || !canSend) return;
    sendMessage.mutate(value, {
      onSuccess: () => setContent(""),
      onError: (error) => showErrorMessage(error.message),
    });
  };

  return {
    content,
    setContent,
    submitMessage,
    canSubmit: Boolean(content.trim()) && !sendMessage.isPending,
  };
};
