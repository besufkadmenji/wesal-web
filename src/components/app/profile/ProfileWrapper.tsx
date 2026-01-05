"use client";
import { Nav } from "@/components/app/profile/Nav";
import { SupportPageType, Wrapper } from "@/components/app/support/Wrapper";
import { ReactNode } from "react";
export const ProfileWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper variant={SupportPageType.PROFILE}>
      <div className="grid grid-cols-[3fr_8fr] items-start gap-8 px-[7vw] py-20">
        <Nav />
        {children}
      </div>
    </Wrapper>
  );
};
