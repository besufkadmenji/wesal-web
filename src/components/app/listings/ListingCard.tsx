import { sar } from "@/assets/fonts/sar";
import RatingIcon from "@/assets/icons/rating.svg";
import { Listing } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { moneyFormatter } from "@/utils/formmater";
import { Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
export const ListingCard = ({ listing }: { listing: Listing }) => {
  const dict = useDict();
  const pathname = usePathname();
  const imageUrl = `${process.env.NEXT_PUBLIC_DATA}/files/${listing.photos[0].filename}`;
  console.log("imageUrl", pathname, `/${pathname}/${listing.id}`);
  return (
    <Link
      href={`${pathname}/${listing.id}`}
      className="grid w-full cursor-pointer grid-cols-1 rounded-[20px] bg-white"
    >
      <div className="relative h-44 overflow-hidden rounded-[20px]">
        <Image
          src={imageUrl}
          alt={listing.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 px-3 py-4">
        <div className="grid grid-cols-1 gap-2.5">
          <div className="grid grid-cols-[1fr_auto]">
            <p className="line-clamp-1 text-lg font-semibold text-ellipsis text-[#1A1A1A]">
              {listing.name}
            </p>
            <div className="flex items-center gap-1">
              <RatingIcon className="size-4.5 text-[#FB8A00]" />
              <p className="text-sm font-medium text-[#1A1A1A]">0.0</p>
            </div>
          </div>
          <p className="text-gray line-clamp-2 text-sm leading-6 font-medium text-ellipsis">
            {listing.description}
          </p>
        </div>
        <div className="h-px w-full bg-[#F2F2F2]" />
        <div className="flex items-center justify-between">
          <p className="text-gray text-sm font-medium">
            {dict.myListings.card.price}
          </p>
          <div className="flex items-center gap-1">
            <h3 className="text-xl leading-8 font-semibold text-[#22283A]">
              {moneyFormatter(listing.price)}
            </h3>
            <span
              className={twMerge(
                "text-app-green text-xl leading-8 font-semibold",
                sar.className,
              )}
            >
              A
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ListingCardSkeleton = () => {
  return (
    <div className="border-gray-border-alt dark:border-dark-border dark:bg-dark-black grid items-start gap-4 rounded-[20px] border bg-white">
      <div className="bg grid grid-cols-1">
        <Skeleton className="rounded-lg">
          <div className="bg-default-300 h-44 w-full rounded-[20px]" />
        </Skeleton>
        <div className="grid grid-cols-1 gap-2 px-3 py-4">
          <Skeleton className="rounded-lg">
            <div className="bg-default-300 h-5 w-20 rounded-lg" />
          </Skeleton>
          <Skeleton className="w-2/3 justify-self-start rounded-lg">
            <div className="bg-default-300 h-5 w-full rounded-lg" />
          </Skeleton>
          <div className="flex items-center gap-2">
            <Skeleton className="rounded-lg">
              <div className="bg-default-300 h-5 w-16 rounded-lg" />
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="bg-default-300 h-5 w-20 rounded-lg" />
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};
