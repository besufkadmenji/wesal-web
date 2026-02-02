import { useProviderProfileStore } from "@/components/app/profile/useProviderProfileForm";
import { useDict } from "@/hooks/useDict";
import ProviderService from "@/services/provider.service";
import { uploadFile } from "@/utils/file.upload";
import { queryClient } from "@/utils/query.client";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useState } from "react";

export const useUpdateProviderProfile = () => {
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const dict = useDict();
  const { form } = useProviderProfileStore();

  const updateProfile = async () => {
    setUpdating(true);
    try {
      const { avatarFile, input } = form;
      let filename;
      if (avatarFile) {
        const uploadResult = await uploadFile(avatarFile);
        if (uploadResult.url) {
          filename = uploadResult.filename;
        }
      }
      const result = await ProviderService.updateProvider({
        name: input.name!,
        bankName: input.bankName,
        ibanNumber: input.ibanNumber,
        avatarFilename: filename,
        address: input.address,
        latitude: input.latitude,
        longitude: input.longitude,
        id: input.id!,
      });
      if (result) {
        showSuccessMessage(dict.profile.updateSuccessMessage);
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error
          ? error.message
          : dict.profile.updateProfileFailed,
      );
    } finally {
      setUpdating(false);
    }
  };
  const updateBusinessProfile = async () => {
    setUpdating(true);
    try {
      const { input } = form;

      const result = await ProviderService.updateProvider({
        address: input.address,
        latitude: input.latitude,
        longitude: input.longitude,
        cityId: input.cityId,
        categoryIds: input.categoryIds,
        commercialRegistrationNumber: input.commercialRegistrationNumber,
        withAbsher: input.withAbsher,
        id: input.id!,
      });
      if (result) {
        showSuccessMessage(dict.profile.updateSuccessMessage);
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error
          ? error.message
          : dict.profile.updateProfileFailed,
      );
    } finally {
      setUpdating(false);
    }
  };

  const removeAvatar = async (id: string) => {
    setRemoving(true);
    try {
      const result = await ProviderService.removeAvatar(id);
      if (result) {
        showSuccessMessage(dict.profile.removeAvatarSuccessMessage);
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error
          ? error.message
          : dict.profile.removeAvatarFailed,
      );
    } finally {
      setRemoving(false);
    }
  };

  return {
    updateProfile,
    removeAvatar,
    updateBusinessProfile,
    removing,
    updating,
  };
};
