import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";

/**
 * S4-54 (PO D-7): providers not yet evaluated by a monthly badge run.
 * No Figma design exists; styled like `StatusBadge` in a neutral tone.
 */
export const NewlyAddedChip = ({ className }: { className?: string }) => {
  const dict = useDict();
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-full bg-sky-50 px-3 py-1 text-xs font-medium whitespace-nowrap text-sky-700",
        className,
      )}
    >
      {dict.provider.newlyAdded}
    </span>
  );
};
