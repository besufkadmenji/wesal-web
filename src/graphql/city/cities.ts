import { CitiesQuery, CitiesQueryVariables } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const CITIES: TypedDocumentNode<CitiesQuery, CitiesQueryVariables> = gql`
  query cities($pagination: CityPaginationInput) {
    cities(pagination: $pagination) {
      meta {
        hasNext
        hasPrevious
        limit
        page
        total
        totalPages
      }
      items {
        countryId
        createdAt
        id
        nameEn
        updatedAt
        nameAr
        country {
          code
          nameEn
          createdAt
          dialCode
          id
          nameAr
          updatedAt
        }
      }
    }
  }
`;
