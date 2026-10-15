import { Ratings } from "@/components/app/listings/ListingDetail/MainInfo";
import {
  ParticipantAvatar,
  useLocalizedFormat,
} from "@/components/app/shared/ParticipantUI";
import type { ListingReview } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";

export const ReviewCard = ({ review }: { review: ListingReview }) => {
  const dict = useDict();
  const format = useLocalizedFormat();
  const name = review.reviewerName ?? dict.listingDetail.reviews.anonymous;
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-b-[#F2F2F2] pb-6">
      <ParticipantAvatar
        filename={review.reviewerAvatarFilename}
        name={name}
        className="size-14"
      />
      <div className="grid grid-cols-1 gap-3">
        <div className="grid grid-cols-[1fr_auto] gap-2.5">
          <div className="grid grid-cols-1 gap-2">
            <p className="text-lg font-medium text-[#1A1A1A]">{name}</p>
            <p className="text-gray text-sm">
              {format.dateOnly(review.createdAt)}
            </p>
          </div>
          <Ratings
            rating={review.rating}
            hideInfo
            classNames={{
              rating: "size-4",
            }}
          />
        </div>
        {review.comment && (
          <p className="text-gray text-sm leading-6 font-medium">
            {review.comment}
          </p>
        )}
      </div>
    </div>
  );
};
