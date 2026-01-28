import {
  RemoveListingMutation,
  RemoveListingMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const REMOVE_LISTING_MUTATION: TypedDocumentNode<
  RemoveListingMutation,
  RemoveListingMutationVariables
> = gql`
  mutation removeListing($removeListingId: String!) {
    removeListing(id: $removeListingId) {
      message
      success
    }
  }
`;
