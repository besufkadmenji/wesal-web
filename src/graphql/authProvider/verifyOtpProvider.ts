import {
  VerifyProviderOtpMutation,
  VerifyProviderOtpMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const VERIFY_PROVIDER_OTP_MUTATION: TypedDocumentNode<
  VerifyProviderOtpMutation,
  VerifyProviderOtpMutationVariables
> = gql`
  mutation verifyProviderOtp($input: VerifyOtpInput!) {
    verifyProviderOtp(input: $input)
  }
`;
