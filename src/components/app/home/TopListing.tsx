import ArrowLeft from "@/assets/icons/arrow.left.svg";
import ArrowRight from "@/assets/icons/arrow.right.svg";
import DotLine from "@/assets/icons/dot.line.svg";
import { TrustedListingCard } from "@/components/app/home/TrustedListingCard";
import {
  TrustedGateMode,
  TrustedListingGate,
} from "@/components/app/home/TrustedListingGate";
import { Button } from "@/components/ui/button";
import { useAppRouter } from "@/hooks/use.app.router";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { useTrustedListings } from "@/hooks/useTrustedListings";
import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

/** Trusted advertisers carousel: one ad per Trust-badge provider. */
export const TopListing = () => {
  const dict = useDict();
  const lang = useLang();
  const router = useAppRouter();
  const { me } = useMe();
  const { listings } = useTrustedListings();
  const [gate, setGate] = useState<TrustedGateMode | null>(null);
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

  const open = (listingId: string) => {
    if (me?.user) {
      router.push(`/${lang}/listings/${listingId}`);
    } else {
      setGate(me?.provider ? "be-customer" : "login");
    }
  };

  // Q-H2 default: nothing to show without Trust-badge providers.
  if (listings.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 overflow-visible bg-[#FBFBFB] py-20 md:gap-11">
      <div className="flex justify-between px-[7vw]">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-4">
            <p className="text-app-green text-sm leading-5.25 font-semibold md:text-lg">
              {dict.home.topListing.subtitle}
              <DotLine className="mx-4 inline-block h-5 w-14.5" />
            </p>
          </div>
          <p className="text-primary text-lg font-bold md:text-2xl md:leading-7.75">
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
            onSwiper={(instance) => {
              setSwiper(instance);
              setCanPrev(!instance.isBeginning);
              setCanNext(!instance.isEnd);
            }}
            slidesOffsetAfter={window.innerWidth * 0.07}
          >
            {listings.map((listing) => (
              <SwiperSlide key={listing.id}>
                <TrustedListingCard
                  listing={listing}
                  onOpen={() => open(listing.id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <TrustedListingGate mode={gate} onClose={() => setGate(null)} />
    </div>
  );
};
