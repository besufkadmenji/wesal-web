import { UpdateMeMutation, UpdateMeMutationVariables } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const UPDATE_USER_MUTATION: TypedDocumentNode<
  UpdateMeMutation,
  UpdateMeMutationVariables
> = gql`
  mutation updateMe($updateMeInput: UpdateMeInput!) {
    updateMe(updateMeInput: $updateMeInput) {
      id
    }
  }
`;
