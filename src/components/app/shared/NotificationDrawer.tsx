"use client";

import { Button } from "@/components/ui/button";
import NotificationIcon from "@/assets/icons/notifications.svg";
import { NotificationItem } from "@/components/app/shared/NotificationItem";
import { SideDrawer } from "@/components/app/shared/SideDrawer";
import { UnreadDot } from "@/components/app/shared/UnreadDot";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import {
  useNotificationStats,
  useNotifications,
} from "@/hooks/useNotifications";
import { SortOrder } from "@/gql/graphql";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Figma notifications drawer (6242:7205 customer, 6543:21334 provider).
 * D-21 (user, 2026-10-20): match Figma — a dot on the bell, no counter and
 * no "mark all as read".
 */
export const NotificationDrawer = () => {
  const dict = useDict();
  const lang = useLang();
  const notifications = useNotifications({
    page: 1,
    limit: 20,
    sortOrder: SortOrder.Desc,
  });
  const stats = useNotificationStats();
  const [open, setOpen] = useState(false);
  const hasUnread = (stats.data?.unreadCount || 0) > 0;
  const items = notifications.data?.items || [];

  return (
    <SideDrawer
      open={open}
      onOpenChange={setOpen}
      title={dict.header.notifications}
      closeLabel={dict.notifications.close}
      trigger={
        <Button
          variant="ghost"
          className="flex h-10 gap-2 bg-white px-0 lg:px-2"
        >
          <div className="relative grid size-9.5 shrink-0 items-center justify-items-center rounded-[12px] border border-[#F2F2F2]">
            <NotificationIcon className="size-6" />
            {hasUnread && (
              <UnreadDot label={dict.header.unreadNotifications} />
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
      }
    >
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
    </SideDrawer>
  );
};
