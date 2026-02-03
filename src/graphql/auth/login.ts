import { LoginMutation, LoginMutationVariables } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const LOGIN_MUTATION: TypedDocumentNode<
  LoginMutation,
  LoginMutationVariables
> = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      user {
        address
        avatarFilename
        bankName
        cityId
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
      }
    }
  }
`;
