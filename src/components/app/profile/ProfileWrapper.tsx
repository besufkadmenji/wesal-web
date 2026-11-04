"use client";
import { Nav } from "@/components/app/profile/Nav";
import { SupportPageType, Wrapper } from "@/components/app/support/Wrapper";
import { ReactNode } from "react";
export const ProfileWrapper = ({
  children,
  variant,
}: {
  children: ReactNode;
  variant?: SupportPageType;
}) => {
  return (
    <Wrapper variant={variant ?? SupportPageType.PROFILE}>
      <div className="grid grid-cols-1 items-start gap-8 px-[7vw] py-10 lg:grid-cols-[3fr_8fr] lg:py-20">
        <Nav />
        {children}
      </div>
    </Wrapper>
  );
};
