"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { queryClient } from "@/utils/query.client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const AppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NuqsAdapter>
  );
};
