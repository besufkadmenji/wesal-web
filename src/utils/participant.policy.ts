export type ParticipantRole = "user" | "provider" | null;

export const canAccessParticipantPath = (role: ParticipantRole, path: string) => {
  if (path.startsWith("/my-listings")) return role === "provider";
  if (path.startsWith("/profile/favorites")) return role === "user";
  if (
    path.startsWith("/conversations") ||
    path.startsWith("/contracts") ||
    path.startsWith("/complaints")
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
  items.some((item) => item.id === incoming.id)
    ? items
    : [...items, incoming];
