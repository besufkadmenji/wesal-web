import type {
  Notification,
  NotificationPaginationInput,
  NotificationStats,
  PaginatedNotificationResponse,
} from "@/gql/graphql";
import {
  MARK_ALL_NOTIFICATIONS_AS_READ_MUTATION,
  MARK_NOTIFICATION_AS_READ_MUTATION,
  NOTIFICATION_STATS_QUERY,
  NOTIFICATIONS_QUERY,
} from "@/graphql/notification/operations";
import { requireData } from "@/utils/apollo.result";
import client from "@/utils/apollo.client";

export class NotificationService {
  static async findAll(input: NotificationPaginationInput = {}) {
    const result = await client().query<{
      notifications: PaginatedNotificationResponse;
    }>({ query: NOTIFICATIONS_QUERY, variables: { input } });
    return requireData(result, "Notifications").notifications;
  }

  static async getStats(userId: string) {
    const result = await client().query<{
      notificationStats: NotificationStats;
    }>({ query: NOTIFICATION_STATS_QUERY, variables: { userId } });
    return requireData(result, "Notification stats").notificationStats;
  }

  static async markAsRead(id: string) {
    const result = await client().mutate<{
      markNotificationAsRead: Notification;
    }>({
      mutation: MARK_NOTIFICATION_AS_READ_MUTATION,
      variables: { id },
    });
    return requireData(result, "Mark notification as read")
      .markNotificationAsRead;
  }

  static async markAllAsRead(userId: string) {
    const result = await client().mutate<{
      markAllNotificationsAsRead: boolean;
    }>({
      mutation: MARK_ALL_NOTIFICATIONS_AS_READ_MUTATION,
      variables: { userId },
    });
    return requireData(result, "Mark all notifications as read")
      .markAllNotificationsAsRead;
  }
}
