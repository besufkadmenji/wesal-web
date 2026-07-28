"use client";

import type {
  NotificationPaginationInput,
  NotificationStats,
  PaginatedNotificationResponse,
} from "@/gql/graphql";
import { SortOrder } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import { useMe } from "@/hooks/useMe";
import { NotificationService } from "@/services/notification.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const usePrincipalId = () => {
  const { me } = useMe();
  return me?.provider?.id || me?.user?.id;
};

export const useNotifications = (
  input: NotificationPaginationInput = { page: 1, limit: 10 },
) => {
  const principalId = usePrincipalId();
  return useQuery({
    queryKey: [...queryKeys.notifications, input],
    queryFn: () =>
      NotificationService.findAll({
        page: 1,
        limit: 10,
        sortOrder: SortOrder.Desc,
        ...input,
      }),
    enabled: Boolean(principalId),
  });
};

export const useNotificationStats = () => {
  const principalId = usePrincipalId();
  return useQuery({
    queryKey: queryKeys.notificationStats,
    queryFn: () => NotificationService.getStats(principalId!),
    enabled: Boolean(principalId),
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => NotificationService.markAsRead(id),
    onMutate: async (id) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: queryKeys.notifications }),
        queryClient.cancelQueries({ queryKey: queryKeys.notificationStats }),
      ]);
      const previousLists =
        queryClient.getQueriesData<PaginatedNotificationResponse>({
          queryKey: queryKeys.notifications,
        });
      const previousStats = queryClient.getQueryData<NotificationStats>(
        queryKeys.notificationStats,
      );
      const wasUnread = previousLists.some(([, value]) =>
        value?.items.some((item) => item.id === id && !item.isRead),
      );
      queryClient.setQueriesData<PaginatedNotificationResponse>(
        { queryKey: queryKeys.notifications },
        (current) =>
          current
            ? {
                ...current,
                items: current.items.map((item) =>
                  item.id === id ? { ...item, isRead: true } : item,
                ),
              }
            : current,
      );
      if (wasUnread) {
        queryClient.setQueryData<NotificationStats>(
          queryKeys.notificationStats,
          (current) =>
            current
              ? {
                  ...current,
                  unreadCount: Math.max(0, current.unreadCount - 1),
                  readCount: current.readCount + 1,
                }
              : current,
        );
      }
      return { previousLists, previousStats };
    },
    onError: (_error, _id, context) => {
      context?.previousLists.forEach(([key, value]) =>
        queryClient.setQueryData(key, value),
      );
      queryClient.setQueryData(
        queryKeys.notificationStats,
        context?.previousStats,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
      queryClient.invalidateQueries({ queryKey: queryKeys.notificationStats });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const principalId = usePrincipalId();
  return useMutation({
    mutationFn: () => NotificationService.markAllAsRead(principalId!),
    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: queryKeys.notifications }),
        queryClient.cancelQueries({ queryKey: queryKeys.notificationStats }),
      ]);
      const previousLists =
        queryClient.getQueriesData<PaginatedNotificationResponse>({
          queryKey: queryKeys.notifications,
        });
      const previousStats = queryClient.getQueryData<NotificationStats>(
        queryKeys.notificationStats,
      );
      queryClient.setQueriesData<PaginatedNotificationResponse>(
        { queryKey: queryKeys.notifications },
        (current) =>
          current
            ? {
                ...current,
                items: current.items.map((item) => ({
                  ...item,
                  isRead: true,
                })),
              }
            : current,
      );
      queryClient.setQueryData<NotificationStats>(
        queryKeys.notificationStats,
        (current) =>
          current
            ? {
                ...current,
                unreadCount: 0,
                readCount: current.totalNotifications,
              }
            : current,
      );
      return { previousLists, previousStats };
    },
    onError: (_error, _variables, context) => {
      context?.previousLists.forEach(([key, value]) =>
        queryClient.setQueryData(key, value),
      );
      queryClient.setQueryData(
        queryKeys.notificationStats,
        context?.previousStats,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
      queryClient.invalidateQueries({ queryKey: queryKeys.notificationStats });
    },
  });
};
