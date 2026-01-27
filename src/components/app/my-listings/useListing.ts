import { PaginatedListingResponse } from "@/gql/graphql";
import ListingService from "@/services/listing.service";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
export const useListing = (): {
  listings: PaginatedListingResponse | null | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(16));
  const {
    isLoading,
    isError,
    data: listings,
  } = useQuery({
    queryKey: ["listings", page, limit],
    queryFn: () =>
      ListingService.myListings({
        page,
        limit,
      }),
  });

  return { isLoading, isError, listings };
};
