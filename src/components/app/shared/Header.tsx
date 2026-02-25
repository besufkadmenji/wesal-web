import AddIcon from "@/assets/icons/add.circle.svg";
import { ChatPopover } from "@/components/app/shared/ChatPopover";
import { MobileMenu } from "@/components/app/shared/MobileMenu";
import { NotificationPopover } from "@/components/app/shared/NotificationPopover";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { twMerge } from "tailwind-merge";
import { BeProvider } from "@/components/app/shared/BeProvider";
export const Header = () => {
  const dict = useDict();
  const { me } = useMe();
  const router = useRouter();
  const [beProvider, setBeProvider] = useQueryState("be-provider");
  const isLoggedIn = !!me?.user || !!me?.provider;
  return (
    <header className="flex h-25.5 items-center justify-between gap-4 border-b border-b-[#F2F2F2] bg-white px-4 md:px-8 xl:px-[7vw]">
      <div className="flex h-full grow items-center gap-6 lg:gap-11">
        <Logo />
        <nav className="hidden h-full grow justify-start gap-4 lg:flex xl:gap-5 2xl:gap-6">
          <NavItem label={dict.home.nav.home} href={"/"} />
          <NavItem label={dict.home.nav.categories} href={"/categories"} />
          {me?.provider && (
            <NavItem label={dict.home.nav.myListings} href={"/my-listings"} />
          )}
          {isLoggedIn && (
            <NavItem label={dict.home.nav.contracts} href={"/contracts"} />
          )}
          <NavItem
            label={dict.home.nav.goodConnections}
            href={"/good-connections"}
          />
          <NavItem
            label={dict.home.nav.contactUs}
            href={"/support/contact-us"}
          />
        </nav>
      </div>
      <div className="flex items-center gap-4 lg:gap-6">
        {isLoggedIn && (
          <>
            <NotificationPopover />
            <ChatPopover />
          </>
        )}
        <Button
          variant={"secondary"}
          className="h-9.5 w-9.5 rounded-[12px]! text-base font-semibold xl:h-12.5 xl:w-auto xl:rounded-[20px]! xl:px-6!"
          onClick={() => {
            if (me?.user) {
              setBeProvider("true");
            } else {
              router.push("/my-listings/add");
            }
          }}
        >
          <AddIcon className="size-5" />
          <span className="hidden xl:block"> {dict.header.addAd}</span>
        </Button>
      </div>
      <MobileMenu />
      <BeProvider />
    </header>
  );
};

const Logo = () => {
  return (
    <Link href="/" className="relative aspect-12/10 w-18 lg:w-24">
      <Image
        src={"/images/main.logo.svg"}
        alt="logo"
        fill
        className="object-contain"
      />
    </Link>
  );
};
export const NavItem = ({ label, href }: { label: string; href: string }) => {
  const pathname = usePathname();
  const lang = useLang();
  const isActive =
    pathname === `/${lang}${href}` || (href === "/" && pathname === `/${lang}`);
  return (
    <Link
      href={href}
      className={twMerge(
        "text-gray relative grid h-full items-center text-sm font-medium xl:text-base",
        isActive && "text-primary font-semibold",
        lang === "en" && "xl:text-sm",
      )}
    >
      {label}
      {isActive && (
        <span className="bg-primary absolute -bottom-[1.25px] h-[1.5px] w-full" />
      )}
    </Link>
  );
};
