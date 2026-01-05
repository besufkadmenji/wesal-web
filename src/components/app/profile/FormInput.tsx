import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { PhoneInput } from "@/components/app/shared/inputs/PhoneInput";
import { TextInput } from "@/components/app/shared/inputs/TextInput";

export const FormInput = ({
  label,
  placeholder,
  value,
  onChange,
  icon,
  isDisabled,
  readOnly,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon?: ReactNode;
  isDisabled?: boolean;
  readOnly?: boolean;
}) => {
  return (
    <div className="relative grid h-14 grid-cols-1 items-center">
      <Label className="text-gray absolute top-0 z-10 -translate-y-1/2 bg-white px-1 text-sm ltr:left-4 rtl:right-4">
        {label}
      </Label>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChange={(value) => onChange(value)}
        isDisabled={isDisabled}
        readonly={readOnly}
        icon={icon}
      />
    </div>
  );
};
export const FormPhoneInput = ({
  label,
  value,
  onChange,
  countryCode,
  readOnly,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  countryCode?: string;
  readOnly?: boolean;
}) => {
  return (
    <div className="relative grid h-14 grid-cols-1 items-center">
      <Label className="text-gray absolute top-0 z-10 -translate-y-1/2 bg-white px-1 text-sm ltr:left-4 rtl:right-4">
        {label}
      </Label>
      <PhoneInput
        value={value}
        onChange={onChange}
        countryCode={countryCode}
        readonly={readOnly}
      />
    </div>
  );
};
