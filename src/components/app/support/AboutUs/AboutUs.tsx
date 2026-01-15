"use client";
import { useDict } from "@/hooks/useDict";
import { Trusted } from "../../home/Trusted";
import { SupportPageType, Wrapper } from "../Wrapper";
import AboutDot from "@/assets/icons/about.dot.svg";
import Image from "next/image";
import JoinLine from "@/assets/icons/join.line.svg";
import { JoinItem } from "@/components/app/home/Join";

export const AboutUs = () => {
  const dict = useDict();
  return (
    <Wrapper variant={SupportPageType.ABOUT}>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 px-[7vw] py-20">
        <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-8">
          <div className="grid grid-cols-1 justify-items-start gap-4">
            <div className="flex items-center justify-center gap-4">
              <h3 className="text-app-green text-lg font-semibold">
                {dict.support.about.aboutSubtitle}
              </h3>
              <AboutDot className="w-14.5" />
            </div>
            <h2 className="text-2xl font-semibold text-black max-w-2xl">
              {dict.support.about.aboutTitle}
            </h2>
          </div>
          <div className="relative h-full w-full overflow-hidden rounded-[20px]">
            <Image
              src={"/images/about.banner.jpg"}
              fill
              alt="About Us Banner"
              className="object-cover"
            />
          </div>
        </div>
        <div className="grid auto-rows-max grid-cols-1 items-start gap-4">
          <div className="grid grid-cols-2 gap-5">
            <div className="relative aspect-288/172 w-full overflow-hidden rounded-[20px]">
              <Image src={"/images/about.1.jpg"} alt="about 1" fill />
            </div>
            <div className="relative aspect-288/172 w-full overflow-hidden rounded-[20px]">
              <Image src={"/images/about.2.jpg"} alt="about 2" fill />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <p className="text-gray text-base leading-7 text-justify">
              {dict.support.about.descriptionOne}
            </p>
            <p className="text-gray text-base leading-7 text-justify">
              {dict.support.about.descriptionTwo}
            </p>
          </div>
          <div className="relative grid grid-cols-1 gap-4">
            <JoinLine className="absolute top-3 h-[calc(100%-1.5rem)] ltr:left-3.25 rtl:right-3.25" />
            {dict.home.join.benefits.map((item, index) => (
              <JoinItem key={index} text={item} />
            ))}
          </div>
        </div>
      </div>
      <Trusted />
    </Wrapper>
  );
};
