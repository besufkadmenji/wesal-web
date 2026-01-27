"use client";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { UserRole } from "@/gql/graphql";
import { useMe } from "@/hooks/useMe";
import { useEffect } from "react";
import { ListingHeader } from "@/components/app/my-listings/ListingHeader";
import { NoListing } from "@/components/app/my-listings/NoListing";
import { useListing } from "@/components/app/my-listings/useListing";
import {
  ListingCard,
  ListingCardSkeleton,
} from "@/components/app/my-listings/ListingCard";

export const MyListings = () => {
  const { me } = useMe();
  const { isLoading, listings } = useListing();
  useEffect(() => {
    if (me && me.role !== UserRole.Provider) {
      window.location.href = "/";
    }
    return () => {};
  }, [me]);

  return (
    me && (
      <AppWrapper>
        <div className="grid grid-cols-1">
          <ListingHeader />
          <div className="grid grid-cols-1 px-[7vw] py-20">
            {isLoading ? (
              <div className="grid grid-cols-4 gap-x-8 gap-y-10">
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
                <ListingCardSkeleton />
              </div>
            ) : !listings || listings.items.length === 0 ? (
              <NoListing />
            ) : (
              <div className="grid grid-cols-1 ">
                <div className="grid grid-cols-4 gap-x-8 gap-y-10">
                  {listings.items.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </AppWrapper>
    )
  );
};
