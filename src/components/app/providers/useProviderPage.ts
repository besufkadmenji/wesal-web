"use client";

import { queryKeys } from "@/hooks/queryKeys";
import ListingService from "@/services/listing.service";
import ProviderService from "@/services/provider.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";

const ADS_PER_PAGE = 12;

/** Data for the public provider page: the profile and a page of its ads. */
export const useProviderPage = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const provider = useQuery({
    queryKey: queryKeys.publicProvider(id),
    queryFn: () => ProviderService.publicProfile(id),
    enabled: Boolean(id),
  });
  const listings = useQuery({
    queryKey: queryKeys.providerListings(id, page),
    queryFn: () =>
      ListingService.listings({
        page,
        limit: ADS_PER_PAGE,
        providerId: id,
      }),
    enabled: Boolean(id),
  });

  return { id, provider, listings, setPage };
};
