import {
    VerifyPasswordResetOtpMutation,
    VerifyPasswordResetOtpMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const VERIFY_PASSWORD_RESET_OTP_MUTATION: TypedDocumentNode<
  VerifyPasswordResetOtpMutation,
  VerifyPasswordResetOtpMutationVariables
> = gql`
  mutation verifyPasswordResetOtp($input: VerifyPasswordResetOtpInput!) {
    verifyPasswordResetOtp(input: $input) {
      resetToken
    }
  }
`;
