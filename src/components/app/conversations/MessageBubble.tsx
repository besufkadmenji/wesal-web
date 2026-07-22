"use client";

import { useLocalizedFormat } from "@/components/app/shared/ParticipantUI";
import { systemMessageLabel } from "@/components/app/conversations/systemMessageLabel";
import {
  ConversationSenderType,
  MessageKind,
  type Message,
} from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { cn } from "@/lib/utils";
import { FileWarning } from "lucide-react";

export const MessageBubble = ({ message }: { message: Message }) => {
  const { me } = useMe();
  const dict = useDict();
  const format = useLocalizedFormat();
  if (
    message.senderType === ConversationSenderType.System ||
    message.kind !== MessageKind.Text
  ) {
    return (
      <div className="mx-auto flex max-w-lg items-center gap-2 rounded-full bg-[#eff1f6] px-4 py-2 text-center text-xs text-[#4b5265]">
        <FileWarning className="size-4" />
        <span>
          {systemMessageLabel(message.kind, dict.conversations)}
        </span>
      </div>
    );
  }
  const mine = message.senderId === (me?.user?.id || me?.provider?.id);
  return (
    <div className={cn("flex", mine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-[14px] bg-[#f2f2f2] px-4 py-3 md:max-w-[70%]",
          mine && "bg-[#eff1f6]",
        )}
      >
        <p className="text-sm leading-6 break-words whitespace-pre-wrap">
          {message.content}
        </p>
        <time className="text-gray mt-1 block text-[10px]">
          {format.date(message.createdAt)}
        </time>
      </div>
    </div>
  );
};
