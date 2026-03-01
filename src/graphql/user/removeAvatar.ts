import {
  RemoveMyAvatarMutation,
  RemoveMyAvatarMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const REMOVE_AVATAR_MUTATION: TypedDocumentNode<
  RemoveMyAvatarMutation,
  RemoveMyAvatarMutationVariables
> = gql`
  mutation removeMyAvatar {
    removeMyAvatar
  }
`;
