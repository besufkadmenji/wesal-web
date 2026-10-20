"use client";

import { Button } from "@/components/ui/button";
import MessagesIcon from "@/assets/icons/conversations.svg";
import ViewAllIcon from "@/assets/icons/view.all.alt.svg";
import { ChatDrawerItem } from "@/components/app/shared/ChatDrawerItem";
import { SideDrawer } from "@/components/app/shared/SideDrawer";
import { UnreadDot } from "@/components/app/shared/UnreadDot";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import {
  useConversations,
  useConversationStats,
} from "@/hooks/useConversations";
import { useMe } from "@/hooks/useMe";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

/**
 * Figma chats drawer (6543:21353): list, then "view all chats". D-21: a dot
 * on the header icon; each unread row keeps its own count.
 */
export const ChatDrawer = () => {
  const dict = useDict();
  const lang = useLang();
  const { me } = useMe();
  const [open, setOpen] = useState(false);
  const conversations = useConversations({ page: 1, limit: 20 });
  const stats = useConversationStats();
  const hasUnread = (stats.data?.unreadCount || 0) > 0;
  const items = conversations.data?.items ?? [];

  return (
    <SideDrawer
      open={open}
      onOpenChange={setOpen}
      title={dict.header.messages}
      closeLabel={dict.notifications.close}
      trigger={
        <Button
          variant="ghost"
          className="flex h-10 gap-2 bg-white px-0 lg:px-2"
        >
          <div className="relative grid size-9.5 shrink-0 items-center justify-items-center rounded-[12px] border border-[#F2F2F2]">
            <MessagesIcon className="size-6" />
            {hasUnread && <UnreadDot label={dict.header.unreadMessages} />}
          </div>
          <p
            className={twMerge(
              "text-gray hidden text-base font-medium xl:block",
              lang === "en" && "xl:text-sm",
            )}
          >
            {dict.header.messages}
          </p>
        </Button>
      }
      footer={
        <Link
          href="/conversations"
          onClick={() => setOpen(false)}
          className="flex h-18 shrink-0 items-center gap-2.5 border-t border-[#F2F2F2] bg-white px-6"
        >
          <span className="text-primary flex-1 text-base font-semibold">
            {dict.conversations.viewAll}
          </span>
          <ViewAllIcon className="size-6 shrink-0 ltr:rotate-180" />
        </Link>
      }
    >
      {!conversations.isLoading && items.length === 0 && (
        <p className="text-gray p-6 text-center text-sm">
          {dict.conversations.empty}
        </p>
      )}
      {items.map((conversation) => (
        <ChatDrawerItem
          key={conversation.id}
          conversation={conversation}
          party={me?.provider ? conversation.user : conversation.provider}
          lang={lang}
          onNavigate={() => setOpen(false)}
        />
      ))}
    </SideDrawer>
  );
};
