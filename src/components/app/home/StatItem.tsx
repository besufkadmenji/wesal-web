import { monoton } from "@/assets/fonts/monoton";
import CountUp from "@/components/CountUp";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const StatItem = ({ label, value }: { label: string; value: number }) => {
  // Live updates count on from the number already shown, not from zero.
  const [shown, setShown] = useState(0);
  return (
    <div className="grid grid-cols-1 justify-items-center gap-3">
      <CountUp
        from={shown}
        to={value}
        separator=","
        direction="up"
        duration={1}
        delay={0.2}
        onEnd={() => setShown(value)}
        className={twMerge(
          monoton.className,
          "text-app-green text-2xl md:text-4xl ltr:before:content-['+'] rtl:after:content-['+']",
          "count-up-text",
        )}
      />
      <p className="text-gray text-sm text-center font-medium md:text-base md:leading-8">
        {label}
      </p>
    </div>
  );
};
