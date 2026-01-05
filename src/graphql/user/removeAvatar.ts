import {
    RemoveAvatarMutation,
    RemoveAvatarMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const REMOVE_AVATAR_MUTATION: TypedDocumentNode<
  RemoveAvatarMutation,
  RemoveAvatarMutationVariables
> = gql`
  mutation removeAvatar($removeAvatarId: ID!) {
    removeAvatar(id: $removeAvatarId)
  }
`;
