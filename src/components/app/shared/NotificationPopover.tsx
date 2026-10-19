"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationIcon from "@/assets/icons/notifications.svg";
import CloseIcon from "@/assets/icons/notifications/close.svg";
import { NotificationItem } from "@/components/app/shared/NotificationItem";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import {
  useNotificationStats,
  useNotifications,
} from "@/hooks/useNotifications";
import { SortOrder } from "@/gql/graphql";
import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const unread = stats.data?.unreadCount || 0;
  const items = notifications.data?.items || [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
      {/* Figma "notifications" popup (6543:21334): title + close, then the list. */}
      <PopoverContent
        align="end"
        className="w-[min(593px,calc(100vw-2rem))] overflow-hidden rounded-[20px] border-0 bg-[#FCFDFE] p-0"
      >
        <div className="flex items-center gap-2.5 border-b border-[#F2F2F2] bg-white p-6">
          <p className="flex-1 text-base leading-8 font-medium text-[#1A1A1A]">
            {dict.header.notifications}
          </p>
          <button
            type="button"
            aria-label={dict.notifications.close}
            onClick={() => setOpen(false)}
            className="grid size-8 shrink-0 place-content-center rounded-2xl border border-[#F2F2F2] bg-white"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>
        <div className="grid max-h-[70vh] overflow-y-auto">
          {notifications.isLoading && (
            <p className="text-gray p-6 text-center text-sm">
              {dict.notifications.loading}
            </p>
          )}
          {!notifications.isLoading && items.length === 0 && (
            <p className="text-gray p-6 text-center text-sm">
              {dict.notifications.empty}
            </p>
          )}
          {items.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
