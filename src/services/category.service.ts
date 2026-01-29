import {
  Category,
  CategoryPaginationInput,
  PaginatedCategoryResponse,
} from "@/gql/graphql";
import { CATEGORIES_QUERY } from "@/graphql/category/categories";
import { CATEGORY_QUERY } from "@/graphql/category/category";
import client from "@/utils/apollo.client";

class CategoryService {
  static categories = async (
    input: CategoryPaginationInput,
  ): Promise<PaginatedCategoryResponse | null> => {
    try {
      const categoriesResult = await client().query({
        query: CATEGORIES_QUERY,
        variables: {
          input,
        },
      });
      return categoriesResult.data?.categories ?? null;
    } catch (e) {
      console.error("categories", e);
    }
    return null;
  };
  static category = async (categoryId: string): Promise<Category | null> => {
    try {
      const categoriesResult = await client().query({
        query: CATEGORY_QUERY,
        variables: {
          categoryId,
        },
      });
      return categoriesResult.data?.category ?? null;
    } catch (e) {
      console.error("categories", e);
    }
    return null;
  };
}

export default CategoryService;
