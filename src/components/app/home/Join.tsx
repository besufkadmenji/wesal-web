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
    <div className="grid grid-cols-2 grid-rows-1 gap-6 bg-[#EFF1F6]">
      <div className="grid auto-rows-max grid-cols-1 items-start gap-6 py-10 ltr:pl-[7vw] rtl:pr-[7vw]">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex gap-4">
            <h3 className="text-lg font-semibold text-[#389441]">
              {dict.home.join.subtitle}
            </h3>
            <JoinDot className="w-14" />
          </div>
          <h2 className="text-2xl font-semibold text-black">
            {dict.home.join.title}
          </h2>
          <p className="text-gray text-base leading-7">
            {dict.home.join.description}
          </p>
        </div>
        <div className="relative grid grid-cols-1 gap-4">
          <JoinLine className="absolute top-3 bottom-3 w-px ltr:left-3.25 rtl:right-3.25" />
          {dict.home.join.benefits.map((item, index) => (
            <JoinItem key={index} text={item} />
          ))}
        </div>
        <Button className="mt-0.75 h-12 items-center justify-self-start rounded-[20px] ltr:pr-1! ltr:pl-3! rtl:pr-3! rtl:pl-1!">
          {dict.home.join.cta}
          <span className="text-primary grid size-10 items-center justify-items-center rounded-[16px] bg-[#EFF1F6]">
            <OpenIcon className="size-6" />
          </span>
        </Button>
      </div>
      <div className="relative h-full w-full">
        <Image src={"/images/join.png"} alt="join" fill quality={100} />
      </div>
    </div>
  );
};

const JoinItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-3">
      <CircleIcon className="z-10 size-6.5 shrink-0" />
      <p className="text-lg leading-9 text-black">{text}</p>
    </div>
  );
};
