import NoListingIcon from "@/assets/icons/no.listings.svg";
import { useDict } from "@/hooks/useDict";
export const NoListing = () => {
  const dict = useDict();
  return (
    <div className="grid justify-items-center gap-8 py-20">
      <NoListingIcon className="size-44" />
      <div className="grid justify-items-center gap-2">
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">
          {dict.myListings.empty.title}
        </h1>
        <p className="text-gray text-lg leading-9">
          {dict.myListings.empty.description}
        </p>
      </div>
    </div>
  );
};
