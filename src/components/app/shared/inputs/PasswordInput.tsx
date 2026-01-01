import EyeClosedIcon from "@/assets/icons/auth/eye.closed.svg";
import EyeOpenIcon from "@/assets/icons/auth/eye.open.svg";
import PasswordIcon from "@/assets/icons/auth/password.svg";
import { Input } from "@/components/ui/input";
import { useDict } from "@/hooks/useDict";
import { useState } from "react";
export const PasswordInput = ({
  value,
  onChange,
  placeholder,
  error,
}: {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
}) => {
  const dict = useDict();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="grid grid-cols-1">
      <div className="relative grid h-14 grow grid-cols-1 items-center">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="focus-visible:border-primary peer border-border h-full rounded-[20px] shadow-none ring-0! ltr:pl-10.5 rtl:pr-10.5"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <PasswordIcon className="peer-focus-visible:text-primary absolute right-auto left-4 size-4.5 text-[#999999] rtl:right-4 rtl:left-auto" />

        <button
          className="peer-focus-visible:text-primary absolute right-4 left-auto grid size-6 cursor-pointer items-center justify-items-center text-[#999999] rtl:right-auto rtl:left-4"
          type="button"
        >
          {showPassword ? (
            <EyeOpenIcon
              onClick={() => setShowPassword(false)}
              className="size-4.5"
            />
          ) : (
            <EyeClosedIcon
              onClick={() => setShowPassword(true)}
              className="size-4.5"
            />
          )}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
