"use client";

import { ConversationRow } from "@/components/app/conversations/ConversationRow";
import { ConversationListSkeleton } from "@/components/app/conversations/ConversationSkeletons";
import { ConversationThread } from "@/components/app/conversations/ConversationThread";
import { NoConversationSelected } from "@/components/app/conversations/NoConversationSelected";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { EmptyState } from "@/components/app/shared/ParticipantUI";
import { useConversations } from "@/hooks/useConversations";
import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";

export const ConversationWorkspace = ({
  selectedId,
}: {
  selectedId?: string;
}) => {
  const dict = useDict();
  const conversations = useConversations();
  return (
    <AppWrapper noFooter className="h-dvh grid-rows-[auto_auto_1fr]">
      <div className="grid h-full grid-rows-1 gap-10 overflow-hidden py-10 ps-5 pe-11 lg:grid-cols-[449fr_815fr]">
        <aside
          className={cn(
            "grid h-full w-full shrink-0 grid-cols-1",
            selectedId && "hidden lg:block",
          )}
        >
          <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr] overflow-hidden rounded-[20px] bg-white">
            <h1 className="border-border border-b p-6 text-base leading-8 font-medium text-black">
              {dict.conversations.title}
            </h1>
            {conversations.isLoading ? (
              <ConversationListSkeleton />
            ) : !conversations.data?.items.length ? (
              <EmptyState title={dict.conversations.empty} />
            ) : (
              <div className="grid h-full flex-1 grow auto-rows-max grid-cols-1 items-start overflow-y-auto">
                {conversations.data.items.map((conversation) => (
                  <ConversationRow
                    key={conversation.id}
                    conversation={conversation}
                    selected={conversation.id === selectedId}
                  />
                ))}
              </div>
            )}
          </div>
        </aside>
        <section
          className={cn(
            "h-full min-w-0 flex-1 overflow-y-auto",
            !selectedId && "hidden lg:block",
          )}
        >
          {selectedId ? (
            <ConversationThread conversationId={selectedId} />
          ) : (
            <NoConversationSelected />
          )}
        </section>
      </div>
    </AppWrapper>
  );
};
