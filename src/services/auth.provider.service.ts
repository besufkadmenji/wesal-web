import {
  ChangeEmailInput,
  ChangePasswordInput,
  ChangePhoneInput,
  ForgotPasswordInput,
  LoginInput,
  RegisterProviderInput,
  ResendOtpInput,
  ResetPasswordWithTokenInput,
  VerifyChangeEmailInput,
  VerifyChangePhoneInput,
  VerifyOtpInput,
  VerifyPasswordResetOtpInput,
} from "@/gql/graphql";
import { CHANGE_PROVIDER_PASSWORD_MUTATION } from "@/graphql/authProvider/changeProviderPassword";
import { FORGOT_PROVIDER_PASSWORD_MUTATION } from "@/graphql/authProvider/forgotPasswordProvider";
import { INITIATE_PROVIDER_EMAIL_CHANGE_MUTATION } from "@/graphql/authProvider/initiateEmailChangeProvider";
import { INITIATE_PROVIDER_PHONE_CHANGE_MUTATION } from "@/graphql/authProvider/initiatePhoneChangeProvider";
import { LOGIN_PROVIDER_MUTATION } from "@/graphql/authProvider/loginProvider";
import { REGISTER_PROVIDER_MUTATION } from "@/graphql/authProvider/registerProvider";
import { RESEND_PROVIDER_OTP_MUTATION } from "@/graphql/authProvider/resendOtpProvider";
import { RESET_PROVIDER_PASSWORD_MUTATION } from "@/graphql/authProvider/resetPasswordProvider";
import { VERIFY_PROVIDER_EMAIL_CHANGE_MUTATION } from "@/graphql/authProvider/verifyEmailChangeProvider";
import { VERIFY_PROVIDER_OTP_MUTATION } from "@/graphql/authProvider/verifyOtpProvider";
import { VERIFY_PROVIDER_PASSWORD_RESET_OTP_MUTATION } from "@/graphql/authProvider/verifyPasswordResetOtpProvider";
import { VERIFY_PROVIDER_PHONE_CHANGE_MUTATION } from "@/graphql/authProvider/verifyPhoneChangeProvider";
import client from "@/utils/apollo.client";
import { parseGraphQLError } from "@/utils/parse-graphql-error";
import { requireOperationField } from "@/utils/apollo.result";

class AuthProviderService {
  static loginProvider = async (input: LoginInput) => {
    try {
      const loginResponse = await client().mutate({
        mutation: LOGIN_PROVIDER_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        loginResponse,
        "loginProvider",
        "Provider login",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static register = async (input: RegisterProviderInput) => {
    try {
      const registerResponse = await client().mutate({
        mutation: REGISTER_PROVIDER_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        registerResponse,
        "registerProvider",
        "Register provider",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static verifyOtp = async (input: VerifyOtpInput) => {
    try {
      const otpVerificationResponse = await client().mutate({
        mutation: VERIFY_PROVIDER_OTP_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        otpVerificationResponse,
        "verifyProviderOtp",
        "Verify provider OTP",
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
        mutation: VERIFY_PROVIDER_PASSWORD_RESET_OTP_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        otpVerificationResponse,
        "verifyProviderPasswordResetOtp",
        "Verify provider password reset OTP",
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
        mutation: RESEND_PROVIDER_OTP_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        resendOtpMutationResponse,
        "resendProviderOtp",
        "Resend provider OTP",
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
        mutation: FORGOT_PROVIDER_PASSWORD_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        forgotPasswordMutationResponse,
        "forgotProviderPassword",
        "Forgot provider password",
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
        mutation: RESET_PROVIDER_PASSWORD_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        resetPasswordMutationResponse,
        "resetProviderPassword",
        "Reset provider password",
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
        mutation: CHANGE_PROVIDER_PASSWORD_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        changePasswordMutationResponse,
        "changeProviderPassword",
        "Change provider password",
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
        mutation: INITIATE_PROVIDER_EMAIL_CHANGE_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        initiateEmailChangeMutationResponse,
        "initiateProviderEmailChange",
        "Initiate provider email change",
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
        mutation: INITIATE_PROVIDER_PHONE_CHANGE_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        initiatePhoneChangeMutationResponse,
        "initiateProviderPhoneChange",
        "Initiate provider phone change",
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
        mutation: VERIFY_PROVIDER_PHONE_CHANGE_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        verifyPhoneChangeMutationResponse,
        "verifyProviderPhoneChange",
        "Verify provider phone change",
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
        mutation: VERIFY_PROVIDER_EMAIL_CHANGE_MUTATION,
        variables: {
          input,
        },
      });
      return requireOperationField(
        verifyEmailChangeMutationResponse,
        "verifyProviderEmailChange",
        "Verify provider email change",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
}

export default AuthProviderService;
