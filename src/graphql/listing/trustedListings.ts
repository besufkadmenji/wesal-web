import {
  TrustedListingsQuery,
  TrustedListingsQueryVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const TRUSTED_LISTINGS_QUERY: TypedDocumentNode<
  TrustedListingsQuery,
  TrustedListingsQueryVariables
> = gql`
  query trustedListings($limit: Int) {
    trustedListings(limit: $limit) {
      id
      name
      description
      price
      type
      ratingAverage
      photos {
        filename
        id
        originalFilename
        size
        sortOrder
        type
      }
    }
  }
`;
