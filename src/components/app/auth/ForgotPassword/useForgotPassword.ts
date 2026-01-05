import {
  ForgotPasswordInput,
  ResendOtpInput,
  ResetPasswordWithTokenInput,
  VerifyPasswordResetOtpInput,
} from "@/gql/graphql";
import { useAppRouter } from "@/hooks/use.app.router";
import { useDict } from "@/hooks/useDict";
import AuthService from "@/services/auth.service";
import { showErrorMessage } from "@/utils/show.messages";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const useForgotPassword = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const router = useAppRouter();
  const pathname = usePathname();

  const forgotPassword = async (
    input: ForgotPasswordInput,
    type: "phone" | "email",
  ) => {
    setBusy(true);
    try {
      const result = await AuthService.forgotPassword(input);
      if (result) {
        router.push(
          `${pathname}/verify?target=${encodeURIComponent(input.emailOrPhone)}&type=${type}`,
        );
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : dict.auth.forgotPasswordFailed,
      );
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async (input: VerifyPasswordResetOtpInput) => {
    setBusy(true);
    try {
      const result = await AuthService.verifyPasswordResetOtp(input);
      console.log("result", result);
      if (result) {
        router.push(
          `/auth/reset-password?token=${encodeURIComponent(result.resetToken)}`,
        );
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : dict.auth.forgotPasswordFailed,
      );
    } finally {
      setBusy(false);
    }
  };
  const resetPassword = async (input: ResetPasswordWithTokenInput) => {
    setBusy(true);
    try {
      const result = await AuthService.resetPassword(input);
      if (result) {
        window.location.href = "/auth/login";
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : dict.auth.forgotPasswordFailed,
      );
    } finally {
      setBusy(false);
    }
  };

  const resendOtp = async (input: ResendOtpInput) => {
    setBusy(true);
    try {
      await AuthService.resendOtp(input);
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : dict.auth.forgotPasswordFailed,
      );
    } finally {
      setBusy(false);
    }
  };

  return {
    forgotPassword,
    verifyOtp,
    resendOtp,
    resetPassword,
    busy,
  };
};
