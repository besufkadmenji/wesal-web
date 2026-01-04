import { PaginatedCategoryResponse } from "@/gql/graphql";
import CategoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
export const useCategories = (): {
  categories: PaginatedCategoryResponse | null | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const {
    isLoading,
    isError,
    data: categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.categories(),
  });

  return { isLoading, isError, categories };
};
