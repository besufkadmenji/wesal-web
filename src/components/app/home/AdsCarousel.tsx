import ArrowLeft from "@/assets/icons/arrow.left.svg";
import ArrowRight from "@/assets/icons/arrow.right.svg";
import DotLine from "@/assets/icons/dot.line.svg";
import ScrollArrow from "@/assets/icons/scroll.arrow.svg";
import { Button } from "@/components/ui/button";
import { Category } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { dataUrl } from "@/config/url";
import { useAppRouter } from "@/hooks/use.app.router";

export const AdsCarousel = ({
  title,
  subtitle,
  categories,
}: {
  title: string;
  subtitle: string;
  categories: Category[];
}) => {
  const dict = useDict();
  const lng = useLang();
  const router = useAppRouter();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);
  useEffect(() => {
    if (!swiper) return;

    const update = () => {
      setCanPrev(!swiper.isBeginning);
      setCanNext(!swiper.isEnd);
    };

    swiper.on("reachBeginning", update);
    swiper.on("reachEnd", update);
    swiper.on("fromEdge", update);

    return () => {
      swiper.off("reachBeginning", update);
      swiper.off("reachEnd", update);
      swiper.off("fromEdge", update);
    };
  }, [swiper]);
  return (
    <div className="grid grid-cols-1 gap-11 overflow-visible bg-[#FBFBFB] py-20">
      <div className="flex justify-between px-[7vw]">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-4">
            <p className="text-app-green text-base leading-5.25 font-semibold md:text-lg">
              {subtitle}
              <DotLine className="mx-1 inline-block h-5 w-14.5 md:mx-4" />
            </p>
          </div>
          <p className="text-primary text-lg leading-6 font-bold md:text-2xl md:leading-7.75">
            {title}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              swiper?.slidePrev();
            }}
            className="size-10! rounded-[12px] rtl:rotate-180"
            disabled={!canPrev}
          >
            <ArrowLeft className="size-6" />
          </Button>
          <Button
            onClick={() => {
              swiper?.slideNext();
            }}
            variant={"secondary"}
            className="size-10! rounded-[12px] rtl:rotate-180"
            disabled={!canNext}
          >
            <ArrowRight className="size-6" />
          </Button>
        </div>
      </div>

      <div className="block h-100 w-full ltr:pl-[7vw] rtl:pr-[7vw]">
        {mounted && (
          <Swiper
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              600: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Mousewheel, FreeMode]}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumBounce: false,
            }}
            mousewheel={{ forceToAxis: true }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(instance) => {
              setSwiper(instance);
              setCanPrev(!instance.isBeginning);
              setCanNext(!instance.isEnd);
            }}
            slidesOffsetAfter={window.innerWidth * 0.07}
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <CategoryCard
                  title={lng === "ar" ? category.nameAr : category.nameEn}
                  image={`${dataUrl}/files/${category.image}`}
                  desc={
                    lng === "ar"
                      ? category.descriptionAr
                      : category.descriptionEn
                  }
                  onClick={() => {
                    router.push(`/listings?category=${category.id}`);
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

const CategoryCard = ({
  title,
  image,
  desc,
  onClick,
}: {
  title: string;
  image: string;
  desc: string;
  onClick: () => void;
}) => {
  const dict = useDict();
  return (
    <div className="group mb-2 grid grid-cols-1 gap-4 rounded-[20px] bg-white select-none">
      <div className="relative aspect-284/180 w-full overflow-hidden rounded-[20px]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-2 px-3">
          <p className="line-clamp-1 text-lg font-semibold text-ellipsis text-black">
            {title}
          </p>
          <div className="w-full overflow-hidden">
            <p className="text-gray line-clamp-2 text-sm text-ellipsis">
              {desc}
            </p>
          </div>
        </div>
        <div className="flex items-end">
          <Button
            className="bg-secondary group-hover:bg-primary h-12.5 shrink-0 justify-self-start rounded-[20px] px-6 text-base font-semibold text-[#4D4D4D] transition-colors duration-300 ease-out group-hover:text-white ltr:rounded-br-none group-hover:ltr:rounded-br-[20px] rtl:rounded-bl-none group-hover:rtl:rounded-bl-[20px]"
            onClick={onClick}
          >
            {dict.home.popularCategories.viewDetails}
          </Button>
          <div className="relative h-4 grow">
            <ScrollArrow className="text-primary absolute -bottom-[6.5px] z-20 aspect-170/15 h-3.75 max-w-full grow opacity-0 duration-300 ease-out group-hover:opacity-100 ltr:-left-5 ltr:rotate-180 rtl:-right-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
