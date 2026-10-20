"use client";

import { Button } from "@/components/ui/button";
import { CheckoutPurpose, PaymentMethod } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { PaymentService } from "@/services/payment.service";
import { showErrorMessage } from "@/utils/show.messages";
import { useMutation } from "@tanstack/react-query";

/** S4-10: retry the premium fee for a featured ad still waiting for it. */
export const PayToFeatureButton = ({ listingId }: { listingId: string }) => {
  const dict = useDict();
  const checkout = useMutation({
    mutationFn: () =>
      PaymentService.startCheckout({
        purpose: CheckoutPurpose.PremiumAd,
        targetId: listingId,
        method: PaymentMethod.Electronic,
      }),
    onSuccess: ({ redirectUrl }) => PaymentService.redirect(redirectUrl),
    onError: (error) => showErrorMessage(error.message),
  });
  return (
    <Button
      type="button"
      className="h-11 w-full rounded-[16px]"
      disabled={checkout.isPending || checkout.isSuccess}
      onClick={() => checkout.mutate()}
    >
      {dict.promotion.payToFeature}
    </Button>
  );
};
