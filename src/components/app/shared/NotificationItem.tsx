"use client";

import type { Notification } from "@/gql/graphql";
import { notificationHref } from "@/components/app/shared/notificationHref";
import { useMarkNotificationAsRead } from "@/hooks/useNotifications";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

type NotificationItemProps = {
  notification: Pick<
    Notification,
    | "id"
    | "title"
    | "message"
    | "isRead"
    | "relatedEntityId"
    | "relatedEntityType"
  >;
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const router = useRouter();
  const markAsRead = useMarkNotificationAsRead();
  const href = notificationHref(
    notification.relatedEntityType,
    notification.relatedEntityId,
  );

  const handleClick = async () => {
    if (!notification.isRead) {
      await markAsRead.mutateAsync(notification.id);
    }
    if (href) {
      router.push(href);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(
        "border-border grid w-full gap-1 border-b p-4 text-start hover:bg-[#f8f9fc]",
        !notification.isRead && "bg-[#f8f9fc]",
      )}
    >
      <p
        className={twMerge(
          "truncate text-sm",
          notification.isRead ? "font-medium" : "font-semibold",
        )}
      >
        {notification.title}
      </p>
      <p className="text-gray line-clamp-2 text-xs">{notification.message}</p>
    </button>
  );
};
