import { VerifyOtpMutation, VerifyOtpMutationVariables } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const VERIFY_OTP_MUTATION: TypedDocumentNode<
  VerifyOtpMutation,
  VerifyOtpMutationVariables
> = gql`
  mutation verifyOtp($input: VerifyOtpInput!) {
    verifyOtp(input: $input)
  }
`;
