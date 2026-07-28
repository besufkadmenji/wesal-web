import type {
  Conversation,
  ConversationStats,
  ConversationFeePaymentResponse,
  ConversationPaginationInput,
  Message,
  MessagePaginationInput,
  PaginatedConversationResponse,
  PaginatedMessageResponse,
} from "@/gql/graphql";
import {
  CONVERSATION_QUERY,
  CONVERSATIONS_QUERY,
  CREATE_CONVERSATION_MUTATION,
  CREATE_MESSAGE_MUTATION,
  MARK_CONVERSATION_READ_MUTATION,
  MESSAGE_ADDED_SUBSCRIPTION,
  PARTICIPANT_MESSAGE_ADDED_SUBSCRIPTION,
  CONVERSATION_STATS_QUERY,
  MESSAGES_QUERY,
  PAY_CONVERSATION_FEE_MUTATION,
  RESTART_CONVERSATION_MUTATION,
} from "@/graphql/conversation/operations";
import { requireData, requireOperationField } from "@/utils/apollo.result";
import client from "@/utils/apollo.client";

export class ConversationService {
  static async findAll(input: ConversationPaginationInput = {}) {
    const result = await client().query<{
      conversations: PaginatedConversationResponse;
    }>({ query: CONVERSATIONS_QUERY, variables: { input } });
    return requireData(result, "Conversations").conversations;
  }

  static async findOne(id: string) {
    const result = await client().query<{ conversation: Conversation }>({
      query: CONVERSATION_QUERY,
      variables: { id },
    });
    return requireData(result, "Conversation").conversation;
  }

  static async create(listingId: string) {
    const result = await client().mutate<{ createConversation: Conversation }>({
      mutation: CREATE_CONVERSATION_MUTATION,
      variables: { input: { listingId } },
    });
    return requireOperationField(
      result,
      "createConversation",
      "Create conversation",
    );
  }

  static async markRead(conversationId: string) {
    const result = await client().mutate<{ markConversationRead: Conversation }>({
      mutation: MARK_CONVERSATION_READ_MUTATION,
      variables: { conversationId },
    });
    return requireOperationField(
      result,
      "markConversationRead",
      "Mark conversation read",
    );
  }

  static async restart(conversationId: string) {
    const result = await client().mutate<{ restartConversation: Conversation }>({
      mutation: RESTART_CONVERSATION_MUTATION,
      variables: { conversationId },
    });
    return requireOperationField(
      result,
      "restartConversation",
      "Restart conversation",
    );
  }

  static async messages(input: MessagePaginationInput) {
    const result = await client().query<{ messages: PaginatedMessageResponse }>({
      query: MESSAGES_QUERY,
      variables: { input },
    });
    return requireData(result, "Messages").messages;
  }

  static async sendMessage(conversationId: string, content: string) {
    const result = await client().mutate<{ createMessage: Message }>({
      mutation: CREATE_MESSAGE_MUTATION,
      variables: { input: { conversationId, content } },
    });
    return requireOperationField(result, "createMessage", "Create message");
  }

  static messageAdded(conversationId: string) {
    return client().subscribe<{ messageAdded: Message }>({
      query: MESSAGE_ADDED_SUBSCRIPTION,
      variables: { conversationId },
    });
  }

  static participantMessageAdded() {
    return client().subscribe<{ participantMessageAdded: Message }>({
      query: PARTICIPANT_MESSAGE_ADDED_SUBSCRIPTION,
    });
  }

  static async stats() {
    const result = await client().query<{
      conversationStats: ConversationStats;
    }>({ query: CONVERSATION_STATS_QUERY });
    return requireData(result, "Conversation stats").conversationStats;
  }

  static async payFee(conversationId: string) {
    const result = await client().mutate<{
      payConversationFee: ConversationFeePaymentResponse;
    }>({
      mutation: PAY_CONVERSATION_FEE_MUTATION,
      variables: { conversationId },
    });
    return requireOperationField(
      result,
      "payConversationFee",
      "Pay conversation fee",
    );
  }
}
