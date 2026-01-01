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
        cityId
      }
    }
  }
`;
