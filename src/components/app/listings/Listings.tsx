"use client";
import { ListingFilter } from "@/components/app/listings/ListingFilter";
import { ListingHeader } from "@/components/app/listings/ListingHeader";
import { NoListing } from "@/components/app/listings/NoListing";
import { useListings } from "@/components/app/listings/useListings";
import { AppPagination } from "@/components/app/shared/AppPagination";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { parseAsInteger, useQueryState } from "nuqs";
import { ListingCard, ListingCardSkeleton } from "./ListingCard";
export const Listings = () => {
  const { listings, isLoading } = useListings();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  return (
    <AppWrapper>
      <ListingHeader />
      <div className="grid auto-rows-max lg:grid-cols-[auto_1fr] px-8 items-start gap-8 lg:px-[7vw] py-10 lg:py-20">
        <ListingFilter />
        {!isLoading && listings?.items.length === 0 ? (
          <NoListing />
        ) : (
          <div className="grid grid-cols-1 gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 xl:grid-cols-3">
              {isLoading ? (
                <>
                  {Array.from({ length: 16 }).map((_, index) => (
                    <ListingCardSkeleton key={index} />
                  ))}
                </>
              ) : (
                <>
                  {listings?.items.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </>
              )}
            </div>
            <div className="">
              {listings && (
                <AppPagination
                  page={listings.meta.page}
                  totalPages={listings.meta.totalPages}
                  onChange={(page) => setPage(page)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </AppWrapper>
  );
};
