import AnnouncementIcon from "@/assets/icons/announcement.svg";
import AccountIcon from "@/assets/icons/user.rounded.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import Image from "next/image";
import Link from "next/link";
import { SelectLanguage } from "./SelectLanguage";
import ProfileIcon from "@/assets/icons/profile.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import LogoutIcon from "@/assets/icons/logout.svg";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/hooks/useLang";
import { twMerge } from "tailwind-merge";
export const TopBar = () => {
  const dict = useDict();
  const { me, isLoading } = useMe();
  console.log("me in topbar", me);
  return (
    <div className="top-bar-gradient grid h-20 grid-cols-[1fr_auto_1fr] items-center justify-between px-[7vw]">
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
              href="/auth/choose-type?action=login"
              className="text-base font-medium text-[#EFF9F0]"
            >
              {dict.home.login}
            </Link>
          </div>
          <div className="h-5 w-px bg-white"></div>
          <Link
            href="/auth/choose-type?action=register"
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
  const { me, logout } = useMe();
  const dict = useDict();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-3 justify-self-end outline-none!">
        <div className="relative size-12.5 shrink-0 overflow-hidden rounded-full">
          <Image
            src={"/images/no.avatar.png"}
            alt="User Avatar"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-base font-semibold text-[#EFF9F0]">{me?.name}</p>
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
      <span className={twMerge("text-gray text-base font-medium", className)}>
        {label}
      </span>
    </DropdownMenuLabel>
  );
};
