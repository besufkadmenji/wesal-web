import { MeQuery } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const ME_QUERY: TypedDocumentNode<MeQuery> = gql`
  query me {
    me {
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
