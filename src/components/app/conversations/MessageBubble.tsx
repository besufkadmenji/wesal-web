"use client";

import { useLocalizedFormat } from "@/components/app/shared/ParticipantUI";
import {
  systemMessageLabel,
  systemMessageReason,
} from "@/components/app/conversations/systemMessageLabel";
import {
  ConversationSenderType,
  MessageKind,
  type Message,
} from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { cn } from "@/lib/utils";
import { FileWarning } from "lucide-react";
import Image from "next/image";
import {
  chatPhotoUrl,
  messageAttachment,
} from "@/components/app/conversations/messageAttachment";

export const MessageBubble = ({ message }: { message: Message }) => {
  const { me } = useMe();
  const dict = useDict();
  const format = useLocalizedFormat();
  if (
    message.senderType === ConversationSenderType.System ||
    message.kind !== MessageKind.Text
  ) {
    const reason = systemMessageReason(message.metadata);
    if (reason) {
      return (
        <div className="mx-auto grid max-w-lg gap-2 rounded-[14px] border border-[#f7d8d6] bg-[#fbeae9] px-4 py-3 text-start">
          <span className="flex items-center gap-2 text-xs font-semibold text-[#b3251e]">
            <FileWarning className="size-4 shrink-0" />
            {systemMessageLabel(message.kind, dict.conversations)}
          </span>
          <p className="text-sm leading-6 break-words whitespace-pre-wrap text-[#1a1a1a]">
            <span className="text-gray">{dict.conversations.reason}: </span>
            {reason}
          </p>
        </div>
      );
    }
    return (
      <div className="mx-auto flex max-w-lg items-center gap-2 rounded-full bg-[#eff1f6] px-4 py-2 text-center text-xs text-[#4b5265]">
        <FileWarning className="size-4" />
        <span>{systemMessageLabel(message.kind, dict.conversations)}</span>
      </div>
    );
  }
  const mine = message.senderId === (me?.user?.id || me?.provider?.id);
  const photo = messageAttachment(message.metadata);
  return (
    <div className={cn("flex", mine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-[14px] bg-[#f2f2f2] px-4 py-3 md:max-w-[70%]",
          mine && "bg-[#eff1f6]",
        )}
      >
        {photo && (
          <a
            href={chatPhotoUrl(photo.filename)}
            target="_blank"
            rel="noreferrer"
            className="mb-2 block overflow-hidden rounded-xl"
            aria-label={dict.conversations.openPhoto}
          >
            <Image
              src={chatPhotoUrl(photo.filename)}
              alt={photo.originalFilename}
              width={240}
              height={240}
              className="h-auto max-h-72 w-60 max-w-full object-cover"
            />
          </a>
        )}
        {message.content && (
          <p className="text-sm leading-6 break-words whitespace-pre-wrap">
            {message.content}
          </p>
        )}
        <time className="text-gray mt-1 block text-[10px]">
          {format.date(message.createdAt)}
        </time>
      </div>
    </div>
  );
};
