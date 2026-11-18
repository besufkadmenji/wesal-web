import { CheckoutPurpose, PaymentMethod } from "@/gql/graphql";
import { PaymentService } from "@/services/payment.service";

/** Starts the premium-ad (featured) checkout and leaves for the gateway. */
export const startPremiumCheckout = async (listingId: string) => {
  const checkout = await PaymentService.startCheckout({
    purpose: CheckoutPurpose.PremiumAd,
    targetId: listingId,
    method: PaymentMethod.Electronic,
  });
  PaymentService.redirect(checkout);
};
