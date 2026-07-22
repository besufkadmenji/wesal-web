import {
  LISTING_FRAGMENT,
  PAGINATION_FRAGMENT,
  PAYMENT_FRAGMENT,
  PROVIDER_FRAGMENT,
  USER_FRAGMENT,
} from "@/graphql/common/fragments";
import { gql } from "@apollo/client";

const MESSAGE_FRAGMENT = gql`
  fragment MessageFields on Message {
    id
    conversationId
    senderId
    senderType
    kind
    content
    metadata
    createdAt
    sender {
      ... on User {
        id
        name
        avatarFilename
      }
      ... on Provider {
        id
        name
        commercialName
        avatarFilename
      }
    }
  }
`;

const CONVERSATION_FRAGMENT = gql`
  fragment ConversationFields on Conversation {
    id
    listingId
    userId
    providerId
    status
    expiresAt
    closedAt
    closeReason
    feeCycle
    customerFeePaidAt
    providerFeePaidAt
    createdAt
    updatedAt
    unreadCount
    access {
      feeRequired
      feeAmount
      paidAt
      canSend
      expiresAt
      feeCycle
    }
    lastMessage {
      ...MessageFields
    }
    listing {
      ...ListingSummary
    }
    user {
      ...UserSummary
    }
    provider {
      ...ProviderSummary
    }
  }
  ${MESSAGE_FRAGMENT}
  ${LISTING_FRAGMENT}
  ${USER_FRAGMENT}
  ${PROVIDER_FRAGMENT}
`;

export const CONVERSATIONS_QUERY = gql`
  query Conversations($input: ConversationPaginationInput) {
    conversations(input: $input) {
      items { ...ConversationFields }
      meta { ...PaginationFields }
    }
  }
  ${CONVERSATION_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

export const CONVERSATION_QUERY = gql`
  query ConversationById($id: String!) {
    conversation(id: $id) { ...ConversationFields }
  }
  ${CONVERSATION_FRAGMENT}
`;

export const CREATE_CONVERSATION_MUTATION = gql`
  mutation CreateConversation($input: CreateConversationInput!) {
    createConversation(input: $input) { ...ConversationFields }
  }
  ${CONVERSATION_FRAGMENT}
`;

export const MARK_CONVERSATION_READ_MUTATION = gql`
  mutation MarkConversationRead($conversationId: String!) {
    markConversationRead(conversationId: $conversationId) { id unreadCount }
  }
`;

export const RESTART_CONVERSATION_MUTATION = gql`
  mutation RestartConversation($conversationId: String!) {
    restartConversation(conversationId: $conversationId) { ...ConversationFields }
  }
  ${CONVERSATION_FRAGMENT}
`;

export const MESSAGES_QUERY = gql`
  query Messages($input: MessagePaginationInput) {
    messages(input: $input) {
      items { ...MessageFields }
      meta { ...PaginationFields }
    }
  }
  ${MESSAGE_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) { ...MessageFields }
  }
  ${MESSAGE_FRAGMENT}
`;

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription MessageAdded($conversationId: String!) {
    messageAdded(conversationId: $conversationId) { ...MessageFields }
  }
  ${MESSAGE_FRAGMENT}
`;

export const PAY_CONVERSATION_FEE_MUTATION = gql`
  mutation PayConversationFee($conversationId: String!) {
    payConversationFee(conversationId: $conversationId) {
      payment { ...PaymentSummary }
      access { feeRequired feeAmount paidAt canSend expiresAt feeCycle }
      conversation { ...ConversationFields }
    }
  }
  ${PAYMENT_FRAGMENT}
  ${CONVERSATION_FRAGMENT}
`;
