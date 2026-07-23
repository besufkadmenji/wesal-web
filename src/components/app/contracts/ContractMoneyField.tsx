"use client";

import { MoneyValue } from "@/components/app/contracts/MoneyValue";

export const ContractMoneyField = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <div className="grid h-23 grid-cols-1 gap-2 rounded-[16px] border border-[#f2f2f2] bg-[#fbfbfb] p-4">
    <p className="text-gray leading-7">{label}</p>
    <MoneyValue value={value} />
  </div>
);
