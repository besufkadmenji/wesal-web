import { useContractStore } from "@/components/app/profile/SignedContract/useForm";
import { ContractRule } from "@/gql/graphql";
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
    const rules = new Set<ContractRule>();
    console.log("Provider rules:", setting?.rulesAr, setting?.rulesEn);
    if (lng === "ar") {
      rules.add({
        label: "general",
        value: setting?.rulesAr || "",
      });
    } else {
      rules.add({
        label: "general",
        value: setting?.rulesEn || "",
      });
    }
    const categories = me?.provider?.categories?.map((cat) =>
      lng === "en"
        ? { label: cat.nameEn, value: cat.rulesEn }
        : { label: cat.nameAr, value: cat.rulesAr },
    );
    categories
      ?.filter((cat) => cat.value.length > 0)
      .forEach((cat) => rules.add(cat));

    return Array.from(rules);
  };
  const getRulesObj = () => {
    const rulesEn = new Set<ContractRule>();
    const rulesAr = new Set<ContractRule>();
    rulesAr.add({
      label: "general",
      value: setting?.rulesAr || "",
    });
    rulesEn.add({
      label: "general",
      value: setting?.rulesEn || "",
    });
    const categories = me?.provider?.categories?.map((cat) => ({
      en: { label: cat.nameEn, value: cat.rulesEn },
      ar: { label: cat.nameAr, value: cat.rulesAr },
    }));
    categories
      ?.filter((cat) => cat.en.value.length > 0 || cat.ar.value.length > 0)
      .forEach((cat) => {
        rulesEn.add(cat.en);
        rulesAr.add(cat.ar);
      });

    return {
      en: Array.from(rulesEn),
      ar: Array.from(rulesAr),
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
