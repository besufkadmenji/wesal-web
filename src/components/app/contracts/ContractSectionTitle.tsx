import { type ComponentType, type ReactNode } from "react";

export const ContractSectionTitle = ({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) => (
  <h2 className="text-primary flex items-center justify-start gap-1 text-lg font-medium">
    <Icon className="size-5" />
    {children}
  </h2>
);
