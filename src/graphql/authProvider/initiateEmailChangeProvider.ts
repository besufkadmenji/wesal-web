import {
  InitiateProviderEmailChangeMutation,
  InitiateProviderEmailChangeMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const INITIATE_PROVIDER_EMAIL_CHANGE_MUTATION: TypedDocumentNode<
  InitiateProviderEmailChangeMutation,
  InitiateProviderEmailChangeMutationVariables
> = gql`
  mutation initiateProviderEmailChange($input: ChangeEmailInput!) {
    initiateProviderEmailChange(input: $input) {
      changeToken
    }
  }
`;
