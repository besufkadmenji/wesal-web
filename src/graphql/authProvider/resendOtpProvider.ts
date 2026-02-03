import {
  ResendProviderOtpMutation,
  ResendProviderOtpMutationVariables,
} from "@/gql/graphql";
import { gql } from "@apollo/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export const RESEND_PROVIDER_OTP_MUTATION: TypedDocumentNode<
  ResendProviderOtpMutation,
  ResendProviderOtpMutationVariables
> = gql`
  mutation resendProviderOtp($input: ResendOtpInput!) {
    resendProviderOtp(input: $input)
  }
`;
