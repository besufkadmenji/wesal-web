import type { PlatformStats } from "@/gql/graphql";
import {
  PLATFORM_STATS_QUERY,
  PLATFORM_STATS_UPDATED_SUBSCRIPTION,
} from "@/graphql/statistics/operations";
import { requireData } from "@/utils/apollo.result";
import client from "@/utils/apollo.client";

export class StatisticsService {
  static async platformStats() {
    const result = await client().query<{ platformStats: PlatformStats }>({
      query: PLATFORM_STATS_QUERY,
      fetchPolicy: "network-only",
    });
    return requireData(result, "Platform statistics").platformStats;
  }

  static platformStatsUpdated() {
    return client().subscribe<{ platformStatsUpdated: PlatformStats }>({
      query: PLATFORM_STATS_UPDATED_SUBSCRIPTION,
    });
  }
}
