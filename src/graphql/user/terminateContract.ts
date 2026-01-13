import { TerminateContractMutation } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const TERMINATE_CONTRACT_MUTATION: TypedDocumentNode<TerminateContractMutation> = gql`
  mutation terminateContract($terminationReason: String!) {
    terminateContract(terminationReason: $terminationReason) {
      id
      name
      isActive
      languageCode
      address
      avatarFilename
      cityId
      countryId
      createdAt
      dialCode
      email
      emailVerified
      latitude
      longitude
      phone
      phoneVerified
      role
      updatedAt
      ibanNumber
      bankName
      commercialRegistrationNumber
      categories {
        id
        createdAt
        descriptionAr
        descriptionEn
        nameAr
        nameEn
        updatedAt
      }
      withAbsher
      status
      signedContract {
        contractExpiresAt
        contractSignedAt
        platformManagerSignature
        serviceProviderSignature
        status
      }
      deactivationReason
      deleteReason
      deletedAt
      commercialName
      commercialRegistrationFilename
    }
  }
`;
