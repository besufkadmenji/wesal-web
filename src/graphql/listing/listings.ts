import {
    ListingsQuery,
    ListingsQueryVariables
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const LISTINGS_QUERY: TypedDocumentNode<
  ListingsQuery,
  ListingsQueryVariables
> = gql`
  query listings($paginationInput: ListingPaginationInput!) {
    listings(paginationInput: $paginationInput) {
      meta {
        hasNext
        hasPrevious
        limit
        page
        total
        totalPages
      }
      items {
        categoryId
        cityId
        createdAt
        description
        id
        name
        status
        price
        story {
          filename
          id
          originalFilename
          size
          sortOrder
          type
        }
        tags
        type
        updatedAt
        providerId
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
  }
`;
