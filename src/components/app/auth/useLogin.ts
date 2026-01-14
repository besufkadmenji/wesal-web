import { useDict } from "@/hooks/useDict";
import AuthService from "@/services/auth.service";
import {
  showErrorMessage,
  showSuccessMessage,
  showInfoMessage,
} from "@/utils/show.messages";
import Cookie from "js-cookie";
import { useState } from "react";
import { useQueryState } from "nuqs";
import { UserRole, UserStatus } from "@/gql/graphql";

export const useLogin = () => {
  const [busy, setBusy] = useState(false);
  const [type] = useQueryState("type");
  const dict = useDict();
  const login = async (emailOrPhone: string, password: string) => {
    setBusy(true);
    try {
      const result = await AuthService.login({
        emailOrPhone,
        password,
        role: type === "user" ? UserRole.User : UserRole.Provider,
      });
      if (result) {
        const token = result.accessToken;
        if (token !== "") {
          Cookie.set("token", token, {
            sameSite: "Lax",
            expires: 7,
          });

          window.location.href = "/";
        } else if (result.user.status === UserStatus.PendingApproval) {
          showInfoMessage(dict.auth.underReview);
        } else {
          showErrorMessage(dict.auth.accountNotActiveContactSupport);
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
