import { CategoryStatus, type Category } from "@/gql/graphql";

/**
 * S4-56: new ads can't go into an inactive section. When editing, the ad's
 * current section stays selectable even if it has since been switched off.
 */
export const selectableCategories = <T extends Pick<Category, "id" | "status">>(
  categories: T[],
  currentCategoryId?: string | null,
): T[] =>
  categories.filter(
    (category) =>
      category.status !== CategoryStatus.Inactive ||
      category.id === currentCategoryId,
  );
