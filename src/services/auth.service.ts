import {
  ChangeEmailInput,
  ChangePasswordInput,
  ChangePhoneInput,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResendOtpInput,
  ResetPasswordWithTokenInput,
  VerifyChangeEmailInput,
  VerifyChangePhoneInput,
  VerifyOtpInput,
  VerifyPasswordResetOtpInput,
} from "@/gql/graphql";
import { CHANGE_PASSWORD_MUTATION } from "@/graphql/auth/changePassword";
import { FORGOT_PASSWORD_MUTATION } from "@/graphql/auth/forgotPassword";
import { INITIATE_EMAIL_CHANGE_MUTATION } from "@/graphql/auth/initiateEmailChange";
import { INITIATE_PHONE_CHANGE_MUTATION } from "@/graphql/auth/initiatePhoneChange";
import { LOGIN_MUTATION } from "@/graphql/auth/login";
import { REGISTER_MUTATION } from "@/graphql/auth/register";
import { RESEND_OTP_MUTATION } from "@/graphql/auth/resendOtp";
import { RESET_PASSWORD_MUTATION } from "@/graphql/auth/resetPassword";
import { VERIFY_EMAIL_CHANGE_MUTATION } from "@/graphql/auth/verifyEmailChange";
import { VERIFY_OTP_MUTATION } from "@/graphql/auth/verifyOtp";
import { VERIFY_PASSWORD_RESET_OTP_MUTATION } from "@/graphql/auth/verifyPasswordResetOtp";
import { VERIFY_PHONE_CHANGE_MUTATION } from "@/graphql/auth/verifyPhoneChange";
import client from "@/utils/apollo.client";
import { parseGraphQLError } from "@/utils/parse-graphql-error";
import { requireOperationField } from "@/utils/apollo.result";

class AuthService {
  static login = async (input: LoginInput) => {
    try {
      const loginResponse = await client().mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(loginResponse, "login", "Login");
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
      return requireOperationField(registerResponse, "register", "Register");
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
      return requireOperationField(
        otpVerificationResponse,
        "verifyOtp",
        "Verify OTP",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static verifyPasswordResetOtp = async (
    input: VerifyPasswordResetOtpInput,
  ) => {
    try {
      const otpVerificationResponse = await client().mutate({
        mutation: VERIFY_PASSWORD_RESET_OTP_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        otpVerificationResponse,
        "verifyPasswordResetOtp",
        "Verify password reset OTP",
      );
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
      return requireOperationField(
        resendOtpMutationResponse,
        "resendOtp",
        "Resend OTP",
      );
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
      return requireOperationField(
        forgotPasswordMutationResponse,
        "forgotPassword",
        "Forgot password",
      );
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
      return requireOperationField(
        resetPasswordMutationResponse,
        "resetPassword",
        "Reset password",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static changePassword = async (input: ChangePasswordInput) => {
    try {
      const changePasswordMutationResponse = await client().mutate({
        mutation: CHANGE_PASSWORD_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        changePasswordMutationResponse,
        "changePassword",
        "Change password",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static initiateEmailChange = async (input: ChangeEmailInput) => {
    try {
      const initiateEmailChangeMutationResponse = await client().mutate({
        mutation: INITIATE_EMAIL_CHANGE_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        initiateEmailChangeMutationResponse,
        "initiateEmailChange",
        "Initiate email change",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static initiatePhoneChange = async (input: ChangePhoneInput) => {
    try {
      const initiatePhoneChangeMutationResponse = await client().mutate({
        mutation: INITIATE_PHONE_CHANGE_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        initiatePhoneChangeMutationResponse,
        "initiatePhoneChange",
        "Initiate phone change",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static verifyChangePhone = async (input: VerifyChangePhoneInput) => {
    try {
      const verifyPhoneChangeMutationResponse = await client().mutate({
        mutation: VERIFY_PHONE_CHANGE_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        verifyPhoneChangeMutationResponse,
        "verifyPhoneChange",
        "Verify phone change",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static verifyChangeEmail = async (input: VerifyChangeEmailInput) => {
    try {
      const verifyEmailChangeMutationResponse = await client().mutate({
        mutation: VERIFY_EMAIL_CHANGE_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        verifyEmailChangeMutationResponse,
        "verifyEmailChange",
        "Verify email change",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
}

export default AuthService;
