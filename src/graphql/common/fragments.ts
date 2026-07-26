import { gql } from "@apollo/client";

export const PAGINATION_FRAGMENT = gql`
  fragment PaginationFields on PaginationMeta {
    total
    page
    limit
    totalPages
    hasNext
    hasPrevious
  }
`;

export const PROVIDER_FRAGMENT = gql`
  fragment ProviderSummary on Provider {
    id
    name
    commercialName
    avatarFilename
    address
    latitude
    longitude
    phone
    dialCode
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserSummary on User {
    id
    name
    avatarFilename
    address
    latitude
    longitude
    phone
    dialCode
  }
`;

export const LISTING_FRAGMENT = gql`
  fragment ListingSummary on Listing {
    id
    name
    description
    price
    type
    status
    promotionStatus
    promotionCycle
    featuredStartsAt
    featuredEndsAt
    categoryId
    providerId
    photos {
      id
      filename
      originalFilename
      type
      sortOrder
      size
    }
    category {
      id
      nameAr
      nameEn
      rulesAr
      rulesEn
      contractDocumentEnabled
      contractDocumentText
      undertakingTextAr
      undertakingTextEn
      undertakingEnabled
      refundPolicyAr
      refundPolicyEn
      refundPolicyEnabled
      commissionPercent
      minCommissionAmount
    }
    provider {
      ...ProviderSummary
    }
  }
  ${PROVIDER_FRAGMENT}
`;

export const PAYMENT_FRAGMENT = gql`
  fragment PaymentSummary on Payment {
    id
    purpose
    status
    amount
    payerType
    paymentMethod
    transactionReference
    configSnapshot
    contractId
    conversationId
    listingId
    createdAt
  }
`;
