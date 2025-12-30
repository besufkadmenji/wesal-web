import { monoton } from "@/assets/fonts/monoton";
import TrustedDot from "@/assets/icons/trusted.dot.svg";
import CountUp from "@/components/CountUp";
import { useDict } from "@/hooks/useDict";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const Trusted = () => {
  const dict = useDict();
  return (
    <div className="relative grid h-118.5 w-full px-[15vw]">
      <Image
        src={"/images/trusted.svg"}
        alt="Trusted"
        className="w-full object-cover"
        fill
      />
      <div className="z-10 grid auto-rows-max grid-cols-1 items-start justify-items-center py-20">
        <div className="flex justify-center gap-4">
          <TrustedDot className="w-14.5" />
          <h2 className="text-lg font-semibold text-[#389441]">
            {dict.home.trusted.subtitle}
          </h2>
          <TrustedDot className="w-14.5" />
        </div>
        <h1 className="mt-4 text-4xl font-semibold text-black">
          {dict.home.trusted.title}
        </h1>
        <p className="text-gray mt-6 text-center text-xl leading-9">
          {dict.home.trusted.description}
        </p>
        <div className="mt-8 flex items-center gap-20">
          {dict.home.trusted.stats.map((stat) => (
            <StatItem key={stat.label} label={stat.label} value={stat.number} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-3">
      <CountUp
        from={0}
        to={Number(value.replace(/,/g, ""))}
        separator=","
        direction="up"
        duration={1}
        delay={.2}
        className={twMerge(
          monoton.className,
          "text-4xl text-[#389441] ltr:before:content-['+'] rtl:after:content-['+']",
          "count-up-text",
        )}
      />
      <p className="text-gray text-base leading-8 font-medium">{label}</p>
    </div>
  );
};
