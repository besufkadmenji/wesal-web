"use client";

import { ReactNode } from "react";

export const TermsCard = ({
  title,
  checked,
  onChange,
  children,
}: {
  title: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  children: ReactNode;
}) => (
  <label className="grid cursor-pointer gap-5 rounded-[16px] border border-[#f2f2f2] bg-[#fbfbfb] p-4">
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-6 accent-primary"
      />
      <p className="text-base font-medium leading-8 text-[#1a1a1a]">
        {title} <span className="text-[#b3251e]">*</span>
      </p>
    </div>
    {children}
  </label>
);
