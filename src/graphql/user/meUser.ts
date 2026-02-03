import { MeUserQuery } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const ME_USER_QUERY: TypedDocumentNode<MeUserQuery> = gql`
  query meUser {
    meUser {
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
      status
      deactivationReason
      deleteReason
      deletedAt
      publicId
      withAbsher
    }
  }
`;
