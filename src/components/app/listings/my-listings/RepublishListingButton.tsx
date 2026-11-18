"use client";

import { RepublishListingDialog } from "@/components/app/listings/my-listings/RepublishListingDialog";
import { startPremiumCheckout } from "@/components/app/listings/my-listings/startPremiumCheckout";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import ListingService from "@/services/listing.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

/** S4-62: re-publish an expired ad from My Ads. */
export const RepublishListingButton = ({
  listingId,
}: {
  listingId: string;
}) => {
  const dict = useDict();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const republish = useMutation({
    mutationFn: async (featured: boolean) => {
      await ListingService.republishListing(listingId, featured);
      if (featured) await startPremiumCheckout(listingId);
      return featured;
    },
    onSuccess: async (featured) => {
      if (featured) return; // leaving for the payment page
      setOpen(false);
      showSuccessMessage(dict.myListings.expiry.republished);
      await queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: async (error) => {
      showErrorMessage(error.message);
      // A featured re-publish may have succeeded before checkout failed.
      await queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });
  return (
    <>
      <Button
        type="button"
        className="h-11 w-full rounded-[16px]"
        onClick={() => setOpen(true)}
      >
        {dict.myListings.expiry.republish}
      </Button>
      <RepublishListingDialog
        open={open}
        onOpenChange={setOpen}
        isPending={republish.isPending}
        onConfirm={(featured) => republish.mutate(featured)}
      />
    </>
  );
};
