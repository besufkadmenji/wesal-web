import {
  VerifyPhoneChangeMutation,
  VerifyPhoneChangeMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const VERIFY_PHONE_CHANGE_MUTATION: TypedDocumentNode<
  VerifyPhoneChangeMutation,
  VerifyPhoneChangeMutationVariables
> = gql`
  mutation verifyPhoneChange($input: VerifyChangePhoneInput!) {
    verifyPhoneChange(input: $input)
  }
`;
