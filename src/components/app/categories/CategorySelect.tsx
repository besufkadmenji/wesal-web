import CategoryIcon from "@/assets/icons/category.svg";
import ChevronDownIcon from "@/assets/icons/chevron.down.svg";
import { useDict } from "@/hooks/useDict";
import { useQueryState } from "nuqs";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CategorySuggestions } from "./CategorySuggestions";

export const CategorySelect = ({
  onSearch,
  onChange,
}: {
  onSearch?: (search: string) => void;
  onChange?: (query: string) => void;
}) => {
  const dict = useDict();

  const [search, setSearch] = useQueryState("search");
  const [query, setQuery] = useQueryState("query");
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [localeQuery, setLocaleQuery] = useState(search ?? query ?? "");
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <div
        className={twMerge(
          "relative z-10 flex h-14 w-full items-center justify-start gap-2 rounded-[20px] border border-[#F2F2F2] bg-white px-4",
        )}
      >
        <input
          ref={input}
          placeholder={dict.home.hero.selectCategories}
          className="peer h-full w-full ps-10.5 pe-8 text-sm outline-none lg:text-base"
          value={localeQuery}
          onChange={(e) => {
            setLocaleQuery(e.target.value);
            clearTimeout(timer.current!);
            if (onChange) {
              onChange(e.target.value);
            }
            timer.current = setTimeout(() => {
              setSearch(e.target.value);
            }, 100);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setOpen(false);
              input.current?.blur();
              const value = localeQuery.trim();

              if (onSearch) {
                // ClickUp 869fmmby7: nothing typed, nothing to search for.
                if (value) onSearch(value);
                return;
              }
              // An empty search clears the previous one (all categories).
              setQuery(value || null);
              setSearch(null);
            }
          }}
          onFocus={() => setOpen(true)}
        />
        <CategoryIcon className="pointer-events-none absolute size-6 ltr:left-4 rtl:right-4" />

        {/* ClickUp 869fmmby7: the arrow was a bare icon; it now opens the list. */}
        <button
          type="button"
          aria-label={dict.home.hero.selectCategories}
          aria-expanded={open}
          className="absolute grid size-8 cursor-pointer place-items-center ltr:right-3 rtl:left-3"
          onClick={() => {
            if (open) {
              setOpen(false);
              input.current?.blur();
              return;
            }
            input.current?.focus();
          }}
        >
          <ChevronDownIcon
            className={twMerge(
              "size-6 transition-transform duration-200 ease-out motion-reduce:transition-none",
              open && "rotate-180",
            )}
          />
        </button>
        <CategorySuggestions open={open} />
      </div>
      {open && (
        <div className="fixed inset-0 z-0" onClick={() => setOpen(false)}></div>
      )}
    </>
  );
};
