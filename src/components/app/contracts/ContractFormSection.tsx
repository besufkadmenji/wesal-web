"use client";

import { ComponentType, ReactNode, SVGProps } from "react";

export const ContractFormSection = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children: ReactNode;
}) => (
  <section className="grid gap-6 rounded-[20px] bg-white px-6 py-3">
    <div className="flex items-center gap-1">
      <Icon className="text-primary size-5 shrink-0" />
      <h2 className="text-primary text-lg font-medium">{title}</h2>
    </div>
    {children}
  </section>
);
