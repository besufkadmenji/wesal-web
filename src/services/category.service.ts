import { PaginatedCategoryResponse } from "@/gql/graphql";
import { CATEGORIES_QUERY } from "@/graphql/category/categories";
import client from "@/utils/apollo.client";

class CategoryService {
  static categories = async (): Promise<PaginatedCategoryResponse | null> => {
    try {
      const categoriesResult = await client().query({
        query: CATEGORIES_QUERY,
      });
      return categoriesResult.data?.categories ?? null;
    } catch (e) {
      console.error("categories", e);
    }
    return null;
  };
}

export default CategoryService;
