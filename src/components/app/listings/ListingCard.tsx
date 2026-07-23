import { sar } from "@/assets/fonts/sar";
import RatingIcon from "@/assets/icons/rating.svg";
import { Listing } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { moneyFormatter } from "@/utils/formmater";
import { Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { PromotionStatus } from "@/gql/graphql";
import { StatusBadge } from "@/components/app/shared/ParticipantUI";

export const ListingCard = ({
  listing,
  action,
}: {
  listing: Listing;
  action?: ReactNode;
}) => {
  const dict = useDict();
  const pathname = usePathname();
  const firstPhoto = listing.photos[0];

  return (
    <article className="grid w-full grid-cols-1 overflow-hidden rounded-[20px] bg-white">
      <Link href={`${pathname}/${listing.id}`} className="grid cursor-pointer">
        <div className="relative h-44 overflow-hidden rounded-[20px]">
          {firstPhoto ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_DATA}/files/${firstPhoto.filename}`}
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
          {listing.promotionStatus !== PromotionStatus.None && (
            <StatusBadge
              status={listing.promotionStatus}
              className="absolute start-3 top-3"
            />
          )}
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
      {action && <div className="px-3 pb-4">{action}</div>}
    </article>
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
