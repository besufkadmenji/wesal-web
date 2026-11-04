import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";

/** A paid, currently featured ad. Styled like `StatusBadge`. */
export const FeaturedBadge = ({ className }: { className?: string }) => {
  const dict = useDict();
  return (
    <span
      className={cn(
        "bg-primary inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap text-white",
        className,
      )}
    >
      {dict.promotion.featured}
    </span>
  );
};
