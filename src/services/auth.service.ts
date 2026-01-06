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
  static changePassword = async (input: ChangePasswordInput) => {
    try {
      const changePasswordMutationResponse = await client().mutate({
        mutation: CHANGE_PASSWORD_MUTATION,
        variables: {
          input,
        },
      });
      return changePasswordMutationResponse.data?.changePassword ?? null;
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
      return (
        initiateEmailChangeMutationResponse.data?.initiateEmailChange ?? null
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
      return (
        initiatePhoneChangeMutationResponse.data?.initiatePhoneChange ?? null
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
      return verifyPhoneChangeMutationResponse.data?.verifyPhoneChange ?? null;
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
      return verifyEmailChangeMutationResponse.data?.verifyEmailChange ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
}

export default AuthService;
