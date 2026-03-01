import { MeProviderQuery } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const ME_PROVIDER_QUERY: TypedDocumentNode<MeProviderQuery> = gql`
  query meProvider {
    meProvider {
      address
      avatarFilename
      bankName
      city {
        countryId
        createdAt
        id
        nameAr
        nameEn
        publicId
        updatedAt
      }
      categories {
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
      }
      cityId
      commercialName
      commercialRegistrationFilename
      commercialRegistrationNumber
      countryId
      country {
        code
        createdAt
        dialCode
        id
        nameAr
        nameEn
        publicId
        updatedAt
      }
      createdAt
      deactivationReason
      deleteReason
      deletedAt
      dialCode
      email
      emailVerified
      ibanNumber
      id
      isActive
      languageCode
      latitude
      longitude
      name
      withAbsher
      updatedAt
      status
      signedContract {
        acceptedRulesAr {
          label
          value
        }
        acceptedRulesEn {
          label
          value
        }
        contractExpiresAt
        contractSignedAt
        createdAt
        id
        platformManagerName
        platformManagerSignature
        providerId
        publicId
        serviceProviderSignature
        status
        terminationReason
        updatedAt
      }
      publicId
      phoneVerified
      phone
    }
  }
`;
