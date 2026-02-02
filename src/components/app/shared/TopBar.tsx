import AnnouncementIcon from "@/assets/icons/announcement.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import LogoutIcon from "@/assets/icons/logout.svg";
import ProfileIcon from "@/assets/icons/profile.svg";
import AccountIcon from "@/assets/icons/user.rounded.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppRouter } from "@/hooks/use.app.router";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { SelectLanguage } from "./SelectLanguage";
export const TopBar = () => {
  const dict = useDict();
  const { me, isLoading } = useMe();
  console.log("me in topbar", me);
  return (
    <div className="top-bar-gradient grt grid h-20 grid-cols-2 items-center justify-between px-4 md:grid-cols-[1fr_auto_1fr] md:px-8 xl:px-[7vw]">
      <SelectLanguage />
      <div className="col-span-2 row-start-2 flex items-center justify-center gap-2 md:col-span-1 md:col-start-2 md:row-start-1">
        <p className="text-center text-xs font-medium text-white md:text-sm lg:text-lg">
          {dict.home.tagline}
        </p>
        <AnnouncementIcon className="size-6" />
      </div>
      {isLoading ? (
        <div />
      ) : me ? (
        <LoggedUser />
      ) : (
        <div className="flex gap-4 justify-self-end">
          <div className="flex items-center gap-1">
            <AccountIcon className="size-4 lg:size-5" />
            <Link
              href="/auth/choose-type?action=login"
              className="text-sm font-medium whitespace-nowrap text-[#EFF9F0] lg:text-base"
            >
              {dict.home.login}
            </Link>
          </div>
          <div className="h-5 w-px bg-white"></div>
          <Link
            href="/auth/choose-type?action=register"
            className="text-sm font-medium whitespace-nowrap text-[#EFF9F0] lg:text-base"
          >
            {dict.home.signup}
          </Link>
        </div>
      )}
    </div>
  );
};

const LoggedUser = () => {
  const { me, logout } = useMe();
  const dict = useDict();
  const router = useAppRouter();
  const profile = me?.user || me?.provider;
  const url =
    profile?.avatarFilename && profile.avatarFilename !== ""
      ? `${process.env.NEXT_PUBLIC_DATA}/files/${profile.avatarFilename}`
      : "/images/no.avatar.png";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-3 justify-self-end outline-none!">
        <div className="relative size-8 shrink-0 overflow-hidden rounded-full lg:size-12.5">
          <Image src={url} alt="User Avatar" fill className="object-cover" />
        </div>
        <p className="text-sm font-semibold text-[#EFF9F0] lg:text-base">
          {profile?.name}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-72">
        <OptionItem
          icon={<ProfileIcon className="size-6" />}
          label={dict.auth.personalProfile}
          onClick={() => {
            router.push("/profile");
          }}
        />
        <OptionItem
          icon={<HeartIcon className="size-6" />}
          label={dict.auth.favorites}
          onClick={() => {
            router.push("/favorites");
          }}
        />
        <OptionItem
          icon={<LogoutIcon className="size-6" />}
          label={dict.auth.logout}
          className="text-[#B3251E]"
          onClick={() => {
            logout();
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const OptionItem = ({
  icon,
  label,
  onClick,
  className,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}) => {
  const lang = useLang();
  return (
    <DropdownMenuLabel
      onClick={onClick}
      className="flex cursor-pointer items-center gap-1 p-6"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {icon}
      <span
        className={twMerge(
          "text-gray text-sm font-medium lg:text-base",
          className,
        )}
      >
        {label}
      </span>
    </DropdownMenuLabel>
  );
};
