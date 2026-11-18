import { Listing } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import ListingService from "@/services/listing.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

/**
 * One ad by the route id. Owner pages read `myListing`, which also returns
 * the owner's expired ads (S4-59); the public query hides them.
 */
export const useListing = ({
  ownerMode = false,
}: { ownerMode?: boolean } = {}): {
  listing: Listing | null | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const params = useParams();
  const id = `${params.id}`;
  const {
    isLoading,
    isError,
    data: listing,
  } = useQuery({
    queryKey: ownerMode ? queryKeys.ownerListing(id) : ["listing", id],
    queryFn: () =>
      ownerMode ? ListingService.ownerListing(id) : ListingService.listing(id),
  });

  return { isLoading, isError, listing };
};
