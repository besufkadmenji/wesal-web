"use client";
import {
  ListingCard,
  ListingCardSkeleton,
} from "@/components/app/listings/ListingCard";
import { ListingHeader } from "@/components/app/listings/my-listings/ListingHeader";
import { NoListing } from "@/components/app/listings/my-listings/NoListing";
import { useListings } from "@/components/app/listings/my-listings/useListings";
import { AppPagination } from "@/components/app/shared/AppPagination";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { useMe } from "@/hooks/useMe";
import { useEffect } from "react";

export const MyListings = () => {
  const { me } = useMe();
  const { isLoading, listings, page, setPage } = useListings();
  useEffect(() => {
    if (me && !me?.provider) {
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
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: 16 }).map((_, index) => (
                  <ListingCardSkeleton key={index} />
                ))}
              </div>
            ) : !listings || listings.items.length === 0 ? (
              <NoListing />
            ) : (
              <div className="grid grid-cols-1 gap-12">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {listings.items.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
                {listings.meta.totalPages > 1 && (
                  <AppPagination
                    page={page}
                    totalPages={listings.meta.totalPages}
                    onChange={setPage}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </AppWrapper>
    )
  );
};
