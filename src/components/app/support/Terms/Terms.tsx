"use client";
import { useLang } from "@/hooks/useLang";
import { SupportPageType, Wrapper } from "../Wrapper";
import { termsAr } from "./terms.ar";
import { termsEn } from "./terms.en";

export const Terms = () => {
  const lang = useLang();
  return (
    <Wrapper variant={SupportPageType.TERMS}>
      <div
        className="grid grid-cols-1 px-[7vw] py-20"
        dangerouslySetInnerHTML={{
          __html: lang === "ar" ? termsAr : termsEn,
        }}
      />
    </Wrapper>
  );
};
