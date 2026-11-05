import type { ReactNode } from "react";

/** One labelled line of the provider card (address, ads, contracts). */
export const ProviderStat = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) => (
  <div className="grid grid-cols-[auto_1fr] items-start gap-3">
    <span className="text-gray grid size-9 place-content-center rounded-full bg-[#f6f7fa]">
      {icon}
    </span>
    <div className="grid min-w-0 gap-0.5">
      <p className="text-gray text-xs">{label}</p>
      <p className="text-sm font-medium break-words text-[#1a1a1a]">{value}</p>
    </div>
  </div>
);
