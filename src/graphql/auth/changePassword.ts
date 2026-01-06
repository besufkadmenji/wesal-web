import {
    ChangePasswordMutation,
    ChangePasswordMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const CHANGE_PASSWORD_MUTATION: TypedDocumentNode<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
> = gql`
  mutation changePassword($input: ChangePasswordInput!) {
    changePassword(input: $input)
  }
`;
