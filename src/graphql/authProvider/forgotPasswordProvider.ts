import {
  ForgotProviderPasswordMutation,
  ForgotProviderPasswordMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const FORGOT_PROVIDER_PASSWORD_MUTATION: TypedDocumentNode<
  ForgotProviderPasswordMutation,
  ForgotProviderPasswordMutationVariables
> = gql`
  mutation forgotProviderPassword($input: ForgotPasswordInput!) {
    forgotProviderPassword(input: $input)
  }
`;
