"use client";

import type {
  Conversation,
  ConversationStats,
  Message,
  NotificationStats,
  PaginatedConversationResponse,
  PaginatedMessageResponse,
  PaginatedNotificationResponse,
} from "@/gql/graphql";
import { MessageKind } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import { useMe } from "@/hooks/useMe";
import { ConversationService } from "@/services/conversation.service";
import { NotificationService } from "@/services/notification.service";
import { mergeUniqueById } from "@/utils/participant.policy";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const MAX_SEEN_EVENTS = 500;

const rememberEvent = (seen: Set<string>, id: string) => {
  if (seen.has(id)) return false;
  seen.add(id);
  if (seen.size > MAX_SEEN_EVENTS) {
    const oldest = seen.values().next().value;
    if (oldest) seen.delete(oldest);
  }
  return true;
};

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

export const RealtimeEventsWatcher = () => {
  const { me, isLoggedIn } = useMe();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const seenMessages = useRef(new Set<string>());
  const seenNotifications = useRef(new Set<string>());
  const principalId = me?.provider?.id || me?.user?.id;

  useEffect(() => {
    if (!isLoggedIn || !principalId) return;

    const messages = ConversationService.participantMessageAdded().subscribe({
      next: (payload) => {
        const message = payload.data?.participantMessageAdded;
        if (!message || !rememberEvent(seenMessages.current, message.id)) return;

        const isOpen = pathname.endsWith(
          `/conversations/${message.conversationId}`,
        );
        const isIncoming = message.senderId !== principalId;
        const shouldIncrement = isIncoming && !isOpen;

        queryClient.setQueryData<PaginatedMessageResponse>(
          queryKeys.messages(message.conversationId),
          (current) => appendMessage(current, message),
        );
        queryClient.setQueryData<Conversation>(
          queryKeys.conversation(message.conversationId),
          (current) =>
            current
              ? {
                  ...current,
                  lastMessage: message,
                  unreadCount: shouldIncrement
                    ? current.unreadCount + 1
                    : isOpen
                      ? 0
                      : current.unreadCount,
                }
              : current,
        );
        queryClient.setQueriesData<PaginatedConversationResponse>(
          { queryKey: queryKeys.conversations },
          (current) => {
            if (!current) return current;
            const affected = current.items.find(
              (item) => item.id === message.conversationId,
            );
            if (!affected) return current;
            const updated = {
              ...affected,
              lastMessage: message,
              unreadCount: shouldIncrement
                ? affected.unreadCount + 1
                : isOpen
                  ? 0
                  : affected.unreadCount,
            };
            return {
              ...current,
              items: [
                updated,
                ...current.items.filter((item) => item.id !== affected.id),
              ],
            };
          },
        );
        if (shouldIncrement) {
          queryClient.setQueryData<ConversationStats>(
            queryKeys.conversationStats,
            (current) =>
              current
                ? { ...current, unreadCount: current.unreadCount + 1 }
                : current,
          );
        }
        if (isOpen && isIncoming) {
          void ConversationService.markRead(message.conversationId).finally(
            () => {
              void queryClient.invalidateQueries({
                queryKey: queryKeys.conversationStats,
              });
              void queryClient.invalidateQueries({
                queryKey: queryKeys.conversations,
              });
            },
          );
        } else {
          void queryClient.invalidateQueries({
            queryKey: queryKeys.conversationStats,
          });
          void queryClient.invalidateQueries({
            queryKey: queryKeys.conversations,
          });
        }
        void queryClient.invalidateQueries({
          queryKey: queryKeys.conversation(message.conversationId),
        });
        if (message.kind !== MessageKind.Text) {
          void queryClient.invalidateQueries({ queryKey: queryKeys.contracts });
        }
      },
    });

    const notifications = NotificationService.notificationAdded().subscribe({
      next: (payload) => {
        const notification = payload.data?.notificationAdded;
        if (
          !notification ||
          !rememberEvent(seenNotifications.current, notification.id)
        ) {
          return;
        }
        queryClient.setQueriesData<PaginatedNotificationResponse>(
          { queryKey: queryKeys.notifications },
          (current) => {
            if (!current) return current;
            const items = [
              notification,
              ...current.items.filter((item) => item.id !== notification.id),
            ].slice(0, current.meta.limit);
            return {
              ...current,
              items,
              meta: { ...current.meta, total: current.meta.total + 1 },
            };
          },
        );
        queryClient.setQueryData<NotificationStats>(
          queryKeys.notificationStats,
          (current) =>
            current
              ? {
                  ...current,
                  totalNotifications: current.totalNotifications + 1,
                  unreadCount:
                    current.unreadCount + (notification.isRead ? 0 : 1),
                  readCount: current.readCount + (notification.isRead ? 1 : 0),
                }
              : current,
        );
        void queryClient.invalidateQueries({
          queryKey: queryKeys.notifications,
        });
        void queryClient.invalidateQueries({
          queryKey: queryKeys.notificationStats,
        });
      },
    });

    return () => {
      messages.unsubscribe();
      notifications.unsubscribe();
    };
  }, [isLoggedIn, pathname, principalId, queryClient]);

  return null;
};
