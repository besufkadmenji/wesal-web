import Image from "next/image";
import ScrollArrow from "@/assets/icons/scroll.arrow.svg";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { Category } from "@/gql/graphql";
import { dataUrl } from "@/config/url";
import { useLang } from "@/hooks/useLang";
import { Skeleton } from "@heroui/react";
import { useRouter } from "next/navigation";

export const CategoryCard = ({ category }: { category: Category }) => {
  const dict = useDict();
  const lng = useLang();
  const router = useRouter();
  return (
    <div className="group grid grid-cols-1 gap-4 rounded-[20px] bg-white">
      <div className="relative h-44 w-full rounded-[20px]">
        <Image
          src={`${dataUrl}/files/${category.image}`}
          alt={category.nameEn}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="grid grid-cols-1 px-3">
        <h3 className="text-lg font-semibold text-black">
          {lng === "en" ? category.nameEn : category.nameAr}
        </h3>
        <p className="text-gray mt-2 line-clamp-2 text-sm leading-6 font-medium">
          {lng === "en" ? category.descriptionEn : category.descriptionAr}
        </p>
        <div className="mt-6 flex items-end">
          <Button
            className="bg-secondary group-hover:bg-primary h-12.5 shrink-0 justify-self-start rounded-[20px] px-6 text-base font-semibold text-[#4D4D4D] transition-colors duration-300 ease-out group-hover:text-white ltr:rounded-br-none group-hover:ltr:rounded-br-[20px] rtl:rounded-bl-none group-hover:rtl:rounded-bl-[20px]"
            onClick={() => {
              router.push(`/listings?category=${category.id}`);
            }}
          >
            {dict.home.popularCategories.viewDetails}
          </Button>
          <div className="relative h-4 grow">
            <ScrollArrow className="text-primary absolute -bottom-[6.5px] z-20 aspect-140/15 h-3.75 grow opacity-0 duration-300 ease-out group-hover:opacity-100 ltr:-left-5 ltr:rotate-180 rtl:-right-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CategoryCardSkeleton = () => {
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
