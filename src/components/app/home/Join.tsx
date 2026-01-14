import Image from "next/image";
import JoinDot from "@/assets/icons/join.dot.svg";
import { useDict } from "@/hooks/useDict";
import CircleIcon from "@/assets/icons/check.circle.green.svg";
import JoinLine from "@/assets/icons/join.line.svg";
import OpenIcon from "@/assets/icons/open.svg";
import { Button } from "@/components/ui/button";
export const Join = () => {
  const dict = useDict();
  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-6 bg-[#EFF1F6] xl:grid-cols-2">
      <div className="grid auto-rows-max grid-cols-1 items-start gap-6 px-4 py-10 sm:px-8 xl:ltr:pl-[7vw] xl:rtl:pr-[7vw]">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-2 md:gap-4">
            <h2 className="text-app-green text-xs font-semibold sm:text-base lg:text-lg">
              {dict.home.join.subtitle}
            </h2>
            <JoinDot className="w-10 md:w-14" />
          </div>
          <h2 className="text-lg font-semibold text-black md:text-2xl">
            {dict.home.join.title}
          </h2>
          <p className="text-gray text-sm md:leading-7 md:text-base">
            {dict.home.join.description}
          </p>
        </div>
        <div className="relative grid grid-cols-1 gap-4">
          <JoinLine className="absolute top-3 h-[calc(100%-1.5rem)] ltr:left-3.25 rtl:right-3.25" />
          {dict.home.join.benefits.map((item, index) => (
            <JoinItem key={index} text={item} />
          ))}
        </div>
        <Button className="mt-0.75 h-12 items-center justify-self-start rounded-[20px] ltr:pr-1! ltr:pl-3! rtl:pr-3! rtl:pl-1!">
          {dict.home.join.cta}
          <span className="text-primary grid size-10 items-center justify-items-center rounded-[16px] bg-[#EFF1F6]">
            <OpenIcon className="size-6 ltr:rotate-90" />
          </span>
        </Button>
      </div>
      <div className="relative h-100 w-full xl:aspect-auto xl:h-full">
        <Image
          src={"/images/join.png"}
          alt="join"
          fill
          quality={100}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export const JoinItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 shrink-0 items-center justify-items-center">
        <CircleIcon className="z-10 size-6.5" />
      </div>
      <p className="text-sm text-black sm:text-base md:text-lg md:leading-9">
        {text}
      </p>
    </div>
  );
};
