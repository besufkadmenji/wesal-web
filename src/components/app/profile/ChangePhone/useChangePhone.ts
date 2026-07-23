import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { getProfileAuthService } from "../profileAuthService";

export const useChangePhone = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const { me } = useMe();
  const authService = getProfileAuthService(Boolean(me?.provider));
  const [, setOpen] = useQueryState("phoneChange", {
    defaultValue: "false",
  });
  const [, setSelectedPhone] = useQueryState("selectedPhone", {
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
      const result = await authService.initiatePhoneChange({
        newPhone: `${countryCode}${newPhone}`,
        countryCode,
      });
      setSelectedPhone(newPhone);
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
  const verifyChange = async (code: string, countryCode: string) => {
    setBusy(true);
    try {
      const result = await authService.verifyChangePhone({
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
