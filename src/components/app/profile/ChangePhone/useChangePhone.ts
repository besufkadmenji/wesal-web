import { useDict } from "@/hooks/useDict";
import AuthService from "@/services/auth.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { queryClient } from "@/utils/query.client";

export const useChangePhone = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const [open, setOpen] = useQueryState("phoneChange", {
    defaultValue: "false",
  });
  const [selectedPhone, setSelectedPhone] = useQueryState("selectedPhone", {
    defaultValue: "false",
  });
  const router = useRouter();
  const [changeToken, setChangeToken] = useQueryState("changeToken");
  const initiateChange = async (newPhone: string, countryCode: string) => {
    if (newPhone.length !== 9) {
      showErrorMessage(dict.profile.changePhoneNumber.invalidPhoneNumber);
      return;
    }
    setBusy(true);
    try {
      const result = await AuthService.initiatePhoneChange({
        newPhone: `${countryCode}${newPhone}`,
        countryCode,
      });
      setSelectedPhone(newPhone);
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
  const verifyChange = async (code: string, countryCode: string) => {
    setBusy(true);
    try {
      const result = await AuthService.verifyChangePhone({
        changeToken: changeToken || "",
        code: code,
        countryCode: countryCode,
      });
      if (result) {
        showSuccessMessage(dict.profile.changePhoneNumber.successMessage);
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
