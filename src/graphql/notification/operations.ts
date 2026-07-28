import { PAGINATION_FRAGMENT } from "@/graphql/common/fragments";
import { gql } from "@apollo/client";

export const NOTIFICATION_FRAGMENT = gql`
  fragment NotificationFields on Notification {
    id
    title
    message
    type
    isRead
    createdAt
    relatedEntityId
    relatedEntityType
  }
`;

export const NOTIFICATIONS_QUERY = gql`
  query Notifications($input: NotificationPaginationInput) {
    notifications(input: $input) {
      items {
        ...NotificationFields
      }
      meta {
        ...PaginationFields
      }
    }
  }
  ${NOTIFICATION_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

export const NOTIFICATION_STATS_QUERY = gql`
  query NotificationStats($userId: String!) {
    notificationStats(userId: $userId) {
      totalNotifications
      unreadCount
      readCount
    }
  }
`;

export const MARK_NOTIFICATION_AS_READ_MUTATION = gql`
  mutation MarkNotificationAsRead($id: String!) {
    markNotificationAsRead(id: $id) {
      id
      isRead
      readAt
    }
  }
`;

export const MARK_ALL_NOTIFICATIONS_AS_READ_MUTATION = gql`
  mutation MarkAllNotificationsAsRead($userId: String!) {
    markAllNotificationsAsRead(userId: $userId)
  }
`;

export const NOTIFICATION_ADDED_SUBSCRIPTION = gql`
  subscription NotificationAdded {
    notificationAdded {
      ...NotificationFields
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;
