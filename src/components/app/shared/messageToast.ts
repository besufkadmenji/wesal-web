import type { Message } from "@/gql/graphql";
import { toast } from "sonner";

type SenderLike = { name?: string | null; commercialName?: string | null };

/**
 * Pops up a chat message that arrived while the person is elsewhere on the
 * site, so they notice it without watching the messages icon. "View" opens
 * the conversation.
 */
export const showMessageToast = (
  message: Pick<Message, "id" | "conversationId" | "content" | "metadata"> & {
    sender?: SenderLike | null;
  },
  options: {
    fallbackTitle: string;
    photoLabel: string;
    viewLabel: string;
    onView: (href: string) => void;
  },
) => {
  const sender = message.sender;
  const title =
    sender?.commercialName?.trim() ||
    sender?.name?.trim() ||
    options.fallbackTitle;
  const hasPhoto = Boolean(
    (message.metadata as { attachment?: unknown } | null | undefined)
      ?.attachment,
  );
  const text = message.content?.trim();
  const href = `/conversations/${message.conversationId}`;
  toast(title, {
    id: `message-${message.id}`,
    description: text || (hasPhoto ? options.photoLabel : undefined),
    duration: 6000,
    action: { label: options.viewLabel, onClick: () => options.onView(href) },
  });
};
