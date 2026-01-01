import { useDict } from "@/hooks/useDict";
import AuthService from "@/services/auth.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import Cookie from "js-cookie";
import { useState } from "react";

export const useLogin = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const login = async (emailOrPhone: string, password: string) => {
    setBusy(true);
    try {
      const result = await AuthService.login({
        emailOrPhone,
        password,
      });
      if (result) {
        const token = result.accessToken;
        if (token) {
          Cookie.set("token", token, {
            sameSite: "Lax",
            expires: 7,
          });

          window.location.href = "/";
        }
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : dict.auth.loginFailed,
      );
    } finally {
      setBusy(false);
    }
  };

  return { login, busy };
};
