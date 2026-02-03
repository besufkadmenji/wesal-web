import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import AuthProviderService from "@/services/auth.provider.service";
import AuthService from "@/services/auth.service";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useState } from "react";

export const useChangePassword = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const { me } = useMe();
  const isProvider = !!me?.provider;
  const changePassword = async (
    newPassword: string,
    confirmPassword: string,
  ) => {
    if (newPassword !== confirmPassword) {
      showErrorMessage(dict.auth.resetPassword.setNewPassword.passwordMismatch);
      return;
    }
    setBusy(true);
    try {
      const result = await (isProvider
        ? AuthProviderService.changePassword({
            newPassword,
          })
        : AuthService.changePassword({
            newPassword,
          }));
      if (result) {
        showSuccessMessage(dict.profile.passwordChangeSuccessMessage);
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error
          ? error.message
          : dict.profile.updateProfileFailed,
      );
    } finally {
      setBusy(false);
    }
  };

  return {
    changePassword,
    busy,
  };
};
