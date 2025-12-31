import LogoIcon from "@/assets/icons/main.logo.svg";
import { ChatPopover } from "@/components/app/shared/ChatPopover";
import { NotificationPopover } from "@/components/app/shared/NotificationPopover";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import AddIcon from "@/assets/icons/add.circle.svg";
export const Header = () => {
  const dict = useDict();
  return (
    <header className="flex h-25.5 items-center justify-between border-b border-b-[#F2F2F2] bg-white px-[7vw]">
      <div className="flex h-full gap-11 items-center">
        <Logo />
        <nav className="flex h-full gap-6">
          <NavItem label={dict.home.nav.home} href={"/"} />
          <NavItem label={dict.home.nav.categories} href={"/categories"} />
          <NavItem label={dict.home.nav.contracts} href={"/contracts"} />
          <NavItem
            label={dict.home.nav.goodConnections}
            href={"/good-connections"}
          />
          <NavItem label={dict.home.nav.contactUs} href={"/support/contact-us"} />
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <NotificationPopover />
        <ChatPopover />
        <Button
          variant={"secondary"}
          className="h-12.5 rounded-[20px]! px-6! text-base font-semibold"
        >
          <AddIcon className="size-5" />
          {dict.header.addAd}
        </Button>
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <Link href="/" className="">
      <LogoIcon className="h-20 w-24" />
    </Link>
  );
};
const NavItem = ({ label, href }: { label: string; href: string }) => {
  const pathname = usePathname();
  const lang = useLang();
  const isActive =
    pathname === `/${lang}${href}` || (href === "/" && pathname === `/${lang}`);
  return (
    <Link
      href={href}
      className={twMerge(
        "text-gray relative grid h-full items-center font-medium",
        isActive && "text-primary font-semibold",
      )}
    >
      {label}
      {isActive && (
        <span className="bg-primary absolute -bottom-[1.25px] h-[1.5px] w-full" />
      )}
    </Link>
  );
};
