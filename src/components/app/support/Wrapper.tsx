"use client";
import { useDict } from "@/hooks/useDict";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import BreadcrumbIcon from "@/assets/icons/breadcrumb.svg";
export enum SupportPageType {
  CONTACT_US = "contactUs",
  ABOUT = "about",
  FAQ = "faq",
  TERMS = "terms",
  PRIVACY = "privacy",
}

export const Wrapper = ({
  children,
  variant,
}: {
  children: ReactNode;
  variant: SupportPageType;
}) => {
  const dict = useDict();
  console.log("type", variant);
  const title = dict.support[variant]?.title;
  const breadcrumb = dict.support[variant]?.breadcrumb;
  return (
    <div>
      <div className="relative grid h-50 grid-cols-1">
        <Image src={"/images/support.bg.png"} fill alt="Support Background" />
        <div className="z-10 grid h-full w-full auto-rows-max grid-cols-1 content-center gap-4 bg-black/75 px-[7vw]">
          <h1 className="text-3xl font-semibold text-white">{title}</h1>
          <div className="flex items-center gap-2">
            <Link href={"/"} className="text-2xl text-white leading-7">
              {dict.home.nav.home}
            </Link>
            <BreadcrumbIcon className="size-6 ltr:rotate-180" />
            <p className="text-2xl leading-7 text-white opacity-70">{breadcrumb}</p>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};
