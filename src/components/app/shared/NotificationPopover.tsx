"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationIcon from "@/assets/icons/notifications.svg";
import { NotificationItem } from "@/components/app/shared/NotificationItem";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import {
  useMarkAllNotificationsAsRead,
  useNotificationStats,
  useNotifications,
} from "@/hooks/useNotifications";
import { SortOrder } from "@/gql/graphql";
import { twMerge } from "tailwind-merge";

export const NotificationPopover = () => {
  const dict = useDict();
  const lang = useLang();
  const notifications = useNotifications({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.Desc,
  });
  const stats = useNotificationStats();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const unread = stats.data?.unreadCount || 0;
  const items = notifications.data?.items || [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-10 gap-2 bg-white px-0 lg:px-2"
        >
          <div className="relative grid size-9.5 shrink-0 items-center justify-items-center rounded-[12px] border border-[#F2F2F2]">
            <NotificationIcon className="size-6" />
            {unread > 0 && (
              <span className="bg-primary absolute ms-8 -mt-8 grid size-4 place-content-center rounded-full text-[9px] text-white">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </div>
          <p
            className={twMerge(
              "text-gray hidden text-base font-medium xl:block",
              lang === "en" && "xl:text-sm",
            )}
          >
            {dict.header.notifications}
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 overflow-hidden p-0">
        <div className="border-border flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">{dict.header.notifications}</p>
          {unread > 0 && (
            <button
              type="button"
              className="text-primary text-xs font-semibold"
              disabled={markAllAsRead.isPending}
              onClick={() => markAllAsRead.mutate()}
            >
              {dict.notifications.markAllRead}
            </button>
          )}
        </div>
        <div className="grid max-h-[80vh] overflow-y-auto">
          {notifications.isLoading && (
            <p className="text-gray p-4 text-center text-sm">
              {dict.notifications.loading}
            </p>
          )}
          {!notifications.isLoading && items.length === 0 && (
            <p className="text-gray p-4 text-center text-sm">
              {dict.notifications.empty}
            </p>
          )}
          {items.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
