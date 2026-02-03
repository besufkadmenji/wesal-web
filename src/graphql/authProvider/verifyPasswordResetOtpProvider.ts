import {
  VerifyProviderPasswordResetOtpMutation,
  VerifyProviderPasswordResetOtpMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const VERIFY_PROVIDER_PASSWORD_RESET_OTP_MUTATION: TypedDocumentNode<
  VerifyProviderPasswordResetOtpMutation,
  VerifyProviderPasswordResetOtpMutationVariables
> = gql`
  mutation verifyProviderPasswordResetOtp(
    $input: VerifyPasswordResetOtpInput!
  ) {
    verifyProviderPasswordResetOtp(input: $input) {
      resetToken
    }
  }
`;
