import {
  SignProviderContractMutation,
  SignProviderContractMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const SIGN_CONTRACT_MUTATION: TypedDocumentNode<
  SignProviderContractMutation,
  SignProviderContractMutationVariables
> = gql`
  mutation signProviderContract($input: SignContractInput!) {
    signProviderContract(input: $input) {
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
        rulesEn
        rulesAr
        image
        publicId
      }
      withAbsher
      status
      signedContract {
        contractExpiresAt
        contractSignedAt
        platformManagerSignature
        serviceProviderSignature
        status
        platformManagerName
        terminationReason
        acceptedRulesAr {
          label
          value
        }
        acceptedRulesEn {
          label
          value
        }
        id
        createdAt
        publicId
        updatedAt
        providerId
      }
      deactivationReason
      deleteReason
      deletedAt
      commercialName
      commercialRegistrationFilename
      publicId
    }
  }
`;
