import { useDict } from "@/hooks/useDict";
import { SelectLanguage } from "./SelectLanguage";
import AnnouncementIcon from "@/assets/icons/announcement.svg";
import AccountIcon from "@/assets/icons/user.rounded.svg";
import Link from "next/link";
export const TopBar = () => {
  const dict = useDict();
  return (
    <div className="top-bar-gradient flex h-20 items-center justify-between px-[7vw]">
      <SelectLanguage />
      <div className="flex items-center justify-center gap-2">
        <p className="text-lg font-medium text-white">{dict.home.tagline}</p>
        <AnnouncementIcon className="size-6" />
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <AccountIcon className="size-5" />
          <Link
            href="/auth/login"
            className="text-base font-medium text-[#EFF9F0]"
          >
            {dict.home.login}
          </Link>
        </div>
        <div className="h-5 w-px bg-white"></div>
        <Link
          href="/auth/signup"
          className="text-base font-medium text-[#EFF9F0]"
        >
          {dict.home.signup}
        </Link>
      </div>
    </div>
  );
};
