import { useDict } from "@/hooks/useDict";
import AuthService from "@/services/auth.service";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";

export const useChangeEmail = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const [open, setOpen] = useQueryState("emailChange", {
    defaultValue: "false",
  });
  const [selectedEmail, setSelectedEmail] = useQueryState("selectedEmail", {
    defaultValue: "false",
  });
  const router = useRouter();
  const [changeToken, setChangeToken] = useQueryState("changeToken");
  const initiateChange = async (newEmail: string) => {
    setBusy(true);
    try {
      const result = await AuthService.initiateEmailChange({
        newEmail,
      });
      setSelectedEmail(newEmail);
      if (result) {
        setOpen("verify");
        setChangeToken(result.changeToken);
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : dict.common.somethingWentWrong,
      );
    } finally {
      setBusy(false);
    }
  };
  const verifyChange = async (code: string) => {
    setBusy(true);
    try {
      const result = await AuthService.verifyChangeEmail({
        changeToken: changeToken || "",
        code: code,
      });
      if (result) {
        showSuccessMessage(dict.profile.changeEmail.successMessage);
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
        router.replace("/profile");
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : dict.common.somethingWentWrong,
      );
    } finally {
      setBusy(false);
    }
  };

  return {
    initiateChange,
    verifyChange,
    busy,
  };
};
