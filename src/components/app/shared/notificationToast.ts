import type { Notification } from "@/gql/graphql";
import { notificationHref } from "@/components/app/shared/notificationHref";
import { toast } from "sonner";

type ToastNotification = Pick<
  Notification,
  "id" | "title" | "message" | "relatedEntityId" | "relatedEntityType"
>;

/**
 * ClickUp 869fp1jmt: pops up a notification that arrived while the site is
 * open. "View" opens the related page, like a row in the notification list.
 */
export const showNotificationToast = (
  notification: ToastNotification,
  options: { viewLabel: string; onView: (href: string) => void },
) => {
  const href = notificationHref(
    notification.relatedEntityType,
    notification.relatedEntityId,
  );
  toast(notification.title, {
    id: `notification-${notification.id}`,
    description: notification.message,
    duration: 6000,
    action: href
      ? { label: options.viewLabel, onClick: () => options.onView(href) }
      : undefined,
  });
};
