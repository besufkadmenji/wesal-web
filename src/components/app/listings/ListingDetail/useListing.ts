import { Listing } from "@/gql/graphql";
import ListingService from "@/services/listing.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
export const useListing = (): {
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
    queryKey: ["listing", id],
    queryFn: () => ListingService.listing(id),
  });

  return { isLoading, isError, listing };
};
