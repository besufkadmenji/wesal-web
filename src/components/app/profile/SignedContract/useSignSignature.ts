import { useContractStore } from "@/components/app/profile/SignedContract/useForm";
import { useDict } from "@/hooks/useDict";
import UserService from "@/services/user.service";
import { uploadFile } from "@/utils/file.upload";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useState } from "react";

export const useSignSignature = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const form = useContractStore((state) => state.form);

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
      let platformManagerSignatureFilename = null;
      if (form.platformManagerSignature) {
        platformManagerSignatureFilename = await uploadFile(
          form.platformManagerSignature!,
        );
      }

      const result = await UserService.signContact({
        serviceProviderSignature: serviceProviderSignatureFilename.filename,
        platformManagerSignature: platformManagerSignatureFilename
          ? platformManagerSignatureFilename.filename
          : null,
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

  return {
    saveSignature,
    busy,
  };
};
