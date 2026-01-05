import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import { useLang } from "@/hooks/useLang";
import { twMerge } from "tailwind-merge";
export const TextInput = ({
  value,
  onChange,
  icon,
  placeholder,
  type,
  error,
  isDisabled,
  readonly,
}: {
  value?: string;
  onChange?: (value: string) => void;
  icon: ReactNode;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
  isDisabled?: boolean;
  readonly?: boolean;
}) => {
  const lng = useLang();
  return (
    <div className="grid grid-cols-1">
      <div className="relative grid h-14 grow grid-cols-1 items-center">
        <Input
          type={type}
          placeholder={placeholder}
          className={twMerge(
            "focus-visible:border-primary peer border-border h-full rounded-[20px] shadow-none ring-0! ltr:pl-10.5 rtl:pr-10.5",
            readonly && "focus-visible:border-border! cursor-not-allowed",
          )}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          dir={lng === "ar" ? "rtl" : "ltr"}
          readOnly={readonly}
          disabled={isDisabled}
        />
        <div className="peer-focus-visible:text-primary absolute right-auto left-4 size-4.5 text-[#999999] rtl:right-4 rtl:left-auto">
          {icon}
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export const AppTextarea = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <Textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="focus-visible:border-primary peer border-border h-full max-h-80 min-h-30 resize-none rounded-[20px] p-4 shadow-none ring-0!"
    />
  );
};
