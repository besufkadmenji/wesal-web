import {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResendOtpInput,
  ResetPasswordWithTokenInput,
  VerifyOtpInput,
  VerifyPasswordResetOtpInput,
} from "@/gql/graphql";
import { LOGIN_MUTATION } from "@/graphql/auth/login";
import { parseGraphQLError } from "@/utils/parse-graphql-error";
import client from "@/utils/apollo.client";
import { REGISTER_MUTATION } from "@/graphql/auth/register";
import { VERIFY_OTP_MUTATION } from "@/graphql/auth/verifyOtp";
import { RESEND_OTP_MUTATION } from "@/graphql/auth/resendOtp";
import { FORGOT_PASSWORD_MUTATION } from "@/graphql/auth/forgotPassword";
import { RESET_PASSWORD_MUTATION } from "@/graphql/auth/resetPassword";
import { VERIFY_PASSWORD_RESET_OTP_MUTATION } from "@/graphql/auth/verifyPasswordResetOtp";

class AuthService {
  static login = async (input: LoginInput) => {
    try {
      const loginResponse = await client().mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          input,
        },
      });
      return loginResponse.data?.login ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static register = async (input: RegisterInput) => {
    try {
      const registerResponse = await client().mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          input,
        },
      });
      return registerResponse.data?.register ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static verifyOtp = async (input: VerifyOtpInput) => {
    try {
      const otpVerificationResponse = await client().mutate({
        mutation: VERIFY_OTP_MUTATION,
        variables: {
          input,
        },
      });
      return otpVerificationResponse.data?.verifyOtp ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static verifyPasswordResetOtp = async (input: VerifyPasswordResetOtpInput) => {
    try {
      const otpVerificationResponse = await client().mutate({
        mutation: VERIFY_PASSWORD_RESET_OTP_MUTATION,
        variables: {
          input,
        },
      });
      return otpVerificationResponse.data?.verifyPasswordResetOtp ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static resendOtp = async (input: ResendOtpInput) => {
    try {
      const resendOtpMutationResponse = await client().mutate({
        mutation: RESEND_OTP_MUTATION,
        variables: {
          input,
        },
      });
      return resendOtpMutationResponse.data?.resendOtp ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };

  static forgotPassword = async (input: ForgotPasswordInput) => {
    try {
      const forgotPasswordMutationResponse = await client().mutate({
        mutation: FORGOT_PASSWORD_MUTATION,
        variables: {
          input,
        },
      });
      return forgotPasswordMutationResponse.data?.forgotPassword ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static resetPassword = async (input: ResetPasswordWithTokenInput) => {
    try {
      const resetPasswordMutationResponse = await client().mutate({
        mutation: RESET_PASSWORD_MUTATION,
        variables: {
          input,
        },
      });
      return resetPasswordMutationResponse.data?.resetPassword ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
}

export default AuthService;
