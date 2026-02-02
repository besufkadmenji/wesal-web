import {
  VerifyProviderPhoneChangeMutation,
  VerifyProviderPhoneChangeMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const VERIFY_PROVIDER_PHONE_CHANGE_MUTATION: TypedDocumentNode<
  VerifyProviderPhoneChangeMutation,
  VerifyProviderPhoneChangeMutationVariables
> = gql`
  mutation verifyProviderPhoneChange($input: VerifyChangePhoneInput!) {
    verifyProviderPhoneChange(input: $input)
  }
`;
