import { CategoryQuery, CategoryQueryVariables } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const CATEGORY_QUERY: TypedDocumentNode<
  CategoryQuery,
  CategoryQueryVariables
> = gql`
  query category($categoryId: String!) {
    category(id: $categoryId) {
      commissionEnabled
      commissionPercent
      contractDocumentEnabled
      contractDocumentText
      undertakingTextAr
      undertakingTextEn
      undertakingEnabled
      refundPolicyAr
      refundPolicyEn
      refundPolicyEnabled
      customerConversationFee
      customerConversationFeeEnabled
      depositEnabled
      depositPercent
      maxExecutionHours
      maxExecutionHoursEnabled
      maxTerminationHours
      maxTerminationHoursEnabled
      minCommissionAmount
      minCommissionEnabled
      providerConversationFee
      providerConversationFeeEnabled
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
