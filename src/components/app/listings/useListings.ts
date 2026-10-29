import { Category, PaginatedListingResponse } from "@/gql/graphql";
import CategoryService from "@/services/category.service";
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
  const [categoryId, setCategoryId] = useQueryState("category");
  const [minPrice, setMinPrice] = useQueryState("minPrice", parseAsInteger);
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", parseAsInteger);
  const [cityId, setCityId] = useQueryState("city");
  const [minRating] = useQueryState("rating", parseAsInteger);

  const [query, setQuery] = useQueryState("query");

  const {
    isLoading,
    isError,
    data: listings,
  } = useQuery({
    queryKey: [
      "listings",
      page,
      limit,
      query,
      categoryId,
      minPrice,
      maxPrice,
      cityId,
      minRating,
    ],
    queryFn: () =>
      ListingService.listings({
        page,
        limit,
        search: query || undefined,
        categoryId,
        minPrice,
        maxPrice,
        cityId,
        minRating,
      }),
  });

  return { isLoading, isError, listings };
};

export const useCategory = (
  categoryId?: string,
): {
  category: Category | null | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const {
    isLoading,
    isError,
    data: category,
  } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => CategoryService.category(categoryId || ""),
    enabled: !!categoryId,
  });

  return { isLoading, isError, category };
};
