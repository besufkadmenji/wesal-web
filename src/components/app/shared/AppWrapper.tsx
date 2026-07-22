"use client";
import { TopBar } from "./TopBar";
import { Header } from "@/components/app/shared/Header";
import { Footer } from "@/components/app/shared/Footer";
import { twMerge } from "tailwind-merge";

type WrapperProps = {
  noFooter?: boolean;
  noHeader?: boolean;
  noTopBar?: boolean;
  children: React.ReactNode;
  className?: string;
};

export const AppWrapper = ({
  children,
  noFooter,
  noHeader,
  noTopBar,
  className,
}: WrapperProps) => {
  return (
    <div className={twMerge("grid grid-cols-1 overflow-x-hidden", className)}>
      {!noTopBar && <TopBar />}
      {!noHeader && <Header />}
      {children}
      {!noFooter && <Footer />}
    </div>
  );
};
