import { ProviderStatus, UserStatus } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import AuthProviderService from "@/services/auth.provider.service";
import AuthService from "@/services/auth.service";
import { showErrorMessage, showInfoMessage } from "@/utils/show.messages";
import Cookie from "js-cookie";
import { useState } from "react";

export const useLogin = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const loginUser = async (emailOrPhone: string, password: string) => {
    setBusy(true);
    try {
      const result = await AuthService.login({
        emailOrPhone,
        password,
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
  const loginProvider = async (emailOrPhone: string, password: string) => {
    setBusy(true);
    try {
      const result = await AuthProviderService.loginProvider({
        emailOrPhone,
        password,
      });
      if (result) {
        const token = result.accessToken;
        if (token !== "") {
          Cookie.set("token", token, {
            sameSite: "Lax",
            expires: 7,
          });

          window.location.href = "/";
        } else if (result.provider.status === ProviderStatus.PendingApproval) {
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

  return { loginProvider, loginUser, busy };
};
