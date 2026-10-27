import { useSearchCategories } from "@/hooks/useCategories";
import { useLang } from "@/hooks/useLang";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const CategorySuggestions = ({ open }: { open: boolean }) => {
  const { categories } = useSearchCategories();
  const lng = useLang();
  return (
    <div
      className={twMerge(
        "absolute top-14 right-0 left-0 z-10 hidden max-h-[50vh] w-full grid-cols-1 gap-1 overflow-x-hidden overflow-y-auto rounded-b-2xl bg-white shadow peer-focus:grid hover:grid",
        open && "grid",
      )}
    >
      {categories?.items.map((category) => (
        <Link
          href={`/listings?category=${category.id}`}
          key={category.id}
          className="hover:text-primary hover:bg-primary/10 px-4 py-2 font-medium text-black"
        >
          {lng === "ar" ? category.nameAr : category.nameEn}
        </Link>
      ))}
    </div>
  );
};
