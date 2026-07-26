export const notificationHref = (
  relatedEntityType?: string | null,
  relatedEntityId?: string | null,
): string | undefined => {
  if (!relatedEntityId || !relatedEntityType) return undefined;
  if (relatedEntityType === "contract") return `/contracts/${relatedEntityId}`;
  return undefined;
};
