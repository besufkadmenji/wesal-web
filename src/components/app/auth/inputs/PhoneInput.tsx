import { Input } from "@/components/ui/input";
import { useDict } from "@/hooks/useDict";
import PhoneIcon from "@/assets/icons/auth/phone.svg";
import SearchIcon from "@/assets/icons/search.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryState } from "nuqs";
import { countries, Country } from "@/config/countries";
import Image from "next/image";
import SimpleDownIcon from "@/assets/icons/auth/simple.down.svg";
import { useLang } from "@/hooks/useLang";
export const PhoneInput = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const dict = useDict();
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-14 grow grid-cols-1 items-center">
        <Input
          type="tel"
          placeholder={dict.auth.login.phone}
          className="focus-visible:border-primary peer border-border h-full rounded-[20px] pl-10.5 shadow-none ring-0!"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <PhoneIcon className="peer-focus-visible:text-primary absolute right-auto left-4 size-4.5 text-[#999999] rtl:right-4 rtl:left-auto" />
      </div>
      <CountrySelect />
    </div>
  );
};

const CountrySelect = () => {
  const lang = useLang();
  const [country, setCountry] = useQueryState("country", {
    defaultValue: "+966",
  });
  const [showCountries, setShowCountries] = useQueryState("showCountries");
  const [query, setQuery] = useQueryState("query");
  const selectedCountry = countries.find((c) => c.code === country)!;
  return (
    <Popover
      open={!!showCountries}
      onOpenChange={(open) => setShowCountries(open ? "true" : null)}
    >
      <PopoverTrigger className="border-border flex h-14 items-center gap-0.5 rounded-[20px] border px-3">
        <div className="relative size-4">
          <Image src={selectedCountry.flag} alt={selectedCountry.name} fill />
        </div>
        <p className="text-gray text-xs font-medium">{selectedCountry.code}</p>
        <SimpleDownIcon className="size-4.5" />
      </PopoverTrigger>
      <PopoverContent className="grid min-w-[32vw] grid-cols-1 gap-6">
        <SearchInput query={query ?? ""} onChange={setQuery} />
        <div className="grid grid-cols-1 gap-3">
          {countries
            .filter((country) => {
              if (!query) return true;
              const name = lang === "ar" ? country.nameAr : country.name;
              return (
                name.toLowerCase().includes(query.toLowerCase()) ||
                country.code.includes(query)
              );
            })
            .map((country) => (
              <CountryItem
                key={country.code}
                country={country}
                onSelect={() => {
                  setCountry(country.code);
                  setShowCountries(null);
                  setQuery(null);
                }}
              />
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const SearchInput = ({
  query,
  onChange,
}: {
  query?: string;
  onChange?: (query: string) => void;
}) => {
  const dict = useDict();
  return (
    <div className="relative grid h-14 grow grid-cols-1 items-center">
      <Input
        type="tel"
        placeholder={dict.auth.searchCountry}
        className="focus-visible:border-primary peer border-border h-full rounded-[20px] pl-10.5 shadow-none ring-0!"
        value={query}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <SearchIcon className="peer-focus-visible:text-primary absolute right-0 left-4 size-4.5 text-[#1C274C] rtl:right-4 rtl:left-0" />
    </div>
  );
};

const CountryItem = ({
  country,
  onSelect,
}: {
  country: Country;
  onSelect: () => void;
}) => {
  const lang = useLang();
  return (
    <div className="flex cursor-pointer items-center gap-2" onClick={onSelect}>
      <div className="relative size-6.5">
        <Image src={country.flag} alt={country.name} fill />
      </div>
      <p className="grow text-sm font-medium text-black">
        {lang === "ar" ? country.nameAr : country.name}
      </p>
      <p className="text-gray text-xs font-normal">{country.code}</p>
    </div>
  );
};
