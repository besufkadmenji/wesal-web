import {
  VerifyEmailChangeMutation,
  VerifyEmailChangeMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const VERIFY_EMAIL_CHANGE_MUTATION: TypedDocumentNode<
  VerifyEmailChangeMutation,
  VerifyEmailChangeMutationVariables
> = gql`
  mutation verifyEmailChange($input: VerifyChangeEmailInput!) {
    verifyEmailChange(input: $input)
  }
`;
