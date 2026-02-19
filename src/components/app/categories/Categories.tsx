"use client";
import BreadcrumbIcon from "@/assets/icons/breadcrumb.svg";
import CategoryIcon from "@/assets/icons/category.svg";
import ChevronDownIcon from "@/assets/icons/chevron.down.svg";
import {
  CategoryCard,
  CategoryCardSkeleton,
} from "@/components/app/categories/CategoryCard";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { Button } from "@/components/ui/button";
import { useCategories, useSearchCategories } from "@/hooks/useCategories";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import Image from "next/image";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AppPagination } from "../shared/AppPagination";

export const Categories = () => {
  const dict = useDict();
  const { categories, isLoading } = useCategories();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [search, setSearch] = useQueryState("search");
  const [query, setQuery] = useQueryState("query");

  const [localeQuery, setLocaleQuery] = useState(search ?? query ?? "");
  console.log("localeQuery", localeQuery, query);
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
          <CategorySelect />

          <Button
            className="z-10 h-12.5 rounded-[20px] px-16"
            onClick={() => {
              setQuery(localeQuery);
              setSearch(null);
            }}
          >
            {dict.home.hero.search}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-20 px-[7vw] py-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <CategoryCardSkeleton key={index} />
              ))}
            </>
          ) : (
            categories?.items.map((category, index) => (
              <CategoryCard
                key={`${category.id}${index}`}
                category={category}
              />
            ))
          )}
        </div>
        {categories && (
          <AppPagination
            page={categories.meta.page}
            totalPages={categories.meta.totalPages}
            onChange={(page) => setPage(page)}
          />
        )}
      </div>
    </AppWrapper>
  );
};

export const CategorySelect = ({
  onSearch,
  onChange,
}: {
  onSearch?: (search: string) => void;
  onChange?: (query: string) => void;
}) => {
  const dict = useDict();

  const [search, setSearch] = useQueryState("search");
  const [query, setQuery] = useQueryState("query");
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [localeQuery, setLocaleQuery] = useState(search ?? query ?? "");
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <div
        className={twMerge(
          "relative z-10 flex h-14 w-full items-center justify-start gap-2 rounded-[20px] border border-[#F2F2F2] bg-white px-4",
        )}
      >
        <input
          ref={input}
          placeholder={dict.home.hero.selectCategories}
          className="peer h-full w-full ps-10.5 text-sm outline-none lg:text-base"
          value={localeQuery}
          onChange={(e) => {
            setLocaleQuery(e.target.value);
            clearTimeout(timer.current!);
            if (onChange) {
              onChange(e.target.value);
            }
            timer.current = setTimeout(() => {
              setSearch(e.target.value);
            }, 100);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setOpen(false);
              input.current?.blur();

              if (onSearch) {
                onSearch(localeQuery);
                return;
              }
              setQuery(localeQuery);
              setSearch(null);
            }
          }}
          onFocus={() => setOpen(true)}
        />
        <CategoryIcon className="absolute size-6 ltr:left-4 rtl:right-4" />

        <ChevronDownIcon className="absolute size-6 ltr:right-4 rtl:left-4" />
        <CategorySuggestions open={open} />
      </div>
      {open && (
        <div className="fixed inset-0 z-0" onClick={() => setOpen(false)}></div>
      )}
    </>
  );
};

const CategorySuggestions = ({ open }: { open: boolean }) => {
  const { categories } = useSearchCategories();
  const lng = useLang();
  return (
    <div
      className={twMerge(
        "absolute top-14 right-0 left-0 z-10 hidden w-full grid-cols-1 gap-1 overflow-hidden rounded-b-2xl bg-white shadow peer-focus:grid hover:grid",
        open && "grid",
      )}
    >
      {categories?.items.map((category) => (
        <Link
          href={`/listings?category=${category.id}`}
          key={category.id}
          className="hover:text-primary hover:bg-primary/10 px-4 py-2 font-medium text-black"
        >
          {lng === "ar" ? category.nameAr : category.nameEn}
        </Link>
      ))}
    </div>
  );
};
