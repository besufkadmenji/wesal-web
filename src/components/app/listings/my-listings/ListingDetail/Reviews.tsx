import ShowMoreIcon from "@/assets/icons/show.more.svg";
import { Ratings } from "@/components/app/listings/my-listings/ListingDetail/MainInfo";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import Image from "next/image";
import { Review, reviewsData } from "./reviews_data";

export const Reviews = () => {
  const dict = useDict();
  return (
    <div className="grid grid-cols-1 gap-6 rounded-[20px] bg-white p-5">
      <div className="grid grid-cols-1 gap-1">
        <p>{dict.listingDetail.reviews.title}</p>
        <Ratings rating={4.5} total={22} />
      </div>
      <div className="grid grid-cols-1 gap-6">
        {reviewsData.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <Button
        variant={"secondary"}
        className="mt-9 h-12.5 gap-3 justify-self-start rounded-[20px] px-6!"
      >
        <p className="text-primary text-base font-semibold">
          {dict.listingDetail.reviews.viewMore}
        </p>
        <ShowMoreIcon className="size-5 ltr:rotate-90" />
      </Button>
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-b-[#F2F2F2] pb-6">
      <div className="relative size-14 rounded-full">
        <Image src={"/images/reviewer.png"} alt="reviewer" fill />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <div className="grid grid-cols-[1fr_auto] gap-2.5">
          <div className="grid grid-cols-1 gap-2">
            <p className="text-lg font-medium text-[#1A1A1A]">
              {review.reviewerName}
            </p>
            <p className="text-gray text-sm">{review.postedDate}</p>
          </div>
          <Ratings
            rating={review.rating}
            hideInfo
            classNames={{
              rating: "size-4",
            }}
          />
        </div>
        <p className="text-gray text-sm leading-6 font-medium">
          {review.comment}
        </p>
      </div>
    </div>
  );
};
