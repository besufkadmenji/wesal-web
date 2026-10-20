import { sar } from "@/assets/fonts/sar";
import RatingIcon from "@/assets/icons/rating.svg";
import { TrustedListingsQuery } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { moneyFormatter } from "@/utils/formmater";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type TrustedListing = TrustedListingsQuery["trustedListings"][number];

export const TrustedListingCard = ({
  listing,
  onOpen,
}: {
  listing: TrustedListing;
  onOpen: () => void;
}) => {
  const dict = useDict();
  const photo = [...listing.photos].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  )[0];

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group grid w-full cursor-pointer grid-cols-1 rounded-[20px] bg-white pb-2 text-start select-none"
    >
      <div className="relative aspect-284/180 w-full overflow-hidden rounded-[20px]">
        {photo ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_DATA}/files/${photo.filename}`}
            alt={listing.name}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="size-full bg-[#eff1f6]"
            role="img"
            aria-label={listing.name}
          />
        )}
      </div>
      <div className="grid gap-6 px-3 py-4">
        <div className="grid grid-cols-1 gap-2 border-b border-b-[#F2F2F2] pb-3">
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <p
              dir="auto"
              className="text-page-start line-clamp-1 text-lg font-semibold text-black"
            >
              {listing.name}
            </p>
            <div className="flex items-center gap-0.5">
              <RatingIcon className="size-4 text-[#FB8A00]" />
              <p className="grow text-sm leading-6 font-medium text-black">
                {listing.ratingAverage.toFixed(1)}
              </p>
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <p
              dir="auto"
              className="text-gray text-page-start line-clamp-2 text-sm text-ellipsis"
            >
              {listing.description}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray text-sm font-medium">
            {dict.home.products.price}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-primary text-xl leading-8 font-semibold">
              {moneyFormatter(listing.price)}
            </p>
            <p className={twMerge(sar.className, "text-app-green text-[20px]")}>
              A
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};
