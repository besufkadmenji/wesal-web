import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HTMLInputTypeAttribute, ReactNode } from "react";
export const TextInput = ({
  value,
  onChange,
  icon,

  placeholder,
  type,
}: {
  value?: string;
  onChange?: (value: string) => void;
  icon: ReactNode;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
}) => {
  return (
    <div className="relative grid h-14 grow grid-cols-1 items-center">
      <Input
        type={type}
        placeholder={placeholder}
        className="focus-visible:border-primary peer border-border h-full rounded-[20px] shadow-none ring-0! ltr:pl-10.5 rtl:pr-10.5"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <div className="peer-focus-visible:text-primary absolute right-auto left-4 size-4.5 text-[#999999] rtl:right-4 rtl:left-auto">
        {icon}
      </div>
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
