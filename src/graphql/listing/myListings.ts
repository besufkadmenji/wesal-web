import { MyListingsQuery, MyListingsQueryVariables } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const MY_LISTINGS_QUERY: TypedDocumentNode<
  MyListingsQuery,
  MyListingsQueryVariables
> = gql`
  query myListings($paginationInput: ListingPaginationInput!) {
    myListings(paginationInput: $paginationInput) {
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
        price
        status
        story {
          filename
          id
          sortOrder
          type
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
        }
      }
    }
  }
`;
