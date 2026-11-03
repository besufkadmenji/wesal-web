import NoListingIcon from "@/assets/icons/no.listings.svg";
import { useDict } from "@/hooks/useDict";

/** Shown when a categories search matches nothing (ClickUp 869fmned3). */
export const NoCategories = () => {
  const dict = useDict();
  return (
    <div className="grid justify-items-center gap-8 py-10">
      <NoListingIcon className="size-44" />
      <div className="grid justify-items-center gap-2">
        <h2 className="text-2xl font-semibold text-[#1A1A1A]">
          {dict.categories.empty.title}
        </h2>
        <p className="text-gray px-4 text-center text-lg leading-9 md:px-20">
          {dict.categories.empty.description}
        </p>
      </div>
    </div>
  );
};
