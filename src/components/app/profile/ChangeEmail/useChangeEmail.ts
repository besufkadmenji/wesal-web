import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { getProfileAuthService } from "../profileAuthService";

export const useChangeEmail = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const { me } = useMe();
  const authService = getProfileAuthService(Boolean(me?.provider));
  const [, setOpen] = useQueryState("emailChange", {
    defaultValue: "false",
  });
  const [, setSelectedEmail] = useQueryState("selectedEmail", {
    defaultValue: "false",
  });
  const router = useRouter();
  const [changeToken, setChangeToken] = useQueryState("changeToken");
  const initiateChange = async (newEmail: string) => {
    setBusy(true);
    try {
      const result = await authService.initiateEmailChange({
        newEmail,
      });
      setSelectedEmail(newEmail);
      if (result) {
        setOpen("verify");
        setChangeToken(result.changeToken);
      }
    } catch (error) {
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
      const result = await authService.verifyChangeEmail({
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
    } catch (error) {
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
