import { CategoryQuery, CategoryQueryVariables } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const CATEGORY_QUERY: TypedDocumentNode<
  CategoryQuery,
  CategoryQueryVariables
> = gql`
  query category($categoryId: String!) {
    category(id: $categoryId) {
      createdAt
      descriptionAr
      descriptionEn
      id
      image
      nameAr
      nameEn
      publicId
      rulesAr
      rulesEn
      updatedAt
      status
    }
  }
`;
