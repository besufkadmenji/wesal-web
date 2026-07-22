"use client";

import { sar } from "@/assets/fonts/sar";
import { useLang } from "@/hooks/useLang";
import { twMerge } from "tailwind-merge";

export const MoneyValue = ({
  value,
  className,
  amountClassName,
  currencyClassName,
}: {
  value: number;
  className?: string;
  amountClassName?: string;
  currencyClassName?: string;
}) => {
  const lang = useLang();
  const amount = new Intl.NumberFormat(lang === "ar" ? "ar-SA" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return (
    <span
      dir="ltr"
      className={twMerge("flex items-center justify-end gap-1", className)}
    >
      <span
        className={twMerge(
          "text-app-green text-base font-medium",
          sar.className,
          currencyClassName,
        )}
      >
        A
      </span>
      <span
        className={twMerge(
          "text-base leading-8 font-medium text-[#1a1a1a]",
          amountClassName,
        )}
      >
        {amount}
      </span>
    </span>
  );
};
