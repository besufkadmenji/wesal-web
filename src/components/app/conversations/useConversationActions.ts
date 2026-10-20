"use client";

import { queryKeys } from "@/hooks/queryKeys";
import { CheckoutPurpose, PaymentMethod } from "@/gql/graphql";
import { ConversationService } from "@/services/conversation.service";
import { PaymentService } from "@/services/payment.service";
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

  // S4-10: the chat fee is paid by card through the gateway checkout.
  const payFee = useMutation({
    mutationFn: () =>
      PaymentService.startCheckout({
        purpose: CheckoutPurpose.ChatFee,
        targetId: conversationId,
        method: PaymentMethod.Electronic,
      }),
    onSuccess: ({ redirectUrl }) => PaymentService.redirect(redirectUrl),
    onError: (error) => showErrorMessage(error.message),
  });

  const restart = useMutation({
    mutationFn: () => ConversationService.restart(conversationId),
    onSuccess: invalidateConversation,
    onError: (error) => showErrorMessage(error.message),
  });

  return { payFee, restart };
};
