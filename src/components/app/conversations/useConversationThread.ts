"use client";

import { useRemainingTime } from "@/components/app/shared/ParticipantUI";
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
  const counterparty = item ? (me?.provider ? item.user : item.provider) : null;
  const latestContract = [...(contracts.data?.items || [])].sort(
    (a, b) => b.version - a.version,
  )[0];
  const countdownDate = item?.access?.expiresAt || item?.expiresAt;
  const remainingTime = useRemainingTime(countdownDate);
  const hasElapsed =
    item?.status === ConversationStatus.Active &&
    Boolean(countdownDate && remainingTime?.expired);
  const isExpired =
    (item?.status === ConversationStatus.Closed &&
      item.closeReason === "EXPIRED") ||
    hasElapsed;
  const canSend = Boolean(item?.access?.canSend && !hasElapsed);
  const isFeeBlocked = Boolean(
    item?.access?.feeRequired && !item.access.paidAt,
  );
  const canPayFee =
    item?.status === ConversationStatus.Active && isFeeBlocked && !hasElapsed;
  const showCountdown = Boolean(
    item?.status === ConversationStatus.Active && countdownDate && !hasElapsed,
  );
  const isProviderContractReview = Boolean(
    me?.provider && latestContract?.status === ContractStatus.Pending,
  );
  const isCustomerContractAction = Boolean(
    me?.user &&
    item?.status === ConversationStatus.Active &&
    !isExpired &&
    (!latestContract ||
      latestContract.status === ContractStatus.Draft ||
      latestContract.status === ContractStatus.Rejected),
  );
  const contractHref = isProviderContractReview
    ? `/contracts/${latestContract!.id}`
    : latestContract?.status === ContractStatus.Rejected
      ? `/contracts/${latestContract.id}/resend`
      : `/contracts/new?conversationId=${conversationId}`;
  const isRecreateContract =
    Boolean(me?.user) && latestContract?.status === ContractStatus.Rejected;
  const canShowContractAction =
    !contracts.isFetching &&
    (isProviderContractReview || isCustomerContractAction);

  return {
    me,
    conversation,
    messages,
    item,
    counterparty,
    latestContract,
    canSend,
    isExpired,
    isFeeBlocked,
    canPayFee,
    countdownDate,
    remainingTime,
    showCountdown,
    contractHref,
    isRecreateContract,
    isProviderContractReview,
    canShowContractAction,
    isLoading: conversation.isLoading,
  };
};
