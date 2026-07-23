import ListingService from "@/services/listing.service";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";

export const useListings = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(16));
  const [query] = useQueryState("query");

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

  return { isLoading, isError, listings, page, setPage };
};
