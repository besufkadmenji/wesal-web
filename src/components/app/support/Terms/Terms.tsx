"use client";
import { GetSettingQuery } from "@/gql/graphql";
import { useLang } from "@/hooks/useLang";
import { SupportPageType, Wrapper } from "../Wrapper";

export const Terms = ({ setting }: { setting: GetSettingQuery["getSetting"] }) => {
  const lang = useLang();
  return (
    <Wrapper variant={SupportPageType.TERMS}>
      <div
        className="prose grid grid-cols-1 px-[7vw] py-20"
        dangerouslySetInnerHTML={{
          __html: lang === "ar" ? setting.termsAr : setting.termsEn,
        }}
      />
    </Wrapper>
  );
};
