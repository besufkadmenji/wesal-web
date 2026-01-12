import Image from "next/image";
import ScrollArrow from "@/assets/icons/scroll.arrow.svg";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";

export const ListingCard = ({
  id,
  title,
  description,
  category,
  imageUrl,
}: {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}) => {
  const dict = useDict();
  return (
    <div className="group grid grid-cols-1 gap-4 rounded-[20px] bg-white">
      <div className="relative h-44 w-full rounded-[20px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="grid grid-cols-1">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p className="text-gray mt-2 line-clamp-2 text-sm leading-6 font-medium">
          {description}
        </p>
        <div className="mt-6 flex items-end">
          <Button className="bg-secondary group-hover:bg-primary h-12.5 shrink-0 justify-self-start rounded-[20px] px-6 text-base font-semibold text-[#4D4D4D] transition-colors duration-300 ease-out group-hover:text-white ltr:rounded-br-none group-hover:ltr:rounded-br-[20px] rtl:rounded-bl-none group-hover:rtl:rounded-bl-[20px]">
            {dict.home.popularCategories.viewDetails}
          </Button>
          <div className="relative h-4 grow">
            <ScrollArrow className="text-primary absolute -bottom-[6.5px] z-20 aspect-170/15 h-3.75 grow opacity-0 duration-300 ease-out group-hover:opacity-100 ltr:-left-5 ltr:rotate-180 rtl:-right-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
