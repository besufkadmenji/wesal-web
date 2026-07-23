import AccountIcon from "@/assets/icons/account.svg";
import BusinessDataIcon from "@/assets/icons/business.data.svg";
import ChangePasswordIcon from "@/assets/icons/change.password.svg";
import FavoritesIcon from "@/assets/icons/favorites.svg";
import LogoutIcon from "@/assets/icons/logout.alt.svg";
import SignedContractIcon from "@/assets/icons/signed.contract.svg";
import { ConfirmLogout } from "@/components/app/profile/ConfirmLogout";
import { Button } from "@/components/ui/button";
import { useAppRouter } from "@/hooks/use.app.router";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
export const Nav = () => {
  const { me, logout } = useMe();
  const dict = useDict();
  const router = useAppRouter();
  const pathname = usePathname();
  const lng = useLang();

  const profile = me?.user || me?.provider;
  return (
    profile && (
      <div className="grid grid-cols-1 gap-6 rounded-[16px] bg-white p-6">
        <div className="grid grid-cols-1 justify-items-center gap-2">
          <div className="bg-border relative size-16 overflow-hidden rounded-full">
            {profile.avatarFilename && (
              <Image
                src={`${process.env.NEXT_PUBLIC_DATA}/files/${profile.avatarFilename}`}
                alt="Avatar"
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="grid grid-cols-1 justify-items-center gap-1">
            <p className="font-semibold text-black">{profile.name}</p>
            <p dir="ltr" className="text-gray text-xs font-normal">
              {profile.phone}
            </p>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-1">
          <NavItem
            icon={<AccountIcon className="size-5 shrink-0" />}
            label={dict.profile.personalInfo}
            onClick={(): void => {
              router.push("/profile");
            }}
            isActive={pathname === `/${lng}/profile`}
          />
          {me.provider && (
            <NavItem
              icon={<BusinessDataIcon className="size-5 shrink-0" />}
              label={dict.profile.businessInfo}
              onClick={(): void => {
                router.push("/profile/business");
              }}
              isActive={pathname === `/${lng}/profile/business`}
            />
          )}
          <NavItem
            icon={<ChangePasswordIcon className="size-5 shrink-0" />}
            label={dict.profile.changePassword}
            onClick={(): void => {
              router.push("/profile/change-password");
            }}
            isActive={pathname === `/${lng}/profile/change-password`}
          />
          {me.provider && (
            <NavItem
              icon={<SignedContractIcon className="size-5 shrink-0" />}
              label={dict.profile.signedContract}
              onClick={(): void => {
                router.push("/profile/signed-contract");
              }}
              isActive={pathname === `/${lng}/profile/signed-contract`}
            />
          )}
          {me.user && (
            <NavItem
              icon={<FavoritesIcon className="size-5 shrink-0" />}
              label={dict.profile.favorites}
              onClick={(): void => {
                router.push("/profile/favorites");
              }}
              isActive={pathname === `/${lng}/profile/favorites`}
            />
          )}
          <ConfirmLogout>
            <NavItem
              icon={<LogoutIcon className="size-5 shrink-0" />}
              label={dict.profile.logout}
              className="text-[#B3251E]!"
              onClick={(): void => {
                logout();
              }}
            />
          </ConfirmLogout>
        </div>
      </div>
    )
  );
};

const NavItem = ({
  icon,
  label,
  onClick,
  isActive,
  className,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}) => {
  return (
    <Button
      variant={"ghost"}
      className={twMerge(
        "text-gray! flex h-12 justify-start gap-1 rounded-[16px] bg-white! text-sm font-medium",
        isActive && "bg-[#EFF1F6]! text-black!",
        className,
      )}
      onClick={onClick}
    >
      {icon} <span>{label}</span>
    </Button>
  );
};
