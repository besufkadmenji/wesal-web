import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { changeLang } from "@/config/i18n/changeLang";
import { useLang } from "@/hooks/useLang";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DownIcon from "@/assets/icons/down.icon.svg";
const langMap: {
  [key: string]: { label: string; flag: string };
} = {
  ar: {
    label: "العربية",
    flag: "/images/sa.svg",
  },
  en: {
    label: "English",
    flag: "/images/gb.svg",
  },
};
export const SelectLanguage = () => {
  const pathname = usePathname();
  const lang = useLang();
  const { label, flag } = langMap[lang] || langMap["en"];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 justify-self-start outline-none!">
        <div className="relative size-5 overflow-hidden rounded-full lg:size-7">
          <Image src={flag} alt={label} fill className="object-cover" />
        </div>
        <p className="text-sm leading-7 font-normal text-white lg:text-base">
          {label}
        </p>
        <DownIcon className="w-2.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(langMap).map(([key, { label, flag }]) => (
          <DropdownMenuItem
            key={key}
            className="gap-2"
            onClick={() => {
              changeLang(
                key.toString(),
                pathname.replace("/ar", "").replace("/en", ""),
                false,
              );
            }}
          >
            <span className="relative size-4 overflow-hidden rounded-full">
              <Image src={flag} alt={label} fill className="object-cover" />
            </span>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
