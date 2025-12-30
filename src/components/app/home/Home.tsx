"use client";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { Hero } from "@/components/app/home/Hero";
import { Trusted } from "@/components/app/home/Trusted";
import { useDict } from "@/hooks/useDict";
import { AdsCarousel } from "./AdsCarousel";
import { Join } from "@/components/app/home/Join";
import { TopListing } from "@/components/app/home/TopListing";

export const Home = () => {
  const dict = useDict();
  return (
    <AppWrapper>
      <div className="grid grid-cols-1 py-10">
        <Hero />
        <AdsCarousel
          title={dict.home.popularCategories.title}
          subtitle={dict.home.popularCategories.subtitle}
          items={dict.home.popularCategories.categories}
        />
        <Trusted />
        <AdsCarousel
          title={dict.home.bestSelling.title}
          subtitle={dict.home.bestSelling.subtitle}
          items={dict.home.bestSelling.categories}
        />
        <Join />
        <TopListing />
      </div>
    </AppWrapper>
  );
};
