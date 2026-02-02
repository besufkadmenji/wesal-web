import {
  LoginProviderMutation,
  LoginProviderMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const LOGIN_PROVIDER_MUTATION: TypedDocumentNode<
  LoginProviderMutation,
  LoginProviderMutationVariables
> = gql`
  mutation loginProvider($input: LoginProviderInput!) {
    loginProvider(input: $input) {
      accessToken
      provider {
        address
        avatarFilename
        bankName
        cityId
        commercialName
        commercialRegistrationFilename
        commercialRegistrationNumber
        countryId
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
        phone
        phoneVerified
        status
        updatedAt
        withAbsher
      }
    }
  }
`;
