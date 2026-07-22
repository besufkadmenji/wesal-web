"use client";

import {
  ParticipantAvatar,
  useLocalizedFormat,
} from "@/components/app/shared/ParticipantUI";
import { systemMessageLabel } from "@/components/app/conversations/systemMessageLabel";
import { MessageKind, type Conversation } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const ConversationRow = ({
  conversation,
  selected,
}: {
  conversation: Conversation;
  selected: boolean;
}) => {
  const { me } = useMe();
  const dict = useDict();
  const format = useLocalizedFormat();
  const counterparty = me?.provider ? conversation.user : conversation.provider;
  const unread = conversation.unreadCount > 0;
  return (
    <Link
      href={`/conversations/${conversation.id}`}
      className={cn(
        "border-border flex items-start gap-3 border-b bg-white p-6 transition hover:bg-[#f8f9fc]",
        (selected || unread) &&
          "border-transparent bg-[#eff1f6] hover:bg-[#eff1f6]",
      )}
    >
      <ParticipantAvatar
        filename={counterparty.avatarFilename}
        name={counterparty.name}
        className="size-12.5"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex w-full items-center gap-1">
          <p className="min-w-0 flex-1 truncate text-start text-base leading-8 font-medium text-black">
            {counterparty.name}
          </p>
          {conversation.lastMessage && (
            <time className="text-gray flex shrink-0 items-center gap-1 text-xs font-light whitespace-nowrap">
              <span>{format.dateOnly(conversation.lastMessage.createdAt)}</span>
              <span aria-hidden>•</span>
              <span>{format.timeOnly(conversation.lastMessage.createdAt)}</span>
            </time>
          )}
        </div>
        <div className="flex w-full items-center gap-2.5">
          <p className="text-gray line-clamp-1 min-w-0 flex-1 text-start text-sm leading-[1.7]">
            {conversation.lastMessage?.kind === MessageKind.Text
              ? conversation.lastMessage.content
              : conversation.lastMessage
                ? systemMessageLabel(
                    conversation.lastMessage.kind,
                    dict.conversations,
                  )
                : conversation.listing.name}
          </p>
          {unread && (
            <span className="bg-primary grid size-5 shrink-0 place-content-center rounded-full text-xs leading-[1.7] text-white">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
