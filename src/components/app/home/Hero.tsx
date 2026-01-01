import { SmartAnimateText } from "@/components/app/shared/SmartAnimateText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import CategoryIcon from "@/assets/icons/category.svg";
import ChevronDownIcon from "@/assets/icons/chevron.down.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ArrowDownIcon from "@/assets/icons/arrow.down.svg";
import { twMerge } from "tailwind-merge";
export const Hero = () => {
  const dict = useDict();
  const lng = useLang();
  return (
    <div className="mt-10 mb-20 grid grid-cols-1 justify-items-center gap-11">
      <div className="grid grid-cols-1 gap-3">
        <div className="flex flex-wrap items-center gap-3 px-[16vw]">
          <h1
            className={twMerge(
              "relative align-baseline text-5xl leading-13 font-medium text-black",
            )}
          >
            {dict.home.hero.title}
            <SmartAnimateText
              items={dict.home.hero.tags}
              className={twMerge(
                "text-5xl leading-none font-medium text-black",
              )}
              dir={lng === "ar" ? "rtl" : "ltr"}
              classNames={{
                container: "leading-13 h-11 mx-3 items-center",
              }}
            />
          </h1>
        </div>
        <p className="text-gray px-[21vw] text-center text-lg leading-9 font-normal">
          {dict.home.hero.subtitle}
        </p>
      </div>
      <div className="grid w-[48vw] grid-cols-[1fr_auto] items-center gap-2">
        <Select dir={lng === "ar" ? "rtl" : "ltr"}>
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
            <SelectItem value="category1">Category One</SelectItem>
            <SelectItem value="category2">Category Two</SelectItem>
            <SelectItem value="category3">Category Three</SelectItem>
            <SelectItem value="category4">Category Four</SelectItem>
          </SelectContent>
        </Select>
        <Button className="h-12.5 rounded-[20px] px-16">
          {dict.home.hero.search}
        </Button>
      </div>
      <HeroAssets />
    </div>
  );
};

const HeroAssets = () => {
  const dict = useDict();
  return (
    <div className="grid h-129.25 w-full grid-cols-5 grid-rows-1 gap-10 px-10">
      <div className="grid h-full grid-rows-2 gap-4">
        <div className="relative h-full w-full">
          <Image src={"/images/hero.4.png"} alt="hero" fill />
        </div>
        <div className="bg-primary h-full overflow-hidden rounded-[16px] px-4 py-3">
          <p className="line-clamp-7 text-base leading-8 font-medium text-ellipsis text-white">
            {dict.home.hero.heroOptionTwo}
          </p>
        </div>
      </div>
      <div className="relative h-full w-full">
        <Image src={"/images/hero.3.png"} alt="hero" fill />
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-15 pt-10">
        <video
          className="h-80 w-full rounded-[16px] object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="grid justify-items-center gap-3">
          <button
            className="border-primary grid size-14 cursor-pointer items-center justify-items-center rounded-full border"
            onClick={() => {
              window.scrollBy({
                top:( window.innerHeight * 0.8),
                behavior: "smooth",
              });
            }}
          >
            <ArrowDownIcon className="size-6" />
          </button>
          <p>{dict.home.hero.scrollDown}</p>
        </div>
      </div>
      <div className="relative h-full w-full">
        <Image src={"/images/hero.2.png"} alt="hero" fill />
      </div>
      <div className="grid grid-rows-2 gap-4">
        <div className="bg-primary h-full overflow-hidden rounded-[16px] px-4 py-3">
          <p className="line-clamp-7 text-base leading-8 font-medium text-ellipsis text-white">
            {dict.home.hero.heroOptionOne}
          </p>
        </div>
        <div className="relative h-full w-full">
          <Image src={"/images/hero.1.png"} alt="hero" fill />
        </div>
      </div>
    </div>
  );
};
