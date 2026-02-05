import { sar } from "@/assets/fonts/sar";
import { Listing } from "@/gql/graphql";
import { moneyFormatter } from "@/utils/formmater";
import { twMerge } from "tailwind-merge";
import RatingIcon from "@/assets/icons/rating.svg";
import { useDict } from "@/hooks/useDict";
export const MainInfo = ({ listing }: { listing: Listing }) => {
  const dict = useDict();
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 gap-4 border-b border-b-[#F2F2F2] pb-6">
        <h2 className="text-3xl font-semibold text-[#22283A]">
          {moneyFormatter(listing.price)}{" "}
          <span className={twMerge("text-app-green", sar.className)}>A</span>
        </h2>
        <div className="grid grid-cols-1 gap-3">
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">
            {listing.name}
          </h1>
          <Ratings rating={4.5} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-1">
        <p className="leading-8 font-medium text-[#1A1A1A]">
          {dict.listingDetail.about}
        </p>
        <p className="text-gray leading-7">{listing.description}</p>
      </div>
    </div>
  );
};

export const Ratings = ({
  rating,
  total,
  hideInfo,
  classNames,
}: {
  rating: number;
  total?: number;
  hideInfo?: boolean;
  classNames?: {
    rating?: string;
    info?: string;
  };
}) => {
  const dict = useDict();
  return (
    <div className="flex items-center gap-1 flex-wrap">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <RatingIcon
            key={index}
            className={twMerge(
              "size-5 text-[#999999]",
              Math.floor(rating) > index && "text-[#FB8A00]",
              classNames?.rating,
            )}
          />
        ))}
      </div>

      {!hideInfo && total ? (
        <div className="flex items-center gap-1">
          <p>{rating}</p>
          <p className="text-gray text-sm leading-6">
            ({total} {dict.listingDetail.reviews.comments})
          </p>
        </div>
      ) : !hideInfo ? (
        <p className={twMerge("", classNames?.info)}>({rating})</p>
      ) : (
        <></>
      )}
    </div>
  );
};
