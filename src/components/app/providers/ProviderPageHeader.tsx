"use client";

import BreadcrumbIcon from "@/assets/icons/breadcrumb.svg";
import { useDict } from "@/hooks/useDict";
import Image from "next/image";
import Link from "next/link";
import { useQueryState } from "nuqs";

/** Banner and breadcrumb; from Favorites it leads back there (design). */
export const ProviderPageHeader = () => {
  const dict = useDict();
  const [from] = useQueryState("from");
  const fromFavorites = from === "favorites";

  return (
    <div className="relative grid h-50 grid-cols-1">
      <Image src={"/images/support.bg.png"} fill alt="" />
      <div className="z-10 grid h-full w-full auto-rows-max grid-cols-1 content-center gap-2 bg-black/75 px-[7vw] lg:gap-4">
        <h1 className="text-2xl font-semibold text-white lg:text-3xl">
          {dict.providerPage.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={fromFavorites ? "/profile/favorites" : "/"}
            className="text-xl leading-7 text-white lg:text-2xl"
          >
            {fromFavorites ? dict.profile.favorites : dict.home.nav.home}
          </Link>
          <BreadcrumbIcon className="size-6 ltr:rotate-180" />
          <p className="text-xl leading-7 text-white opacity-70 lg:text-2xl">
            {dict.providerPage.title}
          </p>
        </div>
      </div>
    </div>
  );
};
