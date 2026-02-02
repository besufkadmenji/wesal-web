import {
  ResetProviderPasswordMutation,
  ResetProviderPasswordMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const RESET_PROVIDER_PASSWORD_MUTATION: TypedDocumentNode<
  ResetProviderPasswordMutation,
  ResetProviderPasswordMutationVariables
> = gql`
  mutation resetProviderPassword($input: ResetPasswordWithTokenInput!) {
    resetProviderPassword(input: $input)
  }
`;
