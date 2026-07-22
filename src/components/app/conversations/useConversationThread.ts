"use client";

import { ContractStatus, ConversationStatus } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import {
  useConversation,
  useConversationMessages,
} from "@/hooks/useConversations";
import { useContracts } from "@/hooks/useContracts";
import { useMe } from "@/hooks/useMe";
import { ConversationService } from "@/services/conversation.service";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useConversationThread = (conversationId: string) => {
  const { me } = useMe();
  const queryClient = useQueryClient();
  const conversation = useConversation(conversationId);
  const messages = useConversationMessages(conversationId);
  const contracts = useContracts({ conversationId, limit: 20 });

  useEffect(() => {
    if (!conversation.data) return;
    ConversationService.markRead(conversationId)
      .then(() =>
        queryClient.invalidateQueries({ queryKey: queryKeys.conversations }),
      )
      .catch(() => undefined);
  }, [conversation.data, conversationId, queryClient]);

  const item = conversation.data;
  const counterparty = item
    ? me?.provider
      ? item.user
      : item.provider
    : null;
  const latestContract = [...(contracts.data?.items || [])].sort(
    (a, b) => b.version - a.version,
  )[0];
  const canSend = Boolean(item?.access?.canSend);
  const isExpired =
    item?.status === ConversationStatus.Closed &&
    item.closeReason === "EXPIRED";
  const contractHref =
    latestContract?.status === ContractStatus.Rejected
      ? `/contracts/${latestContract.id}/resend`
      : `/contracts/new?conversationId=${conversationId}`;
  const isRecreateContract =
    latestContract?.status === ContractStatus.Rejected;
  const canShowContractAction =
    !contracts.isFetching &&
    (!latestContract ||
      latestContract.status === ContractStatus.Draft ||
      latestContract.status === ContractStatus.Rejected);

  return {
    me,
    conversation,
    messages,
    item,
    counterparty,
    latestContract,
    canSend,
    isExpired,
    contractHref,
    isRecreateContract,
    canShowContractAction,
    isLoading: conversation.isLoading,
  };
};
