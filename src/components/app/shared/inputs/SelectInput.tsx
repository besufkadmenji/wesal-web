import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLang } from "@/hooks/useLang";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface SelectOption {
  value: string;
  label: string;
}

export const SelectInput = ({
  value,
  onChange,
  icon,
  placeholder,
  options,
  error,
}: {
  value?: string;
  onChange?: (value: string) => void;
  icon: ReactNode;
  placeholder: string;
  options: SelectOption[];
  error?: string;
}) => {
  const lng = useLang();

  return (
    <div className="grid grid-cols-1">
      <div className="relative grid h-14 grow grid-cols-1 items-center">
        <Select
          value={value}
          onValueChange={onChange}
          dir={lng === "ar" ? "rtl" : "ltr"}
        >
          <SelectTrigger
            className={twMerge(
              "focus-visible:border-primary border-border h-14! w-full rounded-[20px] shadow-none ring-0! ltr:pl-4 rtl:pr-4",
              "data-placeholder:text-muted-foreground flex justify-start text-sm",
              !value && "text-muted-foreground",
            )}
          >
            <div className="flex grow items-center gap-2">
              {icon}
              <SelectValue placeholder={placeholder} />
            </div>
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
