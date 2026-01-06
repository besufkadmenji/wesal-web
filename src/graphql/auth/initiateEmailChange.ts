import {
    InitiateEmailChangeMutation,
    InitiateEmailChangeMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const INITIATE_EMAIL_CHANGE_MUTATION: TypedDocumentNode<
  InitiateEmailChangeMutation,
  InitiateEmailChangeMutationVariables
> = gql`
  mutation initiateEmailChange($input: ChangeEmailInput!) {
    initiateEmailChange(input: $input) {
      changeToken
    }
  }
`;
