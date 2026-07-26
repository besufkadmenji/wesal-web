"use client";

import type { NotificationPaginationInput } from "@/gql/graphql";
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
      queryClient.invalidateQueries({ queryKey: queryKeys.notificationStats });
    },
  });
};
