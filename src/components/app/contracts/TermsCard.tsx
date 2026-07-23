"use client";

import { ReactNode } from "react";

export const TermsCard = ({
  title,
  checked,
  onChange,
  children,
  readOnly = false,
}: {
  title: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  children: ReactNode;
  readOnly?: boolean;
}) => {
  if (readOnly) {
    return (
      <div className="grid gap-5 rounded-[16px] border border-[#f2f2f2] bg-[#fbfbfb] p-4">
        <p className="text-base leading-8 font-medium text-[#1a1a1a]">{title}</p>
        {children}
      </div>
    );
  }

  return (
    <label className="grid cursor-pointer gap-5 rounded-[16px] border border-[#f2f2f2] bg-[#fbfbfb] p-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange?.(event.target.checked)}
          className="accent-primary size-6"
        />
        <p className="text-base leading-8 font-medium text-[#1a1a1a]">
          {title} <span className="text-[#b3251e]">*</span>
        </p>
      </div>
      {children}
    </label>
  );
};
