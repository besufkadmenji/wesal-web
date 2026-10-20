"use client";

import ShowMoreIcon from "@/assets/icons/show.more.svg";
import { Ratings } from "@/components/app/listings/ListingDetail/MainInfo";
import { ReviewCard } from "@/components/app/listings/ListingDetail/ReviewCard";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import { useDict } from "@/hooks/useDict";
import { RatingService } from "@/services/rating.service";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

/**
 * Published reviews for a listing. Reviews are written from completed
 * contracts only (BRD 4.1.20.1), so there is no "add review" action here.
 */
export const Reviews = ({
  listing,
}: {
  listing: Pick<Listing, "id" | "ratingAverage" | "ratingCount">;
}) => {
  const dict = useDict();
  const reviews = useInfiniteQuery({
    queryKey: queryKeys.listingReviews(listing.id),
    queryFn: ({ pageParam }) =>
      RatingService.listingReviews({
        listingId: listing.id,
        page: pageParam,
        limit: PAGE_SIZE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNext ? lastPage.meta.page + 1 : undefined,
  });
  const items = reviews.data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="grid grid-cols-1 gap-6 rounded-[20px] bg-white p-5">
      <div className="grid grid-cols-1 gap-1">
        <p>{dict.listingDetail.reviews.title}</p>
        <Ratings rating={listing.ratingAverage} total={listing.ratingCount} />
      </div>
      {!reviews.isLoading && items.length === 0 ? (
        <p className="text-gray text-sm">{dict.listingDetail.reviews.empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {items.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
      {reviews.hasNextPage && (
        <Button
          variant={"secondary"}
          className="mt-9 h-12.5 gap-3 justify-self-start rounded-[20px] px-6!"
          disabled={reviews.isFetchingNextPage}
          onClick={() => reviews.fetchNextPage()}
        >
          <p className="text-primary text-base font-semibold">
            {dict.listingDetail.reviews.viewMore}
          </p>
          <ShowMoreIcon className="size-5 ltr:rotate-90" />
        </Button>
      )}
    </div>
  );
};
