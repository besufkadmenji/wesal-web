import {
  InitiatePhoneChangeMutation,
  InitiatePhoneChangeMutationVariables,
} from "@/gql/graphql";
import { gql } from "@apollo/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export const INITIATE_PHONE_CHANGE_MUTATION: TypedDocumentNode<
  InitiatePhoneChangeMutation,
  InitiatePhoneChangeMutationVariables
> = gql`
  mutation initiatePhoneChange($input: ChangePhoneInput!) {
    initiatePhoneChange(input: $input) {
      changeToken
    }
  }
`;
