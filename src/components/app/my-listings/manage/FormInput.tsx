import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Textarea } from "@/components/ui/textarea";

export const FormInput = ({
  label,
  value,
  onChange,
  isDisabled,
  readOnly,
  isRequired,
  endContent,
  maxLength,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  isDisabled?: boolean;
  readOnly?: boolean;
  isRequired?: boolean;
  endContent?: ReactNode;
  maxLength?: number;
  error?: string;
}) => {
  return (
    <div className="grid grid-cols-1 gap-1">
      <div className="relative grid h-14 grid-cols-1 items-center">
        <input
          type="text"
          className={twMerge(
            "peer outline-primary h-14 rounded-[20px] border border-[#F2F2F2] p-4",
            endContent && "ltr:pr-16 rtl:pl-16",
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isDisabled}
          readOnly={readOnly}
          required={isRequired}
          maxLength={maxLength}
        />
        <label
          className={twMerge(
            "text-gray pointer-events-none absolute bg-white px-1 text-sm peer-focus:hidden ltr:left-4 rtl:right-4",
            value !== "" && "hidden",
          )}
        >
          {label}
          {isRequired && <span className="text-[#B3251E]"> *</span>}
        </label>
        {endContent && (
          <div className="absolute ltr:right-4 rtl:left-4">{endContent}</div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export const AppTextarea = ({
  label,
  value,
  onChange,
  isDisabled,
  readOnly,
  isRequired,
  endContent,
  maxLength,
  error,
}: {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  readOnly?: boolean;
  isRequired?: boolean;
  endContent?: ReactNode;
  maxLength?: number;
  error?: string;
}) => {
  return (
    <div className="grid grid-cols-1 gap-1">
      <div className="relative grid grid-cols-1 items-center">
        <Textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={twMerge(
            "focus-visible:border-primary peer border-border h-full max-h-80 min-h-30 resize-none rounded-[20px] p-4 shadow-none ring-0!",
            endContent && "ltr:pr-20 rtl:pl-20",
          )}
          disabled={isDisabled}
          readOnly={readOnly}
          required={isRequired}
          maxLength={maxLength}
        />
        <label
          className={twMerge(
            "text-gray pointer-events-none absolute top-4 bg-white text-sm peer-focus:hidden ltr:left-4 rtl:right-4",
            value !== "" && "hidden",
          )}
        >
          {label}
          {isRequired && <span className="text-[#B3251E]"> *</span>}
        </label>
        {endContent && (
          <div className="absolute top-4 ltr:right-4 rtl:left-4">
            {endContent}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
