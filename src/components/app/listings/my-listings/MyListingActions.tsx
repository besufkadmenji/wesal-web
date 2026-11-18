"use client";

import { FeatureListingButton } from "@/components/app/listings/my-listings/FeatureListingButton";
import { ListingExpiryNote } from "@/components/app/listings/my-listings/ListingExpiryNote";
import { PayToFeatureButton } from "@/components/app/listings/my-listings/PayToFeatureButton";
import { RepublishListingButton } from "@/components/app/listings/my-listings/RepublishListingButton";
import {
  ListingStatus,
  ListingType,
  PromotionStatus,
  type Listing,
} from "@/gql/graphql";
import { useSetting } from "@/hooks/useSettings";

/** The owner's next step for one ad on My Ads (S4-10, S4-59, S4-62). */
export const MyListingActions = ({
  listing,
}: {
  listing: Pick<
    Listing,
    "id" | "status" | "type" | "promotionStatus" | "expiresAt"
  >;
}) => {
  const { setting } = useSetting();
  if (listing.status === ListingStatus.Expired) {
    return <RepublishListingButton listingId={listing.id} />;
  }
  if (listing.status !== ListingStatus.Active) return null;
  if (listing.promotionStatus === PromotionStatus.PendingPayment) {
    return <PayToFeatureButton listingId={listing.id} />;
  }
  const canFeature =
    setting?.premiumAdEnabled &&
    listing.type === ListingType.Free &&
    [PromotionStatus.None, PromotionStatus.Expired].includes(
      listing.promotionStatus,
    );
  if (!listing.expiresAt && !canFeature) return null;
  return (
    <div className="grid gap-2">
      {listing.expiresAt ? (
        <ListingExpiryNote expiresAt={listing.expiresAt} />
      ) : null}
      {canFeature && <FeatureListingButton listingId={listing.id} />}
    </div>
  );
};
