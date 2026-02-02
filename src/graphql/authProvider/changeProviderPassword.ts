import {
  ChangeProviderPasswordMutation,
  ChangeProviderPasswordMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const CHANGE_PROVIDER_PASSWORD_MUTATION: TypedDocumentNode<
  ChangeProviderPasswordMutation,
  ChangeProviderPasswordMutationVariables
> = gql`
  mutation changeProviderPassword($input: ChangePasswordInput!) {
    changeProviderPassword(input: $input)
  }
`;
