"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { queryClient } from "@/utils/query.client";
import { HeroUIProvider } from "@heroui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserStatusWatcher } from "@/components/app/UserStatusWatcher";
import { useRealtimeRefresh } from "@/hooks/useConversations";
import { RealtimeEventsWatcher } from "@/components/app/RealtimeEventsWatcher";

const RealtimeQueryBridge = () => {
  useRealtimeRefresh();
  return null;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <UserStatusWatcher />
          <RealtimeQueryBridge />
          <RealtimeEventsWatcher />
          {children}
        </HeroUIProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NuqsAdapter>
  );
};
