import {
  CreateContactMessageMutation,
  CreateContactMessageMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const CREATE_CONTACT_MESSAGE_MUTATION: TypedDocumentNode<
  CreateContactMessageMutation,
  CreateContactMessageMutationVariables
> = gql`
  mutation createContactMessage(
    $createContactMessageInput: CreateContactMessageInput!
  ) {
    createContactMessage(
      createContactMessageInput: $createContactMessageInput
    ) {
      attachmentFilename
      createdAt
      dialCode
      email
      id
      isRead
      messageContent
      messageType
      name
      phone
      updatedAt
    }
  }
`;
