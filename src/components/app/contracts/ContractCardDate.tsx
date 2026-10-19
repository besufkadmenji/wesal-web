import {
  CONTRACT_DATE_FORMATTER,
  toContractDate,
} from "@/components/app/contracts/formatContract";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export const ContractCardDate = ({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: unknown;
  className?: string;
}) => {
  const date = toContractDate(value);
  if (!date) return null;

  return (
    <div
      className={cn(
        "flex min-w-0 items-center justify-center gap-1 text-sm leading-[1.7] whitespace-nowrap",
        className,
      )}
    >
      <Icon className="text-gray size-[18px] shrink-0" />
      <span className="text-gray">{label}:</span>
      <time
        dateTime={date.toISOString()}
        className="truncate font-medium text-[#1a1a1a]"
        dir="ltr"
      >
        {CONTRACT_DATE_FORMATTER.format(date)}
      </time>
    </div>
  );
};
