"use client";

import { queryKeys } from "@/hooks/queryKeys";
import { ConversationService } from "@/services/conversation.service";
import { showErrorMessage } from "@/utils/show.messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useConversationActions = (conversationId: string) => {
  const queryClient = useQueryClient();

  const invalidateConversation = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.conversation(conversationId),
    });
    queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
  };

  const payFee = useMutation({
    mutationFn: () => ConversationService.payFee(conversationId),
    onSuccess: invalidateConversation,
    onError: (error) => showErrorMessage(error.message),
  });

  const restart = useMutation({
    mutationFn: () => ConversationService.restart(conversationId),
    onSuccess: invalidateConversation,
    onError: (error) => showErrorMessage(error.message),
  });

  return { payFee, restart };
};
