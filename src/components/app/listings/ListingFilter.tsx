import { sar } from "@/assets/fonts/sar";
import DownIcon from "@/assets/icons/chevron.down.svg";
import CityIcon from "@/assets/icons/city.filter.svg";
import RatingIcon from "@/assets/icons/rating.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCities } from "@/hooks/useCities";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useWindowSize } from "@/hooks/useWindowSize";
import { SearchIcon } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
export const ListingFilter = () => {
  const dict = useDict();

  const [, setCategoryId] = useQueryState("category");

  const [minPrice, setMinPrice] = useQueryState("minPrice", parseAsInteger);
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", parseAsInteger);
  const [cityId, setCityId] = useQueryState("city");
  const [, setQuery] = useQueryState("query");
  const [, setSelectedRating] = useQueryState("rating", parseAsInteger);

  const { width } = useWindowSize();
  const [showFilter, setShowFilter] = useState(false);
  const shouldShowFilter = width >= 1024 || showFilter;
  return (
    <div className="grid w-full grid-cols-1 gap-6 rounded-[16px] bg-white p-6 lg:w-80">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          <p className="text-lg font-medium text-[#1A1A1A]">
            {dict.listingFilter.title}
          </p>
          <DownIcon
            className={twMerge(
              "size-6 duration-150 ease-in lg:hidden",
              showFilter && "rotate-180",
            )}
          />
        </div>

        <button
          className="text-primary cursor-pointer font-semibold"
          onClick={() => {
            setCategoryId(null);
            setMinPrice(null);
            setMaxPrice(null);
            setCityId(null);
            setQuery(null);
            setSelectedRating(null);
          }}
        >
          {dict.listingFilter.reset}
        </button>
      </div>
      {shouldShowFilter && (
        <div className="grid grid-cols-1 gap-6">
          <ListingSearchInput />
          <CitySelect />
          <div className="grid grid-cols-1 gap-4">
            <p className="leading-7 text-[#1A1A1A]">
              {dict.listingFilter.priceRange}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <PriceInput
                value={`${minPrice || ""}`}
                onChange={(value: string): void => {
                  setMinPrice(value ? parseInt(value, 10) : null);
                }}
                placeholder={"0"}
              />
              <PriceInput
                value={`${maxPrice || ""}`}
                onChange={(value: string): void => {
                  setMaxPrice(value ? parseInt(value, 10) : null);
                }}
                placeholder={dict.listingFilter.priceUnlimited}
              />
            </div>
            <RatingFilter />
          </div>
        </div>
      )}
    </div>
  );
};

const PriceInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => {
  return (
    <div className="relative grid h-14 w-full grid-cols-1 items-center justify-start gap-2 rounded-[20px] border border-[#F2F2F2] bg-white px-4">
      <input
        className="outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span
        className={twMerge(
          "absolute text-sm text-[#999999] ltr:right-4 rtl:left-4",
          sar.className,
        )}
      >
        A
      </span>
    </div>
  );
};

export const CitySelect = () => {
  const [cityId, setCityId] = useQueryState("city");

  const dict = useDict();
  const { cities } = useCities();
  const lng = useLang();
  return (
    <Select
      value={cityId || undefined}
      onValueChange={(value) => setCityId(value)}
    >
      <SelectTrigger className="relative flex h-14! w-full rounded-[20px]! border-[#F2F2F2]! p-0! shadow-none! ring-0! ltr:pr-4! rtl:pl-4!">
        <CityIcon className="absolute right-auto left-4 size-4.5 text-[#999999] rtl:right-4 rtl:left-auto" />
        <span className="flex grow justify-start ltr:pl-10.5 rtl:pr-10.5">
          <SelectValue placeholder={dict.auth.signup.provider.city} />
        </span>
      </SelectTrigger>
      <SelectContent>
        {cities?.items.map((city) => (
          <SelectItem value={city.id} key={city.id}>
            {lng === "ar" ? city.nameAr : city.nameEn}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const ListingSearchInput = () => {
  const dict = useDict();
  const [query, setQuery] = useQueryState("query");
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [localQuery, setLocalQuery] = useState(query ?? "");

  useEffect(() => {
    setLocalQuery(query ?? "");
  }, [query]);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const updateSearch = (value: string) => {
    const nextQuery = value.trim();
    setPage(1);
    setQuery(nextQuery || null);
  };

  return (
    <div
      className={twMerge(
        "relative flex h-14 w-full items-center justify-start gap-2 rounded-[20px] border border-[#F2F2F2] bg-white px-4",
      )}
    >
      <SearchIcon className="absolute size-4.5 text-[#999999] ltr:left-4 rtl:right-4" />
      <input
        placeholder={dict.listingFilter.searchPlaceholder}
        className="h-full w-full ps-6.5 outline-none"
        value={localQuery}
        onChange={(e) => {
          const value = e.target.value;
          setLocalQuery(value);
          if (timer.current) {
            clearTimeout(timer.current);
          }
          timer.current = setTimeout(() => {
            updateSearch(value);
          }, 250);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (timer.current) {
              clearTimeout(timer.current);
            }
            updateSearch(localQuery);
          }
        }}
      />
    </div>
  );
};

const RatingFilter = () => {
  const dict = useDict();

  const [selectedRating, setSelectedRating] = useQueryState(
    "rating",
    parseAsInteger,
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      <p>{dict.listingFilter.rating}</p>
      <div className="flex items-center gap-2">
        {[5, 4, 3, 2, 1].map((rating) => (
          <RatingItem
            key={rating}
            rating={rating}
            isActive={selectedRating === rating}
            onClick={() => setSelectedRating(rating)}
          />
        ))}
      </div>
    </div>
  );
};

const RatingItem = ({
  rating,
  isActive,
  onClick,
}: {
  rating: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={twMerge(
        "flex cursor-pointer items-center gap-2 rounded-lg border border-[#F2F2F2] px-2 py-1",
        isActive && "border-primary bg-primary",
      )}
      onClick={() => onClick()}
    >
      <RatingIcon className={twMerge("size-4.5 shrink-0 text-[#F9A825]")} />
      <p
        className={twMerge(
          "text-gray text-sm font-medium",
          isActive && "text-white",
        )}
      >
        {rating}
      </p>
    </div>
  );
};
