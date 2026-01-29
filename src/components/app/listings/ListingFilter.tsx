import { sar } from "@/assets/fonts/sar";
import CategoryIcon from "@/assets/icons/category.svg";
import CityIcon from "@/assets/icons/city.filter.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories, useSearchCategories } from "@/hooks/useCategories";
import { useCities } from "@/hooks/useCities";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { ChevronDownIcon } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import RatingIcon from "@/assets/icons/rating.svg";

export const ListingFilter = () => {
  const dict = useDict();
  const lng = useLang();

  const [categoryId, setCategoryId] = useQueryState("category");
  const [minPrice, setMinPrice] = useQueryState("minPrice", parseAsInteger);
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", parseAsInteger);
  const [cityId, setCityId] = useQueryState("city");
  const [search, setSearch] = useQueryState("search");

  return (
    <div className="grid w-80 grid-cols-1 gap-6 rounded-[16px] bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium text-[#1A1A1A]">
          {dict.listingFilter.title}
        </p>
        <button
          className="font-semibold text-[#B3B3B3]"
          onClick={() => {
            setCategoryId(null);
            setMinPrice(null);
            setMaxPrice(null);
            setCityId(null);
            setSearch(null);
          }}
        >
          {dict.listingFilter.reset}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <CategorySelect key={categoryId} />
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

export const CategorySelect = () => {
  const dict = useDict();
  const lng = useLang();
  const { categories, isLoading } = useCategories({
    limit: 5,
  });
  const [category, setCategory] = useQueryState("category");
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [search, setSearch] = useQueryState("search");
  const timer = useRef<NodeJS.Timeout | null>(null);
  const selectedCategory = categories?.items.find((cat) => cat.id === category);
  const categoryName =
    lng === "en" ? selectedCategory?.nameEn : selectedCategory?.nameAr;
  const [localeQuery, setLocaleQuery] = useState(search ?? categoryName ?? "");

  return (
    <div
      className={twMerge(
        "relative flex h-14 w-full items-center justify-start gap-2 rounded-[20px] border border-[#F2F2F2] bg-white px-4",
      )}
    >
      <input
        placeholder={dict.home.hero.selectCategories}
        className="peer h-full w-full ps-6.5 outline-none"
        value={localeQuery}
        onChange={(e) => {
          setLocaleQuery(e.target.value);
          clearTimeout(timer.current!);
          timer.current = setTimeout(() => {
            setSearch(e.target.value);
          }, 100);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearch(localeQuery);
          }
        }}
      />
      <CategoryIcon className="absolute size-4.5 ltr:left-4 rtl:right-4" />
      <ChevronDownIcon className="text-muted-foreground absolute size-4 opacity-50 ltr:right-4 rtl:left-4" />
      <CategorySuggestions />
    </div>
  );
};

const CategorySuggestions = () => {
  const { categories } = useSearchCategories({
    limit: 5,
  });
  const [categoryId, setCategoryId] = useQueryState("category");
  const [search, setSearch] = useQueryState("search");
  const lng = useLang();
  return (
    <div className="absolute top-14 right-0 left-0 z-10 hidden w-full grid-cols-1 gap-1 overflow-hidden rounded-b-2xl bg-white shadow peer-focus:grid hover:grid">
      {categories?.items.map((category) => (
        <div
          onClick={() => {
            setSearch(lng === "ar" ? category.nameAr : category.nameEn);
            setCategoryId(category.id);
          }}
          key={category.id}
          className="hover:text-primary hover:bg-primary/10 px-4 py-2 font-medium text-black"
        >
          {lng === "ar" ? category.nameAr : category.nameEn}
        </div>
      ))}
    </div>
  );
};

const RatingFilter = () => {
  const dict = useDict();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
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
