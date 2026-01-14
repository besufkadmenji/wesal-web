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
import { useCategories } from "@/hooks/useCategories";
import { useQueryState } from "nuqs";
import { usePathname, useRouter } from "next/navigation";
export const Hero = () => {
  const dict = useDict();
  const lng = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const { categories } = useCategories();
  const [category, setCategory] = useQueryState("category");
  return (
    <div className="mt-10 mb-20 grid grid-cols-1 justify-items-center gap-11">
      <div className="grid grid-cols-1 gap-3">
        <div className="flex flex-wrap items-center justify-center gap-3 px-3 sm:px-[12vw] md:px-8 lg:justify-start lg:px-[14vw] xl:px-[12vw] 2xl:px-[16vw]">
          <h1
            className={twMerge(
              "md:3xl relative grid align-baseline text-lg leading-5.5 sm:leading-8 font-medium text-black sm:text-2xl md:inline-block lg:text-4xl xl:text-5xl xl:leading-13",
            )}
          >
            {dict.home.hero.title}
            <br className="hidden md:block lg:hidden 2xl:block" />
            <SmartAnimateText
              items={dict.home.hero.tags}
              className={twMerge(
                "text-lg leading-none font-medium text-black sm:text-2xl lg:text-4xl xl:text-5xl",
              )}
              dir={lng === "ar" ? "rtl" : "ltr"}
              classNames={{
                container:
                  "xl:leading-13 lg:leading-11 md:3xl  lg:h-8 xl:h-11 lg:mx-3 2xl:mx-0 items-center md:leading-9 md:h-4.5 h-3 leading-9",
              }}
            />
          </h1>
        </div>
        <p className="text-gray mt-3 px-4 text-start text-sm leading-5 font-normal sm:px-[12vw] md:mt-0 md:text-center md:text-lg md:leading-8 lg:px-[14vw] xl:px-[21vw]">
          {dict.home.hero.subtitle}
        </p>
      </div>
      <div className="grid w-full grid-cols-[1fr_auto] items-center gap-2 px-8 md:w-[48vw]">
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
        <Button
          className="h-12.5 rounded-[20px] md:px-16"
          onClick={() => {
            router.push(`${pathname}/categories?category=${category}`);
          }}
        >
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
    <div className="grid h-129.25 w-full grid-cols-1 grid-rows-1 gap-10 px-10 md:grid-cols-3 xl:grid-cols-5">
      <div className="hidden h-full grid-rows-2 gap-4 md:grid">
        <div className="relative h-full w-full">
          <Image src={"/images/hero.4.png"} alt="hero" fill />
        </div>
        <div className="bg-primary h-full overflow-hidden rounded-[16px] px-4 py-3">
          <p className="line-clamp-7 text-base leading-8 font-medium text-ellipsis text-white">
            {dict.home.hero.heroOptionTwo}
          </p>
        </div>
      </div>
      <div className="relative hidden h-full w-full xl:block">
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
                top: window.innerHeight * 0.8,
                behavior: "smooth",
              });
            }}
          >
            <ArrowDownIcon className="size-6" />
          </button>
          <p>{dict.home.hero.scrollDown}</p>
        </div>
      </div>
      <div className="relative hidden h-full w-full xl:block">
        <Image src={"/images/hero.2.png"} alt="hero" fill />
      </div>
      <div className="hidden grid-rows-2 gap-4 md:grid">
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
