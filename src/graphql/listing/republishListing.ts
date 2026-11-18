import {
  RepublishListingMutation,
  RepublishListingMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

/** S4-62: re-publish an expired ad, optionally asking to feature it. */
export const REPUBLISH_LISTING_MUTATION: TypedDocumentNode<
  RepublishListingMutation,
  RepublishListingMutationVariables
> = gql`
  mutation republishListing($id: ID!, $featured: Boolean!) {
    republishListing(id: $id, featured: $featured) {
      id
      status
      type
      promotionStatus
      expiresAt
    }
  }
`;
