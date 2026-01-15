import Image from "next/image";
import { ReactNode } from "react";
import LogoIcon from "@/assets/icons/logo.svg";
import { useDict } from "@/hooks/useDict";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
export const Wrapper = ({
  children,
  classNames,
}: {
  children: ReactNode;
  classNames?: {
    wrapper?: string;
    message?: string;
  };
}) => {
  const dict = useDict();
  return (
    <div className="relative h-screen w-screen">
      <Image src={"/images/auth.bg.jpg"} alt="background" fill />
      <div className="auth-background absolute top-0 left-0 h-full w-full"></div>
      <div
        className={twMerge(
          "glass-gradient absolute top-0 left-0 grid h-full w-full grid-cols-1 overflow-hidden lg:grid-cols-2 xl:grid-cols-[60fr_40fr]",
          classNames?.wrapper,
        )}
      >
        <div className="flex h-full flex-col justify-between px-8 py-10 lg:px-12 lg:py-18 xl:px-18">
          <Link href={"/"}>
            <LogoIcon className="size-18 text-[#EFF9F0]" />
          </Link>
          <div className={twMerge("grid grid-cols-1 justify-items-center gap-4 px-[8vw] sm:px-[12vw] lg:px-0", classNames?.message)}>
            <h1 className="text-center text-lg leading-9 font-bold text-white sm:text-xl lg:text-2xl lg:leading-11 xl:px-16 xl:text-3xl xl:leading-13">
              {dict.welcome.title}
            </h1>
            <p className="text-center text-base leading-6 text-white sm:text-lg lg:text-xl lg:leading-8 xl:px-20 xl:text-2xl xl:leading-10">
              {dict.welcome.subtitle}
            </p>
          </div>
        </div>
        <div className="m-3 w-[90vw] justify-self-center overflow-y-auto rounded-[36px] bg-white sm:w-[72vw] lg:w-full">
          {children}
        </div>
      </div>
    </div>
  );
};
