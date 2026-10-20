import UserRoundedIcon from "@/assets/icons/chat.user.svg";
import { ParticipantAvatar } from "@/components/app/shared/ParticipantUI";
import { ListDateTime } from "@/components/app/shared/ListDateTime";
import type { Conversation } from "@/gql/graphql";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Party = { name?: string | null; avatarFilename?: string | null };

/** One row of the Figma chats drawer (6242:8849 unread / 6242:8848 read). */
export const ChatDrawerItem = ({
  conversation,
  party,
  lang,
  onNavigate,
}: {
  conversation: Pick<
    Conversation,
    "id" | "unreadCount" | "lastMessage" | "listing" | "updatedAt"
  >;
  party: Party;
  lang: string;
  onNavigate: () => void;
}) => {
  const unread = conversation.unreadCount ?? 0;
  return (
    <Link
      href={`/conversations/${conversation.id}`}
      onClick={onNavigate}
      className={twMerge(
        "flex w-full items-start gap-3 p-6",
        unread > 0 ? "bg-[#EFF1F6]" : "border-b border-[#F2F2F2] bg-white",
      )}
    >
      {party.avatarFilename ? (
        <ParticipantAvatar
          filename={party.avatarFilename}
          name={party.name}
          className="size-[50px] bg-white"
        />
      ) : (
        <span className="grid size-[50px] shrink-0 place-content-center rounded-full bg-[#F2F2F2]">
          <UserRoundedIcon className="size-6" />
        </span>
      )}
      <span className="grid min-w-0 flex-1 gap-1">
        <span className="flex items-center gap-2.5">
          <span
            dir="auto"
            className="text-page-start min-w-0 flex-1 truncate text-base leading-8 font-medium text-[#1A1A1A]"
          >
            {party.name}
          </span>
          <ListDateTime
            value={
              conversation.lastMessage?.createdAt ?? conversation.updatedAt
            }
            lang={lang}
          />
        </span>
        <span className="flex items-center gap-2.5">
          <span
            dir="auto"
            className="text-page-start line-clamp-2 min-w-0 flex-1 text-sm leading-[1.7] text-[#666]"
          >
            {conversation.lastMessage?.content || conversation.listing.name}
          </span>
          {unread > 0 && (
            <span className="bg-primary grid size-5 shrink-0 place-content-center rounded-full text-xs text-white">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </span>
      </span>
    </Link>
  );
};
