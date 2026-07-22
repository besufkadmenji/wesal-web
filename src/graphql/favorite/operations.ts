import {
  PAGINATION_FRAGMENT,
  PROVIDER_FRAGMENT,
} from "@/graphql/common/fragments";
import { gql } from "@apollo/client";

export const MY_FAVORITES_QUERY = gql`
  query MyFavoriteProviders($input: FavoritePaginationInput) {
    myFavoriteProviders(input: $input) {
      items {
        id
        providerId
        createdAt
        provider { ...ProviderSummary }
      }
      meta { ...PaginationFields }
    }
  }
  ${PROVIDER_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

export const IS_PROVIDER_FAVORITE_QUERY = gql`
  query IsProviderFavorite($providerId: String!) {
    isProviderFavorite(providerId: $providerId)
  }
`;

export const SET_PROVIDER_FAVORITE_MUTATION = gql`
  mutation SetProviderFavorite($providerId: String!, $favorite: Boolean!) {
    setProviderFavorite(providerId: $providerId, favorite: $favorite)
  }
`;
