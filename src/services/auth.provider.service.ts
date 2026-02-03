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

class AuthProviderService {
  static loginProvider = async (input: LoginInput) => {
    try {
      const loginResponse = await client().mutate({
        mutation: LOGIN_PROVIDER_MUTATION,
        variables: {
          input,
        },
      });
      return loginResponse.data?.loginProvider ?? null;
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
      return registerResponse.data?.registerProvider ?? null;
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
      return otpVerificationResponse.data?.verifyProviderOtp ?? null;
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
      return (
        otpVerificationResponse.data?.verifyProviderPasswordResetOtp ?? null
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
      return resendOtpMutationResponse.data?.resendProviderOtp ?? null;
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
      return (
        forgotPasswordMutationResponse.data?.forgotProviderPassword ?? null
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
      return resetPasswordMutationResponse.data?.resetProviderPassword ?? null;
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
      return (
        changePasswordMutationResponse.data?.changeProviderPassword ?? null
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
      return (
        initiateEmailChangeMutationResponse.data?.initiateProviderEmailChange ??
        null
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
      return (
        initiatePhoneChangeMutationResponse.data?.initiateProviderPhoneChange ??
        null
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
      return (
        verifyPhoneChangeMutationResponse.data?.verifyProviderPhoneChange ??
        null
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
      return (
        verifyEmailChangeMutationResponse.data?.verifyProviderEmailChange ??
        null
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
}

export default AuthProviderService;
