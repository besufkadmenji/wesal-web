import {
  CategoryPaginationInput,
  PaginatedCategoryResponse,
} from "@/gql/graphql";
import CategoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
export const useCategories = (
  input?: CategoryPaginationInput,
): {
  categories: PaginatedCategoryResponse | null | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(20));
  const [search] = useQueryState("query", parseAsString.withDefault(""));

  const {
    isLoading,
    isError,
    data: categories,
  } = useQuery({
    queryKey: ["categories", page, limit, search, input],
    queryFn: () =>
      CategoryService.categories({
        page,
        limit,
        ...(search && { search }),
        ...(input || {}),
      }),
  });

  return { isLoading, isError, categories };
};

export const useSearchCategories = (
  input?: CategoryPaginationInput,
): {
  categories: PaginatedCategoryResponse | null | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const {
    isLoading,
    isError,
    data: categories,
  } = useQuery({
    queryKey: ["searchCategories", search, input],
    queryFn: () =>
      CategoryService.categories({
        page: 1,
        limit: 9999,
        ...(search && { search }),
        ...(input || {}),
      }),
  });

  return { isLoading, isError, categories };
};
