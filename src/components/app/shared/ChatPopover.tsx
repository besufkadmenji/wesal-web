"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MessagesIcon from "@/assets/icons/conversations.svg";
import CloseIcon from "@/assets/icons/notifications/close.svg";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { twMerge } from "tailwind-merge";
import {
  useConversations,
  useConversationStats,
} from "@/hooks/useConversations";
import { useMe } from "@/hooks/useMe";
import { ChatPopoverItem } from "@/components/app/shared/ChatPopoverItem";
import ViewAllIcon from "@/assets/icons/view.all.alt.svg";
import Link from "next/link";
import { useState } from "react";

/** Figma "chats pop up" (6543:21353): title + close, list, view all. */
export const ChatPopover = () => {
  const dict = useDict();
  const lang = useLang();
  const { me } = useMe();
  const [open, setOpen] = useState(false);
  const conversations = useConversations({ page: 1, limit: 10 });
  const stats = useConversationStats();
  const unread = stats.data?.unreadCount || 0;
  const items = conversations.data?.items ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-10 gap-2 bg-white px-0 lg:px-2"
        >
          <div className="grid size-9.5 shrink-0 items-center justify-items-center rounded-[12px] border border-[#F2F2F2]">
            <MessagesIcon className="size-6" />
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
            {dict.header.messages}
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[min(593px,calc(100vw-2rem))] overflow-hidden rounded-[20px] border-0 bg-[#FCFDFE] p-0"
      >
        <div className="flex items-center gap-2.5 border-b border-[#F2F2F2] bg-white p-6">
          <p className="flex-1 text-base leading-8 font-medium text-[#1A1A1A]">
            {dict.header.messages}
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
        <div className="grid max-h-[60vh] overflow-y-auto">
          {!conversations.isLoading && items.length === 0 && (
            <p className="text-gray p-6 text-center text-sm">
              {dict.conversations.empty}
            </p>
          )}
          {items.map((conversation) => (
            <ChatPopoverItem
              key={conversation.id}
              conversation={conversation}
              party={me?.provider ? conversation.user : conversation.provider}
              lang={lang}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </div>
        <Link
          href="/conversations"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 border-b border-[#F2F2F2] bg-white p-6"
        >
          <span className="text-primary flex-1 text-base font-semibold">
            {dict.conversations.viewAll}
          </span>
          <ViewAllIcon className="size-6 shrink-0 ltr:rotate-180" />
        </Link>
      </PopoverContent>
    </Popover>
  );
};
