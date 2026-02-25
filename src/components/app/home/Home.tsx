"use client";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { Hero } from "@/components/app/home/Hero";
import { Trusted } from "@/components/app/home/Trusted";
import { useDict } from "@/hooks/useDict";
import { AdsCarousel } from "./AdsCarousel";
import { Join } from "@/components/app/home/Join";
import { TopListing } from "@/components/app/home/TopListing";
import { ContactUs } from "@/components/app/home/ContactUs";
import { Category } from "@/gql/graphql";

export const Home = ({ categories }: { categories: Category[] }) => {
  const dict = useDict();
  return (
    <AppWrapper>
      <div className="grid grid-cols-1">
        <Hero />
        <AdsCarousel
          title={dict.home.popularCategories.title}
          subtitle={dict.home.popularCategories.subtitle}
          categories={categories}
        />
        <Trusted />
        <AdsCarousel
          title={dict.home.bestSelling.title}
          subtitle={dict.home.bestSelling.subtitle}
          categories={categories}
        />
        <Join />
        <TopListing />
        <ContactUs />
      </div>
    </AppWrapper>
  );
};
