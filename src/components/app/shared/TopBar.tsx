import { useDict } from "@/hooks/useDict";
import { SelectLanguage } from "./SelectLanguage";
import AnnouncementIcon from "@/assets/icons/announcement.svg";
import AccountIcon from "@/assets/icons/user.rounded.svg";
import Link from "next/link";
import { useMe } from "@/hooks/useMe";
import Image from "next/image";
export const TopBar = () => {
  const dict = useDict();
  const { me, isLoading } = useMe();
  console.log("me in topbar", me);
  return (
    <div className="top-bar-gradient grid h-20 grid-cols-[200px_1fr_200px] items-center justify-between px-[7vw]">
      <SelectLanguage />
      <div className="flex items-center justify-center gap-2">
        <p className="text-lg font-medium text-white">{dict.home.tagline}</p>
        <AnnouncementIcon className="size-6" />
      </div>
      {isLoading ? (
        <div />
      ) : me ? (
        <LoggedUser />
      ) : (
        <div className="flex gap-4 justify-self-end">
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
            href="/auth/register"
            className="text-base font-medium text-[#EFF9F0]"
          >
            {dict.home.signup}
          </Link>
        </div>
      )}
    </div>
  );
};

const LoggedUser = () => {
  const { me } = useMe();

  return (
    <div className="flex items-center gap-3 justify-self-end">
      <div className="relative size-12.5 shrink-0 overflow-hidden rounded-full">
        <Image
          src={"/images/no.avatar.png"}
          alt="User Avatar"
          fill
          className="object-cover"
        />
      </div>
      <p className="text-base font-semibold text-[#EFF9F0]">{me?.name}</p>
    </div>
  );
};
