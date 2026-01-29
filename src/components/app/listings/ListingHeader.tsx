import BreadcrumbIcon from "@/assets/icons/breadcrumb.svg";
import { useCategory } from "@/components/app/listings/useListings";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { Skeleton } from "@heroui/react";
export const ListingHeader = () => {
  const dict = useDict();
  const lng = useLang();
  const [categoryId, setCategoryId] = useQueryState("category");
  const { category } = useCategory(categoryId || undefined);

  const router = useRouter();
  useEffect(() => {
    if (!categoryId) {
      router.push("/categories");
    }
  }, [categoryId, router]);

  return (
    <div className="relative grid h-50 grid-cols-1">
      <Image src={"/images/support.bg.png"} fill alt="Support Background" />
      <div className="z-10 grid h-full w-full auto-rows-max grid-cols-1 content-center gap-2 bg-black/75 px-[7vw] lg:gap-4">
        {!category ? (
          <Skeleton className="bg-background w-20 rounded-lg">
            <div className="h-6 w-20 rounded-[20px]" />
          </Skeleton>
        ) : (
          <h1 className="text-2xl font-semibold text-white lg:text-3xl">
            {lng === "en" ? category?.nameEn || "" : category?.nameAr || ""}
          </h1>
        )}
        <div className="flex items-center gap-2">
          <Link href={"/categories"} className="text-xl leading-7 text-white lg:text-2xl">
            {dict.listing.sections}
          </Link>
          <BreadcrumbIcon className="size-6 ltr:rotate-180" />
          {!category ? (
            <Skeleton className="bg-background w-20 rounded-lg">
              <div className="h-6 w-20 rounded-[20px]" />
            </Skeleton>
          ) : (
            <p className="text-xl leading-7 text-white opacity-70 lg:text-2xl">
              {lng === "en" ? category?.nameEn || "" : category?.nameAr || ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
