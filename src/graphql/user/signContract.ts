import {
  SignContractMutation,
  SignContractMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const SIGN_CONTRACT_MUTATION: TypedDocumentNode<
  SignContractMutation,
  SignContractMutationVariables
> = gql`
  mutation signContract($input: SignContractInput!) {
    signContract(input: $input) {
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
        acceptedRulesAr
        acceptedRulesEn
        id
        createdAt
        publicId
        updatedAt
        userId
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
