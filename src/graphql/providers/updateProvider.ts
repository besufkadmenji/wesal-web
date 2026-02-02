import {
  UpdateProviderMutation,
  UpdateProviderMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const UPDATE_PROVIDER_MUTATION: TypedDocumentNode<
  UpdateProviderMutation,
  UpdateProviderMutationVariables
> = gql`
  mutation updateProvider($updateProviderInput: UpdateProviderInput!) {
    updateProvider(updateProviderInput: $updateProviderInput) {
      id
    }
  }
`;
