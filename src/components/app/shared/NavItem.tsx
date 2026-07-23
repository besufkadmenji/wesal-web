import { useLang } from "@/hooks/useLang";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const NavItem = ({
  label,
  href,
  onNavigate,
}: {
  label: string;
  href: string;
  onNavigate?: () => void;
}) => {
  const pathname = usePathname();
  const lang = useLang();
  const isActive =
    pathname === `/${lang}${href}` || (href === "/" && pathname === `/${lang}`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
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
