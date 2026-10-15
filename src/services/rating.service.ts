import type {
  ListingReviewsInput,
  PaginatedListingReviewResponse,
  RateContractInput,
  Rating,
} from "@/gql/graphql";
import {
  LISTING_REVIEWS_QUERY,
  RATE_CONTRACT_MUTATION,
} from "@/graphql/rating/operations";
import { requireData, requireOperationField } from "@/utils/apollo.result";
import client from "@/utils/apollo.client";

export class RatingService {
  static async rateContract(input: RateContractInput) {
    const result = await client().mutate<{ rateContract: Rating }>({
      mutation: RATE_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireOperationField(result, "rateContract", "Rate contract");
  }

  static async listingReviews(input: ListingReviewsInput) {
    const result = await client().query<{
      listingReviews: PaginatedListingReviewResponse;
    }>({
      query: LISTING_REVIEWS_QUERY,
      variables: { input },
      fetchPolicy: "network-only",
    });
    return requireData(result, "Listing reviews").listingReviews;
  }
}
