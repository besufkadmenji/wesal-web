import { Ratings } from "@/components/app/listings/ListingDetail/MainInfo";
import { RatingStatus, type Rating } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";

export const ContractRatingSummary = ({
  rating,
}: {
  rating: Pick<Rating, "rating" | "comment" | "status">;
}) => {
  const dict = useDict();
  return (
    <div className="grid justify-items-center gap-3 rounded-2xl border border-[#f2f2f2] bg-[#fbfbfb] p-4 text-center">
      <Ratings rating={rating.rating} hideInfo />
      {rating.comment && (
        <p className="text-sm leading-6 font-medium text-[#1a1a1a]">
          {rating.comment}
        </p>
      )}
      {rating.status === RatingStatus.Hidden && (
        <p className="text-gray text-xs">{dict.contracts.ratingHidden}</p>
      )}
    </div>
  );
};
