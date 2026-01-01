import {
    ResetPasswordMutation,
    ResetPasswordMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const RESET_PASSWORD_MUTATION: TypedDocumentNode<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
> = gql`
  mutation ResetPassword($input: ResetPasswordWithTokenInput!) {
    resetPassword(input: $input)
  }
`;
