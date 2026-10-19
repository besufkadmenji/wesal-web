/**
 * Where a notification leads, from the entity the API attached to it.
 * Types without a page of their own (broadcast, badge, payment, admin-only
 * events) stay unlinked.
 */
export const notificationHref = (
  relatedEntityType?: string | null,
  relatedEntityId?: string | null,
): string | undefined => {
  switch (relatedEntityType) {
    case "provider":
      return "/profile";
    case "category":
      return "/categories";
  }
  if (!relatedEntityId) return undefined;
  switch (relatedEntityType) {
    case "contract":
      return `/contracts/${relatedEntityId}`;
    case "conversation":
      return `/conversations/${relatedEntityId}`;
    case "listing":
      return `/my-listings/${relatedEntityId}`;
    case "complaint":
      return `/complaints/${relatedEntityId}`;
    default:
      return undefined;
  }
};
