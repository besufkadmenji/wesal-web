import {
  LISTING_FRAGMENT,
  PAGINATION_FRAGMENT,
  PAYMENT_FRAGMENT,
  PROVIDER_FRAGMENT,
  USER_FRAGMENT,
} from "@/graphql/common/fragments";
import { gql } from "@apollo/client";

const SIGNATURE_FRAGMENT = gql`
  fragment ContractSignatureFields on ContractSignature {
    id
    signerId
    signerType
    signatureType
    signatureData
    signedAt
  }
`;

const CONTRACT_FRAGMENT = gql`
  fragment ContractFields on Contract {
    id
    publicId
    conversationId
    listingId
    clientId
    providerId
    categoryId
    version
    pricingVersion
    status
    supersedesContractId
    agreedPrice
    depositPercent
    downPayment
    commissionPercent
    commissionAmount
    vatRate
    vatAmount
    totalPayable
    providerNetAmount
    customerAddress
    customerLatitude
    customerLongitude
    providerAddress
    providerLatitude
    providerLongitude
    deliveryCompanyId
    deliveryCompanyNameAr
    deliveryCompanyNameEn
    deliveryTimeDays
    categoryRulesAr
    categoryRulesEn
    contractDocumentText
    maxCompletionDays
    maxTerminationDays
    rejectionReason
    acceptedAt
    rejectedAt
    createdAt
    updatedAt
    signatures {
      ...ContractSignatureFields
    }
    client {
      ...UserSummary
    }
    provider {
      ...ProviderSummary
    }
    conversation {
      id
      status
      listing {
        ...ListingSummary
      }
    }
    supersedesContract {
      id
      version
      status
      rejectionReason
      createdAt
    }
  }
  ${SIGNATURE_FRAGMENT}
  ${USER_FRAGMENT}
  ${PROVIDER_FRAGMENT}
  ${LISTING_FRAGMENT}
`;

const CONTRACT_REFERENCE_FRAGMENT = gql`
  fragment ContractReferenceFields on Contract {
    id
    publicId
    conversationId
    status
  }
`;

export const CONTRACTS_QUERY = gql`
  query Contracts($input: ContractPaginationInput) {
    contracts(input: $input) {
      items {
        ...ContractFields
      }
      meta {
        ...PaginationFields
      }
    }
  }
  ${CONTRACT_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

export const CONTRACT_QUERY = gql`
  query ContractById($id: String!) {
    contract(id: $id) {
      ...ContractFields
    }
  }
  ${CONTRACT_FRAGMENT}
`;

export const CONTRACT_QUOTE_QUERY = gql`
  query ContractQuote($input: ContractQuoteInput!) {
    contractQuote(input: $input) {
      agreedPrice
      depositPercent
      downPayment
      commissionPercent
      commissionAmount
      vatRate
      vatAmount
      totalPayable
      providerNetAmount
      contractDocumentText
      maxCompletionDays
      maxTerminationDays
    }
  }
`;

export const INITIALIZE_CONTRACT_MUTATION = gql`
  mutation InitializeContract($input: InitializeContractInput!) {
    initializeContract(input: $input) {
      ...ContractReferenceFields
    }
  }
  ${CONTRACT_REFERENCE_FRAGMENT}
`;

export const CREATE_CONTRACT_MUTATION = gql`
  mutation CreateContract($input: CreateContractInput!) {
    createContract(input: $input) {
      ...ContractReferenceFields
    }
  }
  ${CONTRACT_REFERENCE_FRAGMENT}
`;

export const ACCEPT_CONTRACT_MUTATION = gql`
  mutation AcceptContract($input: AcceptContractInput!) {
    acceptContract(input: $input) {
      ...ContractFields
    }
  }
  ${CONTRACT_FRAGMENT}
`;

export const REJECT_CONTRACT_MUTATION = gql`
  mutation RejectContract($input: RejectContractInput!) {
    rejectContract(input: $input) {
      ...ContractFields
    }
  }
  ${CONTRACT_FRAGMENT}
`;

export const RESEND_CONTRACT_MUTATION = gql`
  mutation ResendContract($input: ResendContractInput!) {
    resendContract(input: $input) {
      ...ContractFields
    }
  }
  ${CONTRACT_FRAGMENT}
`;

export const PAY_CONTRACT_MUTATION = gql`
  mutation PayContract($contractId: String!) {
    payContract(contractId: $contractId) {
      payment {
        ...PaymentSummary
      }
      contract {
        ...ContractFields
      }
    }
  }
  ${PAYMENT_FRAGMENT}
  ${CONTRACT_FRAGMENT}
`;

export const COMPLETE_CONTRACT_MUTATION = gql`
  mutation CompleteContract($input: CompleteContractInput!) {
    completeContract(input: $input) {
      ...ContractFields
    }
  }
  ${CONTRACT_FRAGMENT}
`;
