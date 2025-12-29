import Image from "next/image";
import { ReactNode } from "react";
import LogoIcon from "@/assets/icons/logo.svg";
import { useDict } from "@/hooks/useDict";
export const Wrapper = ({ children }: { children: ReactNode }) => {
  const dict = useDict();
  return (
    <div className="relative h-screen w-screen">
      <Image src={"/images/auth.bg.jpg"} alt="background" fill />
      <div className="auth-background absolute top-0 left-0 h-full w-full"></div>
      <div className="glass-gradient absolute top-0 left-0 grid h-full w-full grid-cols-[60fr_40fr]">
        <div className="flex h-full flex-col justify-between p-18">
          <LogoIcon className="size-18" />
          <div className="grid grid-cols-1 justify-items-center gap-4">
            <h1 className="px-16 text-center text-3xl leading-13 font-bold text-white">
              {dict.welcome.title}
            </h1>
            <p className="px-20 text-center text-2xl leading-10 text-white">
              {dict.welcome.subtitle}
            </p>
          </div>
        </div>
        <div className="m-3 rounded-[36px] bg-white overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
