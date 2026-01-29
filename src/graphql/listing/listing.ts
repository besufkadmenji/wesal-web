import { ListingQuery, ListingQueryVariables } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const LISTING_QUERY: TypedDocumentNode<
  ListingQuery,
  ListingQueryVariables
> = gql`
  query listing($listingId: String!) {
    listing(id: $listingId) {
      id
      categoryId
      cityId
      createdAt
      description
      name
      price
      status
      story {
        filename
        id
        sortOrder
        type
        originalFilename
        size
      }
      tags
      type
      updatedAt
      userId
      photos {
        filename
        id
        sortOrder
        type
        originalFilename
        size
      }
      provider {
        id
        name
      }
    }
  }
`;
