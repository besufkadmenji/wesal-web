"use client";

import type { Notification } from "@/gql/graphql";
import { ListDateTime } from "@/components/app/shared/ListDateTime";
import { NotificationTypeIcon } from "@/components/app/shared/NotificationTypeIcon";
import { notificationHref } from "@/components/app/shared/notificationHref";
import { useLang } from "@/hooks/useLang";
import { useMarkNotificationAsRead } from "@/hooks/useNotifications";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

type NotificationItemProps = {
  notification: Pick<
    Notification,
    | "id"
    | "type"
    | "title"
    | "message"
    | "isRead"
    | "createdAt"
    | "relatedEntityId"
    | "relatedEntityType"
  >;
  onNavigate?: () => void;
};

/** One row of the Figma notification list (6242:7422 / 6242:7494). */
export const NotificationItem = ({
  notification,
  onNavigate,
}: NotificationItemProps) => {
  const router = useRouter();
  const lang = useLang();
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
      onNavigate?.();
      router.push(`/${lang}${href}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={twMerge(
        "flex w-full items-start gap-3 p-6 text-start",
        notification.isRead
          ? "border-b border-[#F2F2F2] bg-white"
          : "bg-[#EFF1F6]",
      )}
    >
      <NotificationTypeIcon
        type={notification.type}
        relatedEntityType={notification.relatedEntityType}
        isRead={notification.isRead}
      />
      <span className="grid min-w-0 flex-1 gap-1">
        <span className="flex items-center gap-2.5">
          <span className="min-w-0 flex-1 text-base leading-8 font-medium text-[#1A1A1A]">
            {notification.title}
          </span>
          <ListDateTime value={notification.createdAt} lang={lang} />
        </span>
        <span className="text-sm leading-[1.7] text-[#666]">
          {notification.message}
        </span>
      </span>
    </button>
  );
};
