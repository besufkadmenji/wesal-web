"use client";
import { ListingFilter } from "@/components/app/listings/ListingFilter";
import { ListingHeader } from "@/components/app/listings/ListingHeader";
import { useListings } from "@/components/app/listings/useListings";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { ListingCard, ListingCardSkeleton } from "./ListingCard";
import { AppPagination } from "@/components/app/shared/AppPagination";
import { useQueryState, parseAsInteger } from "nuqs";
import { NoListing } from "@/components/app/listings/NoListing";
export const Listings = () => {
  const { listings, isLoading } = useListings();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  return (
    <AppWrapper>
      <ListingHeader />
      <div className="grid auto-rows-max grid-cols-[auto_1fr] items-start gap-8 px-[7vw] py-20">
        <ListingFilter />
        {!isLoading && listings?.items.length === 0 ? (
          <NoListing />
        ) : (
          <div className="grid grid-cols-3 gap-x-8 gap-y-10">
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
            <div className="col-span-3 mt-10">
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
