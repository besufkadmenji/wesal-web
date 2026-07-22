import type {
  Listing,
  PremiumAdPaymentResponse,
} from "@/gql/graphql";
import {
  PAY_PREMIUM_AD_MUTATION,
  REQUEST_FEATURED_PROMOTION_MUTATION,
} from "@/graphql/listing/promotion";
import { requireData } from "@/utils/apollo.result";
import client from "@/utils/apollo.client";

export class PromotionService {
  static async request(listingId: string) {
    const result = await client().mutate<{ requestFeaturedPromotion: Listing }>({
      mutation: REQUEST_FEATURED_PROMOTION_MUTATION,
      variables: { listingId },
    });
    return requireData(result, "Request promotion").requestFeaturedPromotion;
  }

  static async pay(listingId: string) {
    const result = await client().mutate<{
      payPremiumAd: PremiumAdPaymentResponse;
    }>({ mutation: PAY_PREMIUM_AD_MUTATION, variables: { listingId } });
    return requireData(result, "Pay premium ad").payPremiumAd;
  }
}
