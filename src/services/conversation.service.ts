import type {
  Conversation,
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
  MESSAGES_QUERY,
  PAY_CONVERSATION_FEE_MUTATION,
  RESTART_CONVERSATION_MUTATION,
} from "@/graphql/conversation/operations";
import { requireData } from "@/utils/apollo.result";
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
    return requireData(result, "Create conversation").createConversation;
  }

  static async markRead(conversationId: string) {
    const result = await client().mutate<{ markConversationRead: Conversation }>({
      mutation: MARK_CONVERSATION_READ_MUTATION,
      variables: { conversationId },
    });
    return requireData(result, "Mark conversation read").markConversationRead;
  }

  static async restart(conversationId: string) {
    const result = await client().mutate<{ restartConversation: Conversation }>({
      mutation: RESTART_CONVERSATION_MUTATION,
      variables: { conversationId },
    });
    return requireData(result, "Restart conversation").restartConversation;
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
    return requireData(result, "Create message").createMessage;
  }

  static messageAdded(conversationId: string) {
    return client().subscribe<{ messageAdded: Message }>({
      query: MESSAGE_ADDED_SUBSCRIPTION,
      variables: { conversationId },
    });
  }

  static async payFee(conversationId: string) {
    const result = await client().mutate<{
      payConversationFee: ConversationFeePaymentResponse;
    }>({
      mutation: PAY_CONVERSATION_FEE_MUTATION,
      variables: { conversationId },
    });
    return requireData(result, "Pay conversation fee").payConversationFee;
  }
}
