import {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const FORGOT_PASSWORD_MUTATION: TypedDocumentNode<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
> = gql`
  mutation forgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input)
  }
`;
