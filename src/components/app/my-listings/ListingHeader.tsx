import BreadcrumbIcon from "@/assets/icons/breadcrumb.svg";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@/assets/icons/search.svg";
import { Input } from "@heroui/react";
export const ListingHeader = () => {
  const dict = useDict();
  const lng = useLang();
  return (
    <div className="relative grid h-50 grid-cols-1">
      <Image src={"/images/support.bg.png"} fill alt="Support Background" />
      <div className="z-10 grid h-full w-full auto-rows-max grid-cols-1 content-center gap-2 bg-black/75 px-[7vw] lg:gap-4">
        <h1 className="text-2xl font-semibold text-white lg:text-3xl">
          {dict.myListings.title}
        </h1>
        <div className="flex items-center gap-2">
          <Link href={"/"} className="text-xl leading-7 text-white lg:text-2xl">
            {dict.home.nav.home}
          </Link>
          <BreadcrumbIcon className="size-6 ltr:rotate-180" />
          <p className="text-xl leading-7 text-white opacity-70 lg:text-2xl">
            {dict.myListings.title}
          </p>
        </div>
      </div>
      <div className="categorySearch absolute right-0 -bottom-12 left-0 z-10 mx-auto grid min-w-[48vw] grid-cols-[1fr_auto] items-center justify-center-safe gap-2 justify-self-center rounded-[20px] bg-white p-5">
        <Input
          startContent={<SearchIcon className="size-4.5 shrink-0 text-[#999999]" />}
          size="lg"
          className="h-14"
          placeholder={dict.myListings.searchPlaceholder}
          variant="bordered"
          classNames={{
            inputWrapper:
              "bg-white border rounded-[20px] h-14 border-[#F2F2F2]",
            input: "placeholder:text-gray",
          }}
        />
        <Button className="h-12.5 rounded-[20px] px-16" onClick={() => {}}>
          {dict.home.hero.search}
        </Button>
      </div>
    </div>
  );
};
