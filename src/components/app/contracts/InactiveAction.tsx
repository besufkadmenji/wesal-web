"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export const InactiveAction = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => (
  <Button
    type="button"
    aria-disabled="true"
    onClick={(event) => event.preventDefault()}
    className={cn(
      "h-[50px] rounded-[20px] text-base font-semibold shadow-none",
      className,
    )}
  >
    {children}
  </Button>
);
