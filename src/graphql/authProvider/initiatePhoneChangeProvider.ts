import {
  InitiateProviderPhoneChangeMutation,
  InitiateProviderPhoneChangeMutationVariables,
} from "@/gql/graphql";
import { gql } from "@apollo/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export const INITIATE_PROVIDER_PHONE_CHANGE_MUTATION: TypedDocumentNode<
  InitiateProviderPhoneChangeMutation,
  InitiateProviderPhoneChangeMutationVariables
> = gql`
  mutation initiateProviderPhoneChange($input: ChangePhoneInput!) {
    initiateProviderPhoneChange(input: $input) {
      changeToken
    }
  }
`;
