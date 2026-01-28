import { Listing, ListingMedia } from "@/gql/graphql";
import Image from "next/image";
import { useState } from "react";
import { dataUrl } from "@/config/url";
import ViewAllIcon from "@/assets/icons/view.all.svg";
import { useDict } from "@/hooks/useDict";
export const ListingImages = ({ listing }: { listing: Listing }) => {
  const [image, setImage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const images = listing.photos || [];
  return (
    <div className="grid grid-cols-1 gap-3 rounded-[20px] bg-white">
      <div className="relative aspect-584/468 w-full overflow-hidden rounded-[24px]">
        <Image
          src={`${dataUrl}/files/${images[image].filename}`}
          alt="listing image"
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images
          .slice(0, showAll ? images.length : Math.min(4, images.length))
          .map((img, index) => (
            <ImageItem
              key={index}
              image={img}
              onClick={() => {
                if (index === 3 && images.length > 4 && !showAll) {
                  setShowAll(true);
                  return;
                }
                return setImage(index);
              }}
              isActive={index === image}
              showViewAll={index === 3 && images.length > 4 && !showAll}
            />
          ))}
      </div>
    </div>
  );
};

const ImageItem = ({
  image,
  onClick,
  isActive,
  showViewAll = false,
}: {
  image: ListingMedia;
  onClick: () => void;
  isActive: boolean;
  showViewAll?: boolean;
}) => {
  const dict = useDict();
  return (
    <div
      className="relative grid aspect-137/130 w-full cursor-pointer items-center justify-items-center overflow-hidden rounded-[24px]"
      onClick={onClick}
    >
      <Image
        src={`${dataUrl}/files/${image.filename}`}
        alt="listing image"
        fill
        className="object-cover"
      />
      {!isActive && <div className="absolute h-full w-full bg-[#00000099]" />}
      {showViewAll && (
        <div className="absolute m-auto grid justify-items-center gap-2">
          <ViewAllIcon className="size-6" />
          <p className="text-sm leading-6 font-medium text-white">
            {dict.listingDetail.viewAll}
          </p>
        </div>
      )}
    </div>
  );
};
