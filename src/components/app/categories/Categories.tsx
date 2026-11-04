"use client";
import BreadcrumbIcon from "@/assets/icons/breadcrumb.svg";
import {
  CategoryCard,
  CategoryCardSkeleton,
} from "@/components/app/categories/CategoryCard";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/useCategories";
import { useDict } from "@/hooks/useDict";
import Image from "next/image";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { AppPagination } from "../shared/AppPagination";
import { CategorySelect } from "./CategorySelect";
import { NoCategories } from "./NoCategories";

export const Categories = () => {
  const dict = useDict();
  const { categories, isLoading } = useCategories();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [search, setSearch] = useQueryState("search");
  const [query, setQuery] = useQueryState("query");

  // Mirrors the select's text so the button searches what was typed.
  const [localeQuery, setLocaleQuery] = useState(search ?? query ?? "");
  // ClickUp 869fmned3: a search with no matches left a blank area.
  const isEmpty = !isLoading && !categories?.items.length;
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
        <div className="categorySearch absolute right-0 -bottom-12 left-0 z-10 mx-auto grid w-[calc(100%-2rem)] grid-cols-[1fr_auto] md:w-auto md:min-w-[48vw] items-center justify-center-safe gap-2 justify-self-center rounded-[20px] bg-white p-5">
          <CategorySelect onChange={setLocaleQuery} />

          {/* ClickUp 869fmmby7: no search without text (it showed "null"). */}
          <Button
            className="z-10 h-12.5 rounded-[20px] px-6 md:px-16"
            disabled={!localeQuery.trim()}
            onClick={() => {
              setQuery(localeQuery.trim());
              setSearch(null);
            }}
          >
            {dict.home.hero.search}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-20 px-[7vw] py-20">
        {isEmpty ? (
          <NoCategories />
        ) : (
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
        )}
        {categories && !isEmpty && (
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
