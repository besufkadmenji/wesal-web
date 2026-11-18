"use client";

import { startPremiumCheckout } from "@/components/app/listings/my-listings/startPremiumCheckout";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import ListingService from "@/services/listing.service";
import { showErrorMessage } from "@/utils/show.messages";
import { useMutation } from "@tanstack/react-query";

/**
 * S4-PAY-REFEATURE: feature an active free ad (never featured, or its
 * featured period ended), then pay the fee through checkout.
 */
export const FeatureListingButton = ({ listingId }: { listingId: string }) => {
  const dict = useDict();
  const feature = useMutation({
    mutationFn: async () => {
      await ListingService.featureListing(listingId);
      await startPremiumCheckout(listingId);
    },
    onError: (error) => showErrorMessage(error.message),
  });
  return (
    <Button
      type="button"
      variant="secondary"
      className="h-11 w-full rounded-[16px]"
      disabled={feature.isPending || feature.isSuccess}
      onClick={() => feature.mutate()}
    >
      {dict.myListings.expiry.featureAd}
    </Button>
  );
};
