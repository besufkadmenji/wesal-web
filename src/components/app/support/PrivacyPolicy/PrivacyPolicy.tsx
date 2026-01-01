"use client";
import { useLang } from "@/hooks/useLang";
import { SupportPageType, Wrapper } from "../Wrapper";
import { privacyEn } from "./priacy.en";
import { privacyAr } from "./privacy.ar";

export const PrivacyPolicy = () => {
  const lang = useLang();
  return (
    <Wrapper variant={SupportPageType.PRIVACY}>
      <div
        className="grid grid-cols-1 px-[7vw] py-20"
        dangerouslySetInnerHTML={{
          __html: lang === "ar" ? privacyAr : privacyEn,
        }}
      />
    </Wrapper>
  );
};
