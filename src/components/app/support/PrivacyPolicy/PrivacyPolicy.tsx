"use client";
import { Setting } from "@/gql/graphql";
import { useLang } from "@/hooks/useLang";
import { SupportPageType, Wrapper } from "../Wrapper";

export const PrivacyPolicy = ({ setting }: { setting: Setting }) => {
  const lang = useLang();
  return (
    <Wrapper variant={SupportPageType.PRIVACY}>
      <div
        className="prose grid grid-cols-1 px-[7vw] py-20"
        dangerouslySetInnerHTML={{
          __html:
            lang === "ar" ? setting.privacyPolicyAr : setting.privacyPolicyEn,
        }}
      />
    </Wrapper>
  );
};
