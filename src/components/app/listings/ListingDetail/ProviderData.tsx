import ShowMoreIcon from "@/assets/icons/show.more.svg";
import { Ratings } from "@/components/app/listings/ListingDetail/MainInfo";
import { Button } from "@/components/ui/button";
import { Provider } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import Image from "next/image";

export const ProviderData = ({ provider }: { provider: Provider }) => {
  const dict = useDict();
  return (
    <div className="grid grid-cols-1 gap-6 rounded-[20px] bg-white p-5">
      <p>{dict.listingDetail.serviceProviderData}</p>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <div className="relative size-14 rounded-full">
          <Image
            src={"/images/no.avatar.png"}
            alt="provider"
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-2">
          <p className="text-lg leading-5.25 font-medium text-[#1A1A1A]">
            {provider.name}
          </p>
          <Ratings
            rating={4.5}
            classNames={{
              rating: "size-4",
              info: "text-sm text-gray",
            }}
          />
        </div>
        <Button
          variant={"secondary"}
          className="h-12.5 gap-3 justify-self-start rounded-[20px] px-4!"
        >
          <p className="text-primary text-base font-semibold">
            {dict.listingDetail.contactProvider}
          </p>
          <ShowMoreIcon className="size-5 ltr:rotate-90" />
        </Button>
      </div>
    </div>
  );
};
