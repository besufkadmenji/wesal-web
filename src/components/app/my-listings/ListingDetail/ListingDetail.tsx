"use client";
import { useListing } from "@/components/app/my-listings/ListingDetail/useListing";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { DetailSkeleton } from "./DetailSkeleton";
import { MainInfo } from "@/components/app/my-listings/ListingDetail/MainInfo";
import { ListingImages } from "./ListingImages";
import { StoryVideo } from "@/components/app/my-listings/ListingDetail/StoryVideo";
import EditAdIcon from "@/assets/icons/edit.svg";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { Reviews } from "@/components/app/my-listings/ListingDetail/Reviews";

export const ListingDetail = () => {
  const { listing, isLoading } = useListing();
  const dict = useDict();
  return (
    <AppWrapper>
      {isLoading || !listing ? (
        <DetailSkeleton />
      ) : (
        <div className="grid auto-rows-max grid-cols-1 items-start gap-20 px-[7vw] py-10">
          <div className="grid grid-cols-2 items-start gap-10">
            <ListingImages listing={listing} />
            <MainInfo listing={listing} />
          </div>
          <div className="grid grid-cols-2 items-start gap-10">
            <Reviews />
            <div className="grid grid-cols-1 gap-10">
              <StoryVideo listing={listing} />
              <Button
                variant={"secondary"}
                className="h-12.5 gap-3 justify-self-center rounded-[20px] px-4!"
              >
                <p className="text-primary text-base font-semibold">
                  {dict.listingDetail.editAdData}
                </p>
                <EditAdIcon className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppWrapper>
  );
};
