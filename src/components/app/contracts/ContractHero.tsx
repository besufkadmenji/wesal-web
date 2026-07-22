"use client";

import BreadcrumbIcon from "@/assets/icons/breadcrumb.svg";
import { useDict } from "@/hooks/useDict";
import Image from "next/image";
import Link from "next/link";

export const ContractHero = ({
  title,
  conversationId,
  breadcrumbHref,
  breadcrumbLabel,
}: {
  title: string;
  conversationId?: string;
  breadcrumbHref?: string;
  breadcrumbLabel?: string;
}) => {
  const dict = useDict();
  return (
    <div className="relative grid h-50 grid-cols-1">
      <Image src="/images/support.bg.png" fill alt="" />
      <div className="z-10 grid h-full w-full auto-rows-max grid-cols-1 content-center gap-4 bg-black/75 px-[7vw]">
        <h1 className="text-2xl font-semibold text-white lg:text-3xl">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <Link
            href={
              breadcrumbHref ??
              (conversationId
                ? `/conversations/${conversationId}`
                : "/conversations")
            }
            className="text-xl leading-7 text-white lg:text-2xl"
          >
            {breadcrumbLabel ?? dict.contracts.breadcrumbConversation}
          </Link>
          <BreadcrumbIcon className="size-6 ltr:rotate-180" />
          <p className="text-xl leading-7 text-white opacity-70 lg:text-2xl">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};
