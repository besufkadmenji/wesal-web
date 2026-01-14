import { sar } from "@/assets/fonts/sar";
import ArrowLeft from "@/assets/icons/arrow.left.svg";
import ArrowRight from "@/assets/icons/arrow.right.svg";
import DotLine from "@/assets/icons/dot.line.svg";
import RatingIcon from "@/assets/icons/rating.svg";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";
export const TopListing = () => {
  const dict = useDict();
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
    <div className="grid grid-cols-1 gap-6 md:gap-11 overflow-visible bg-[#FBFBFB] py-20">
      <div className="flex justify-between px-[7vw]">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-4">
            <p className="text-app-green text-sm leading-5.25 font-semibold md:text-lg">
              {dict.home.topListing.subtitle}
              <DotLine className="mx-4 inline-block h-5 w-14.5" />
            </p>
          </div>
          <p className="text-primary text-lg md:leading-7.75 font-bold md:text-2xl">
            {dict.home.topListing.title}
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

      <div className="relative w-full ltr:pl-[7vw] rtl:pr-[7vw]">
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
              momentumBounce: false, // IMPORTANT: disables stretch
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
            {[
              ...dict.home.topListing.listings,
              ...dict.home.topListing.listings,
            ].map((category, index) => (
              <SwiperSlide key={index}>
                <ListingCard
                  title={category.name}
                  image={`/images/iphone.jpg`}
                  desc={category.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

const ListingCard = ({
  title,
  image,
  desc,
}: {
  title: string;
  image: string;
  desc: string;
}) => {
  const dict = useDict();
  return (
    <div className="group grid grid-cols-1 rounded-[20px] bg-white pb-2 select-none">
      <div className="relative aspect-284/180 w-full overflow-hidden rounded-[20px]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="grid gap-6 px-3 py-4">
        <div className="grid grid-cols-1 gap-2 border-b border-b-[#F2F2F2] pb-3">
          <div className="grid grid-cols-[1fr_auto]">
            <p className="text-lg font-semibold text-black">{title}</p>
            <div className="flex items-center gap-0.5">
              <RatingIcon className="size-4" />
              <p className="grow text-sm leading-6 font-medium text-black">
                4.5
              </p>
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <p className="text-gray line-clamp-2 text-sm text-ellipsis">
              {desc}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray text-sm font-medium">
            {dict.home.products.price}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-primary text-xl leading-8 font-semibold">
              500.00
            </p>
            <p className={twMerge(sar.className, "text-app-green text-[20px]")}>
              A
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
