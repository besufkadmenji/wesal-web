export const queryKeys = {
  conversations: ["conversations"] as const,
  conversation: (id: string) => ["conversation", id] as const,
  messages: (id: string) => ["messages", id] as const,
  contracts: ["contracts"] as const,
  contract: (id: string) => ["contract", id] as const,
  contractDraft: (conversationId: string) =>
    ["contract-draft", conversationId] as const,
  complaints: ["complaints"] as const,
  complaint: (id: string) => ["complaint", id] as const,
  favorites: ["favorites"] as const,
  favorite: (id: string) => ["favorite", id] as const,
  notifications: ["notifications"] as const,
  notificationStats: ["notification-stats"] as const,
  setting: ["setting"] as const,
  deliveryCompanies: ["delivery-companies"] as const,
  ownerListing: (id: string) => ["owner-listing", id] as const,
  contractQuote: (conversationId: string, price: number) =>
    ["contract-quote", conversationId, price] as const,
};
