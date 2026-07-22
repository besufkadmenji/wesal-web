import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MessagesIcon from "@/assets/icons/conversations.svg";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { twMerge } from "tailwind-merge";
import { useConversations } from "@/hooks/useConversations";
import { useMe } from "@/hooks/useMe";
import { ParticipantAvatar } from "@/components/app/shared/ParticipantUI";
import ViewAllIcon from "@/assets/icons/view.all.alt.svg";
import Link from "next/link";

export const ChatPopover = () => {
  const dict = useDict();
  const lang = useLang();
  const { me } = useMe();
  const conversations = useConversations({ page: 1, limit: 5 });
  const unread =
    conversations.data?.items.reduce(
      (total, conversation) => total + conversation.unreadCount,
      0,
    ) || 0;

  return (
    <Popover>
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
      <PopoverContent className="w-80 overflow-hidden p-0">
        <div className="grid max-h-96 overflow-y-auto">
          {conversations.data?.items.slice(0, 5).map((conversation) => {
            const party = me?.provider
              ? conversation.user
              : conversation.provider;
            return (
              <Link
                key={conversation.id}
                href={`/conversations/${conversation.id}`}
                className="grid grid-cols-[auto_1fr] gap-3 border-b border-[#f2f2f2] p-4 hover:bg-[#f8f9fc]"
              >
                <ParticipantAvatar
                  filename={party.avatarFilename}
                  name={party.name}
                  className="size-10"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{party.name}</p>
                  <p className="text-gray truncate text-xs">
                    {conversation.lastMessage?.content ||
                      conversation.listing.name}
                  </p>
                </div>
              </Link>
            );
          })}
          <Link
            href="/conversations"
            className="text-primary flex justify-between p-4 text-center text-sm font-semibold"
          >
            {dict.conversations.title}
            <ViewAllIcon className="size-4 ltr:rotate-180" />
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};
