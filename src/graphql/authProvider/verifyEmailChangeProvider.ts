import {
  VerifyProviderEmailChangeMutation,
  VerifyProviderEmailChangeMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const VERIFY_PROVIDER_EMAIL_CHANGE_MUTATION: TypedDocumentNode<
  VerifyProviderEmailChangeMutation,
  VerifyProviderEmailChangeMutationVariables
> = gql`
  mutation verifyProviderEmailChange($input: VerifyChangeEmailInput!) {
    verifyProviderEmailChange(input: $input)
  }
`;
