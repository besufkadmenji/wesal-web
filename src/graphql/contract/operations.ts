import {
  LISTING_FRAGMENT,
  PAGINATION_FRAGMENT,
  PAYMENT_FRAGMENT,
  PROVIDER_FRAGMENT,
  USER_FRAGMENT,
} from "@/graphql/common/fragments";
import { CONTRACT_RATING_FRAGMENT } from "@/graphql/rating/operations";
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
    statusGroup
    supersedesContractId
    agreedPrice
    depositPercent
    downPayment
    commissionPercent
    commissionAmount
    isCharity
    charityAmount
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
    executionHours
    categoryRulesAr
    categoryRulesEn
    contractDocumentText
    undertakingTextAr
    undertakingTextEn
    refundPolicyAr
    refundPolicyEn
    maxExecutionHours
    maxTerminationHours
    rejectionReason
    cancellationReason
    disputeReason
    paidAt
    acceptedAt
    rejectedAt
    providerCompletedAt
    deliveryStartedAt
    deliveryHours
    confirmationDeadlineAt
    cancellationRequestedAt
    disputedAt
    completedAt
    cancelledAt
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
    settlements {
      id
      type
      amount
      reason
      createdAt
    }
    audits {
      id
      actorType
      action
      previousStatus
      newStatus
      reason
      createdAt
    }
    document {
      id
      version
      sha256
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

/** S4-4 / S4-19: the signed-in party's overdue contracts, oldest first. */
export const MY_OVERDUE_CONTRACTS_QUERY = gql`
  query MyOverdueContracts {
    myOverdueContracts {
      ...ContractFields
    }
  }
  ${CONTRACT_FRAGMENT}
`;

export const CONTRACT_QUERY = gql`
  query ContractById($id: String!) {
    contract(id: $id) {
      ...ContractFields
      rating {
        ...ContractRatingFields
      }
    }
  }
  ${CONTRACT_FRAGMENT}
  ${CONTRACT_RATING_FRAGMENT}
`;

export const CONTRACT_QUOTE_QUERY = gql`
  query ContractQuote($input: ContractQuoteInput!) {
    contractQuote(input: $input) {
      agreedPrice
      depositPercent
      downPayment
      commissionPercent
      commissionAmount
      isCharity
      charityAmount
      vatRate
      vatAmount
      totalPayable
      providerNetAmount
      contractDocumentText
      undertakingTextAr
      undertakingTextEn
      refundPolicyAr
      refundPolicyEn
      maxExecutionHours
      maxTerminationHours
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

export const PROVIDER_COMPLETE_CONTRACT_MUTATION = gql`
  mutation ProviderCompleteContract($input: ProviderCompleteContractInput!) {
    providerCompleteContract(input: $input) {
      ...ContractFields
    }
  }
  ${CONTRACT_FRAGMENT}
`;

export const REQUEST_CONTRACT_CANCELLATION_MUTATION = gql`
  mutation RequestContractCancellation($input: CancelContractInput!) {
    requestContractCancellation(input: $input) {
      ...ContractFields
    }
  }
  ${CONTRACT_FRAGMENT}
`;

export const REFUSE_CONTRACT_DELIVERY_MUTATION = gql`
  mutation RefuseContractDelivery($input: RefuseDeliveryInput!) {
    refuseContractDelivery(input: $input) {
      ...ContractFields
    }
  }
  ${CONTRACT_FRAGMENT}
`;
