export type ParticipantRole = "user" | "provider" | null;

export const canAccessParticipantPath = (
  role: ParticipantRole,
  path: string,
) => {
  if (path.startsWith("/my-listings")) return role === "provider";
  if (path.startsWith("/profile/favorites")) return role === "user";
  if (
    path.startsWith("/conversations") ||
    path.startsWith("/contracts") ||
    path.startsWith("/payments")
  ) {
    return role === "user" || role === "provider";
  }
  return true;
};

export const validateComplaintEvidence = (files: File[]) => {
  if (files.length > 3) return "TOO_MANY" as const;
  if (files.some((file) => !["image/png", "image/jpeg"].includes(file.type))) {
    return "INVALID_TYPE" as const;
  }
  if (files.some((file) => file.size > 5 * 1024 * 1024)) {
    return "TOO_LARGE" as const;
  }
  return null;
};

export const isComplaintThreadClosed = (status: string) =>
  ["RESOLVED", "REJECTED", "CLOSED"].includes(status);

export const mergeUniqueById = <T extends { id: string }>(
  items: T[],
  incoming: T,
) =>
  items.some((item) => item.id === incoming.id) ? items : [...items, incoming];

type ChatItem = {
  id: string;
  senderId?: string | null;
  content?: string | null;
  metadata?: unknown;
};

const OPTIMISTIC_PREFIX = "optimistic-";

const attachmentName = (item: ChatItem) =>
  (item.metadata as { attachment?: { filename?: string } } | null | undefined)
    ?.attachment?.filename ?? null;

/**
 * Adds a message that arrived over the socket. Our own message can arrive
 * before the send request returns; it then replaces its optimistic copy
 * instead of showing twice for a moment. `added` says whether the list grew.
 */
export const mergeIncomingMessage = <T extends ChatItem>(
  items: T[],
  incoming: T,
): { items: T[]; added: boolean } => {
  if (items.some((item) => item.id === incoming.id)) {
    return { items, added: false };
  }
  const pending = (item: T) =>
    item.id.startsWith(OPTIMISTIC_PREFIX) &&
    item.senderId === incoming.senderId &&
    attachmentName(item) === attachmentName(incoming);
  // Prefer the copy with the same text; the API can change the text
  // (contact details are hidden), so otherwise take our oldest copy.
  const exact = items.findIndex(
    (item) =>
      pending(item) && (item.content ?? "") === (incoming.content ?? ""),
  );
  const optimisticIndex = exact !== -1 ? exact : items.findIndex(pending);
  if (optimisticIndex === -1) {
    return { items: [...items, incoming], added: true };
  }
  const next = [...items];
  next[optimisticIndex] = incoming;
  return { items: next, added: false };
};

/**
 * Settles a sent message: swaps its optimistic copy for the saved one, or
 * just drops the copy when the socket already delivered the saved message.
 * `delta` is the change in the list's length.
 */
export const settleSentMessage = <T extends ChatItem>(
  items: T[],
  optimisticId: string | undefined,
  saved: T,
): { items: T[]; delta: number } => {
  const hasSaved = items.some((item) => item.id === saved.id);
  const hasOptimistic =
    optimisticId !== undefined &&
    items.some((item) => item.id === optimisticId);
  if (hasSaved) {
    return hasOptimistic
      ? { items: items.filter((item) => item.id !== optimisticId), delta: -1 }
      : { items, delta: 0 };
  }
  if (hasOptimistic) {
    return {
      items: items.map((item) => (item.id === optimisticId ? saved : item)),
      delta: 0,
    };
  }
  return { items: [...items, saved], delta: 1 };
};
