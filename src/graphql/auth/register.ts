import { RegisterMutation, RegisterMutationVariables } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const REGISTER_MUTATION: TypedDocumentNode<
  RegisterMutation,
  RegisterMutationVariables
> = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      name
      phone
      id
      isActive
      languageCode
      latitude
      longitude
      phoneVerified
      updatedAt
      emailVerified
      email
      dialCode
      address
      avatarFilename
      cityId
      countryId
      createdAt
      withAbsher
      bankName
      ibanNumber
    }
  }
`;
