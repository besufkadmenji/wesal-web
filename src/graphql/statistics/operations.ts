import { gql } from "@apollo/client";

export const PLATFORM_STATS_FRAGMENT = gql`
  fragment PlatformStatsFields on PlatformStats {
    completedContracts
    providers
    customers
  }
`;

export const PLATFORM_STATS_QUERY = gql`
  query PlatformStats {
    platformStats {
      ...PlatformStatsFields
    }
  }
  ${PLATFORM_STATS_FRAGMENT}
`;

export const PLATFORM_STATS_UPDATED_SUBSCRIPTION = gql`
  subscription PlatformStatsUpdated {
    platformStatsUpdated {
      ...PlatformStatsFields
    }
  }
  ${PLATFORM_STATS_FRAGMENT}
`;
