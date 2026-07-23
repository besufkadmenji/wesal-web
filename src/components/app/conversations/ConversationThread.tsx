"use client";

import MessageFileIcon from "@/assets/icons/message.file.svg";
import MessageTimeIcon from "@/assets/icons/message.time.svg";
import { ComplaintDialog } from "@/components/app/conversations/ComplaintDialog";
import { MessageBubble } from "@/components/app/conversations/MessageBubble";
import {
  ConversationMessagesSkeleton,
  ConversationThreadSkeleton,
} from "@/components/app/conversations/ConversationSkeletons";
import { useConversationActions } from "@/components/app/conversations/useConversationActions";
import { useConversationComposer } from "@/components/app/conversations/useConversationComposer";
import { useConversationThread } from "@/components/app/conversations/useConversationThread";
import { FavoriteButton } from "@/components/app/favorites/FavoriteButton";
import {
  Countdown,
  EmptyState,
  ParticipantAvatar,
  StatusBadge,
} from "@/components/app/shared/ParticipantUI";
import { Button } from "@/components/ui/button";
import { ConversationStatus } from "@/gql/graphql";
import { useAppRouter } from "@/hooks/use.app.router";
import { useDict } from "@/hooks/useDict";
import { Send } from "lucide-react";
import Link from "next/link";
import TextareaAutosize from "react-textarea-autosize";

export const ConversationThread = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const dict = useDict();
  const router = useAppRouter();
  const {
    me,
    messages,
    item,
    counterparty,
    canSend,
    isExpired,
    contractHref,
    isRecreateContract,
    canShowContractAction,
    latestContract,
    isLoading,
  } = useConversationThread(conversationId);
  const { payFee, restart } = useConversationActions(conversationId);
  const { content, setContent, submitMessage, canSubmit } =
    useConversationComposer(conversationId, canSend);
  console.log("item", item);
  if (isLoading) return <ConversationThreadSkeleton />;
  if (!item || !counterparty)
    return <EmptyState title={dict.conversations.empty} />;

  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr_auto] overflow-hidden rounded-[20px] bg-white">
      <header className="border-border flex items-center gap-3 border-b p-4 md:p-6">
        <ParticipantAvatar
          filename={counterparty.avatarFilename}
          name={counterparty.name}
        />
        <div className="min-w-0 grow">
          <p className="truncate text-lg font-medium">{counterparty.name}</p>
          <p className="text-gray truncate text-sm">{item.listing.name}</p>
        </div>
        {!me?.provider && (
          <FavoriteButton providerId={item.providerId} iconOnly />
        )}
        <ComplaintDialog
          conversationId={conversationId}
          contractId={latestContract?.id}
        />
      </header>

      <div className="border-border flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 md:px-6">
        {item.expiresAt && (
          <div
            dir="ltr"
            className="flex items-center justify-end gap-3"
            aria-label={dict.conversations.remaining}
          >
            <div className="flex flex-col items-end justify-center text-end whitespace-nowrap">
              <span dir="auto" className="text-sm leading-[1.7] text-[#666]">
                {dict.conversations.remaining}
              </span>
              <Countdown date={item.expiresAt} />
            </div>
            <span className="flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-[#eff1f6]">
              <MessageTimeIcon className="size-6" aria-hidden="true" />
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-gray text-xs">
            {dict.conversations.cycle}: {item.feeCycle}
          </span>
          <StatusBadge status={item.status} />
          {me?.user &&
            item.status === ConversationStatus.Active &&
            canShowContractAction && (
              <Button asChild className="rounded-xl">
                <Link href={contractHref}>
                  {isRecreateContract
                    ? dict.conversations.recreateContract
                    : dict.conversations.createContract}
                </Link>
              </Button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-1 overflow-hidden bg-[#fdfdfe]">
        {messages.isLoading ? (
          <ConversationMessagesSkeleton />
        ) : !messages.data?.items.length ? (
          <EmptyState title={dict.common.empty} />
        ) : (
          <div className="grid h-full auto-rows-max items-start gap-4 overflow-y-auto p-4 md:p-6">
            {messages.data.items.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        )}
      </div>

      <footer className="border-border border-t p-4">
        {!canSend ? (
          <div className="grid gap-3 rounded-[16px] bg-[#f6f7fa] p-4 text-center">
            <p className="font-medium">
              {isExpired
                ? dict.conversations.expired
                : item.access?.feeRequired && !item.access.paidAt
                  ? dict.conversations.feeTitle
                  : dict.conversations.closed}
            </p>
            {item.access?.feeRequired && !item.access.paidAt && !isExpired && (
              <>
                <p className="text-gray text-sm">
                  {dict.conversations.feeDescription} ({item.access.feeAmount}{" "}
                  {dict.common.sar})
                </p>
                <Button
                  className="justify-self-center rounded-xl"
                  disabled={payFee.isPending}
                  onClick={() => payFee.mutate()}
                >
                  {dict.common.payNow}
                </Button>
              </>
            )}
            {isExpired && (
              <Button
                className="justify-self-center rounded-xl"
                disabled={restart.isPending}
                onClick={() => restart.mutate()}
              >
                {dict.conversations.restart}
              </Button>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="relative grid grow grid-cols-1 items-end rounded-[16px] bg-[#f6f7fa]">
              <TextareaAutosize
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder={dict.conversations.messagePlaceholder}
                className="min-h-14 w-full resize-none border-0 bg-transparent p-4 shadow-none outline-none"
                maxLength={2_000}
              />
              <label className="absolute top-4 right-4 grid size-6 cursor-pointer items-center justify-items-center rtl:left-4">
                <MessageFileIcon className="size-4" />
                <input type="file" hidden />
              </label>
            </div>
            <Button
              size="icon"
              className="my-0.75 size-12.5 rounded-[20px]"
              disabled={!canSubmit}
              onClick={submitMessage}
              aria-label={dict.common.send}
            >
              <Send className="size-5 rtl:rotate-180" />
            </Button>
          </div>
        )}
      </footer>
    </div>
  );
};
