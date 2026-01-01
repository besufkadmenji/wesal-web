import { ResendOtpMutation, ResendOtpMutationVariables } from "@/gql/graphql";
import { gql } from "@apollo/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export const RESEND_OTP_MUTATION: TypedDocumentNode<
  ResendOtpMutation,
  ResendOtpMutationVariables
> = gql`
  mutation resendOtp($input: ResendOtpInput!) {
    resendOtp(input: $input)
  }
`;
