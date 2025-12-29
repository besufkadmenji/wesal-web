import { Input } from "@/components/ui/input";
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
        className="focus-visible:border-primary peer border-border h-full rounded-[20px] pl-10.5 shadow-none ring-0!"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <div className="peer-focus-visible:text-primary absolute right-auto left-4 size-4.5 text-[#999999] rtl:right-4 rtl:left-auto">
        {icon}
      </div>
    </div>
  );
};
