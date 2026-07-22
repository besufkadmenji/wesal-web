import { CategoriesQuery, CategoriesQueryVariables } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const CATEGORIES_QUERY: TypedDocumentNode<
  CategoriesQuery,
  CategoriesQueryVariables
> = gql`
  query categories($input: CategoryPaginationInput) {
    categories(input: $input) {
      meta {
        hasNext
        hasPrevious
        limit
        page
        total
        totalPages
      }
      items {
        commissionEnabled
        commissionPercent
        contractDocumentEnabled
        contractDocumentText
        customerConversationFee
        customerConversationFeeEnabled
        depositEnabled
        depositPercent
        maxCompletionDays
        maxCompletionDaysEnabled
        maxTerminationDays
        maxTerminationDaysEnabled
        minCommissionAmount
        minCommissionEnabled
        providerConversationFee
        providerConversationFeeEnabled
        createdAt
        descriptionAr
        descriptionEn
        id
        nameAr
        nameEn
        image
        updatedAt
        rulesEn
        rulesAr
        status
        publicId
      }
    }
  }
`;
