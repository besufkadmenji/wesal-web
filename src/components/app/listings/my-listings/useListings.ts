import { PaginatedListingResponse } from "@/gql/graphql";
import ListingService from "@/services/listing.service";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
export const useListings = (): {
  listings: PaginatedListingResponse | null | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(16));
  const [query, setQuery] = useQueryState("query");

  const {
    isLoading,
    isError,
    data: listings,
  } = useQuery({
    queryKey: ["listings", page, limit, query],
    queryFn: () =>
      ListingService.myListings({
        page,
        limit,
        search: query || undefined,
      }),
  });

  return { isLoading, isError, listings };
};
