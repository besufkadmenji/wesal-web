import { useContractStore } from "@/components/app/profile/SignedContract/useForm";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { useSetting } from "@/hooks/useSettings";
import ProviderService from "@/services/provider.service";
import { uploadFile } from "@/utils/file.upload";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useState } from "react";

export const useSignSignature = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const form = useContractStore((state) => state.form);
  const lng = useLang();
  const { me } = useMe();
  const { setting } = useSetting();

  const getRules = () => {
    if (me?.provider?.signedContract) {
      return lng === "ar"
        ? me.provider.signedContract.acceptedRulesAr
        : me.provider.signedContract.acceptedRulesEn;
    }
    const rules = new Set<string>();
    if (lng === "ar") {
      rules.add(setting?.rulesAr || "");
    } else {
      rules.add(setting?.rulesEn || "");
    }
    const categories = me?.provider?.categories?.map((cat) =>
      lng === "en" ? cat.rulesEn : cat.rulesAr,
    );
    categories
      ?.filter((cat) => cat.length > 0)
      .forEach((cat) => rules.add(cat));

    return Array.from(rules).join("\n");
  };
  const getRulesObj = () => {
    const rulesEn = new Set<string>();
    const rulesAr = new Set<string>();
    rulesAr.add(setting?.rulesAr || "");
    rulesEn.add(setting?.rulesEn || "");
    const categories = me?.provider?.categories?.map((cat) => ({
      en: cat.rulesEn,
      ar: cat.rulesAr,
    }));
    categories
      ?.filter((cat) => cat.en.length > 0 || cat.ar.length > 0)
      .forEach((cat) => {
        rulesEn.add(cat.en);
        rulesAr.add(cat.ar);
      });

    return {
      en: Array.from(rulesEn).join("\n"),
      ar: Array.from(rulesAr).join("\n"),
    };
  };

  const saveSignature = async () => {
    if (!form.serviceProviderSignature) {
      showErrorMessage(dict.contract.error.serviceProviderSignatureRequired);
      return;
    }
    setBusy(true);
    try {
      const serviceProviderSignatureFilename = await uploadFile(
        form.serviceProviderSignature!,
      );

      const result = await ProviderService.signContact({
        serviceProviderSignature: serviceProviderSignatureFilename.filename,
        acceptedRulesAr: getRulesObj().ar,
        acceptedRulesEn: getRulesObj().en,
      });
      if (result) {
        showSuccessMessage(dict.contract.signatureSavedSuccessfully);
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : dict.common.unexpectedError,
      );
    } finally {
      setBusy(false);
    }
  };

  const terminateContract = async (reason: string) => {
    if (reason.trim().length === 0) {
      showErrorMessage(dict.contract.error.cancelReasonRequired);
      return false;
    }
    setBusy(true);
    try {
      const result = await ProviderService.terminateContact(reason);
      if (result) {
        showSuccessMessage(dict.contract.contractTerminatedSuccessfully);
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : dict.common.unexpectedError,
      );
    } finally {
      setBusy(false);
    }
    return true;
  };

  return {
    saveSignature,
    terminateContract,
    getRules,
    busy,
  };
};
