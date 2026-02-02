import {
  RemoveProviderAvatarMutation,
  RemoveProviderAvatarMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const REMOVE_PROVIDER_AVATAR_MUTATION: TypedDocumentNode<
  RemoveProviderAvatarMutation,
  RemoveProviderAvatarMutationVariables
> = gql`
  mutation removeProviderAvatar($removeProviderAvatarId: ID!) {
    removeProviderAvatar(id: $removeProviderAvatarId)
  }
`;
