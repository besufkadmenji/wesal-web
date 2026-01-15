"use client";
import BreadcrumbIcon from "@/assets/icons/breadcrumb.svg";
import CategoryIcon from "@/assets/icons/category.svg";
import ChevronDownIcon from "@/assets/icons/chevron.down.svg";
import { ListingCard } from "@/components/app/categories/ListingCard";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { AppPagination } from "../shared/AppPagination";
import { listings } from "./listings";

export const Categories = () => {
  const dict = useDict();
  const lng = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const { categories } = useCategories();
  const [category, setCategory] = useQueryState("category");
  return (
    <AppWrapper>
      <div className="relative grid h-50 grid-cols-1">
        <Image src={"/images/support.bg.png"} fill alt="Support Background" />
        <div className="z-10 grid h-full w-full auto-rows-max grid-cols-1 content-center gap-2 bg-black/75 px-[7vw] lg:gap-4">
          <h1 className="text-2xl font-semibold text-white lg:text-3xl">
            {dict.categories.title}
          </h1>
          <div className="flex items-center gap-2">
            <Link
              href={"/"}
              className="text-xl leading-7 text-white lg:text-2xl"
            >
              {dict.home.nav.home}
            </Link>
            <BreadcrumbIcon className="size-6 ltr:rotate-180" />
            <p className="text-xl leading-7 text-white opacity-70 lg:text-2xl">
              {dict.categories.title}
            </p>
          </div>
        </div>
        <div className="categorySearch absolute right-0 -bottom-12 left-0 z-10 mx-auto grid min-w-[48vw] grid-cols-[1fr_auto] items-center justify-center-safe gap-2 justify-self-center rounded-[20px] bg-white p-5">
          <Select
            dir={lng === "ar" ? "rtl" : "ltr"}
            disabled={categories?.items.length === 0}
            value={category || undefined}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger
              className="flex h-14! w-full justify-start gap-2 rounded-[20px] bg-white px-4 shadow-none! ring-0!"
              icon={<ChevronDownIcon className="size-6" />}
            >
              <CategoryIcon />
              <div className="placeholder:text-gray flex grow justify-start text-sm leading-6">
                <SelectValue placeholder={dict.home.hero.selectCategories} />
              </div>
            </SelectTrigger>
            <SelectContent>
              {categories?.items.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {lng === "ar" ? category.nameAr : category.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="h-12.5 rounded-[20px] px-16" onClick={() => {}}>
            {dict.home.hero.search}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-20 px-[7vw] py-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...listings, ...listings].map((listing, index) => (
            <ListingCard key={`${listing.id}${index}`} {...listing} />
          ))}
        </div>
        <AppPagination />
      </div>
    </AppWrapper>
  );
};
