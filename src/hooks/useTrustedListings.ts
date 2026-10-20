"use client";
import { queryKeys } from "@/hooks/queryKeys";
import ListingService from "@/services/listing.service";
import { useQuery } from "@tanstack/react-query";

/** Trusted-advertisers carousel data; badges change monthly, so cache for 10 min. */
export const useTrustedListings = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.trustedListings,
    queryFn: () => ListingService.trustedListings(),
    staleTime: 10 * 60 * 1000,
  });
  return { listings: data ?? [], isLoading, isError };
};
