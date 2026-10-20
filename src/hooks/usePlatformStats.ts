"use client";
import type { PlatformStats } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import { StatisticsService } from "@/services/statistics.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

/** Home page statistics, kept live by the platformStatsUpdated subscription. */
export const usePlatformStats = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.platformStats,
    queryFn: () => StatisticsService.platformStats(),
  });

  useEffect(() => {
    const subscription = StatisticsService.platformStatsUpdated().subscribe({
      next: (payload) => {
        const stats = payload.data?.platformStatsUpdated;
        if (stats) {
          queryClient.setQueryData<PlatformStats>(
            queryKeys.platformStats,
            stats,
          );
        }
      },
    });
    // Pushes sent while the socket was down are lost; re-read on reconnect.
    const refresh = () =>
      void queryClient.invalidateQueries({ queryKey: queryKeys.platformStats });
    window.addEventListener("wesal:graphql-reconnected", refresh);
    return () => {
      subscription.unsubscribe();
      window.removeEventListener("wesal:graphql-reconnected", refresh);
    };
  }, [queryClient]);

  return { stats: data, isLoading, isError };
};
