import {
  RegisterProviderMutation,
  RegisterProviderMutationVariables
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const REGISTER_PROVIDER_MUTATION: TypedDocumentNode<
  RegisterProviderMutation,
  RegisterProviderMutationVariables
> = gql`
  mutation registerProvider($input: RegisterProviderInput!) {
    registerProvider(input: $input) {
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
    }
  }
`;
