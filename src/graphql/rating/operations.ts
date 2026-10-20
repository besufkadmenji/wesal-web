import { PAGINATION_FRAGMENT } from "@/graphql/common/fragments";
import { gql } from "@apollo/client";

export const CONTRACT_RATING_FRAGMENT = gql`
  fragment ContractRatingFields on Rating {
    id
    rating
    comment
    status
    createdAt
  }
`;

export const RATE_CONTRACT_MUTATION = gql`
  mutation RateContract($input: RateContractInput!) {
    rateContract(input: $input) {
      ...ContractRatingFields
    }
  }
  ${CONTRACT_RATING_FRAGMENT}
`;

export const LISTING_REVIEWS_QUERY = gql`
  query ListingReviews($input: ListingReviewsInput!) {
    listingReviews(input: $input) {
      items {
        id
        rating
        comment
        reviewerName
        reviewerAvatarFilename
        createdAt
      }
      meta {
        ...PaginationFields
      }
    }
  }
  ${PAGINATION_FRAGMENT}
`;
