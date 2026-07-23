import { type ComponentType } from "react";

export const TimelineMetric = ({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="border-border flex items-start justify-start gap-2 rounded-2xl border bg-[#fbfbfb] p-4">
    <span className="text-gray bg-border grid size-7.5 shrink-0 place-content-center rounded-xl">
      <Icon className="size-4.5" />
    </span>
    <div className="grid min-w-0 gap-1 text-start">
      <p className="text-gray text-base leading-[1.7]">{label}</p>
      <strong className="text-base font-medium text-black">{value}</strong>
    </div>
  </div>
);
