"use client";

import { useMe } from "@/hooks/useMe";
import { queryKeys } from "@/hooks/queryKeys";
import type {
  ConversationPaginationInput,
  Message,
  PaginatedMessageResponse,
} from "@/gql/graphql";
import { ConversationSenderType, MessageKind, SortOrder } from "@/gql/graphql";
import { ConversationService } from "@/services/conversation.service";
import { mergeUniqueById } from "@/utils/participant.policy";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useRealtimeRefresh = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const refresh = () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
      queryClient.invalidateQueries({ queryKey: queryKeys.contracts });
      queryClient.invalidateQueries({ queryKey: queryKeys.complaints });
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
      queryClient.invalidateQueries({ queryKey: queryKeys.notificationStats });
    };
    window.addEventListener("wesal:graphql-reconnected", refresh);
    return () => window.removeEventListener("wesal:graphql-reconnected", refresh);
  }, [queryClient]);
};

export const useConversations = (input: ConversationPaginationInput = {}) =>
  useQuery({
    queryKey: [...queryKeys.conversations, input],
    queryFn: () => ConversationService.findAll({ page: 1, limit: 50, ...input }),
  });

export const useConversation = (id?: string) =>
  useQuery({
    queryKey: queryKeys.conversation(id || ""),
    queryFn: () => ConversationService.findOne(id!),
    enabled: Boolean(id),
  });

const appendMessage = (
  current: PaginatedMessageResponse | undefined,
  message: Message,
) => {
  if (!current) return current;
  const items = mergeUniqueById(current.items, message);
  if (items === current.items) return current;
  return {
    ...current,
    items,
    meta: { ...current.meta, total: current.meta.total + 1 },
  };
};

export const useConversationMessages = (conversationId?: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.messages(conversationId || ""),
    queryFn: () =>
      ConversationService.messages({
        conversationId: conversationId!,
        page: 1,
        limit: 100,
        sortOrder: SortOrder.Asc,
      }),
    enabled: Boolean(conversationId),
  });

  useEffect(() => {
    if (!conversationId) return;
    const subscription = ConversationService.messageAdded(conversationId).subscribe({
      next: (payload) => {
        const message = payload.data?.messageAdded;
        if (!message) return;
        queryClient.setQueryData<PaginatedMessageResponse>(
          queryKeys.messages(conversationId),
          (current) => appendMessage(current, message),
        );
        queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
        queryClient.invalidateQueries({
          queryKey: queryKeys.conversation(conversationId),
        });
        if (message.kind !== MessageKind.Text) {
          queryClient.invalidateQueries({ queryKey: queryKeys.contracts });
        }
      },
    });
    return () => subscription.unsubscribe();
  }, [conversationId, queryClient]);

  return query;
};

export const useSendMessage = (conversationId: string) => {
  const queryClient = useQueryClient();
  const { me } = useMe();
  return useMutation({
    mutationFn: (content: string) =>
      ConversationService.sendMessage(conversationId, content),
    onMutate: async (content) => {
      const key = queryKeys.messages(conversationId);
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<PaginatedMessageResponse>(key);
      const optimisticId = `optimistic-${crypto.randomUUID()}`;
      const timestamp = new Date().toISOString();
      const optimistic = {
        id: optimisticId,
        conversationId,
        senderId: me?.provider?.id || me?.user?.id,
        senderType: me?.provider
          ? ConversationSenderType.Provider
          : ConversationSenderType.User,
        kind: MessageKind.Text,
        content,
        metadata: null,
        createdAt: timestamp,
        updatedAt: timestamp,
      } as Message;
      queryClient.setQueryData<PaginatedMessageResponse>(key, (current) =>
        current ? appendMessage(current, optimistic) : current,
      );
      return { previous, optimisticId };
    },
    onError: (_error, _content, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          queryKeys.messages(conversationId),
          context.previous,
        );
      }
    },
    onSuccess: (message, _content, context) => {
      queryClient.setQueryData<PaginatedMessageResponse>(
        queryKeys.messages(conversationId),
        (current) => {
          if (!current) return current;
          const withoutOptimistic = context?.optimisticId
            ? {
                ...current,
                items: current.items.filter(
                  (item) => item.id !== context.optimisticId,
                ),
                meta: {
                  ...current.meta,
                  total: Math.max(0, current.meta.total - 1),
                },
              }
            : current;
          return appendMessage(withoutOptimistic, message);
        },
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
    },
  });
};
