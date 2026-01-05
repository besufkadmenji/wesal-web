import { UpdateUserMutation, UpdateUserMutationVariables } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const UPDATE_USER_MUTATION: TypedDocumentNode<
  UpdateUserMutation,
  UpdateUserMutationVariables
> = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
    }
  }
`;
