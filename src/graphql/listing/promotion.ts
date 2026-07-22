import {
  LISTING_FRAGMENT,
  PAYMENT_FRAGMENT,
} from "@/graphql/common/fragments";
import { gql } from "@apollo/client";

export const REQUEST_FEATURED_PROMOTION_MUTATION = gql`
  mutation RequestFeaturedPromotion($listingId: ID!) {
    requestFeaturedPromotion(listingId: $listingId) { ...ListingSummary }
  }
  ${LISTING_FRAGMENT}
`;

export const PAY_PREMIUM_AD_MUTATION = gql`
  mutation PayPremiumAd($listingId: String!) {
    payPremiumAd(listingId: $listingId) {
      payment { ...PaymentSummary }
      listing { ...ListingSummary }
    }
  }
  ${PAYMENT_FRAGMENT}
  ${LISTING_FRAGMENT}
`;
