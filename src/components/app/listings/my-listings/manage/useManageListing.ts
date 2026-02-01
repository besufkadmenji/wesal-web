import { ListingMedia, ListingStatus, MediaType } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import ListingService from "@/services/listing.service";
import { uploadFile } from "@/utils/file.upload";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "./useForm";

export const useManageListing = () => {
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);
  const dict = useDict();
  const { form, storyVideoFile, photoFiles, reset } = useForm();
  const router = useRouter();
  const { me } = useMe();
  const createListing = async () => {
    setCreating(true);
    try {
      const { priceString, ...rest } = form;
      const photos: ListingMedia[] = [];
      for (let i = 0; i < photoFiles.length; i++) {
        const file = photoFiles[i];
        const uploadResult = await uploadFile(file);
        if (uploadResult.url) {
          photos.push({
            id: uuidv4(),
            filename: uploadResult.filename,
            type: MediaType.Image,
            sortOrder: i,
            originalFilename: file.name,
            size: file.size,
          });
        }
      }

      let story: ListingMedia | null = null;
      if (storyVideoFile) {
        const uploadResult = await uploadFile(storyVideoFile);
        if (uploadResult.url) {
          story = {
            id: uuidv4(),
            filename: uploadResult.filename,
            type: MediaType.Video,
            sortOrder: 0,
            originalFilename: storyVideoFile.name,
            size: storyVideoFile.size,
          };
        }
      }
      const result = await ListingService.createListing({
        ...rest,
        cityId: me?.cityId || "",
        photos: photos,
        story: story,
        status: ListingStatus.Active,
      });
      if (result) {
        showSuccessMessage(dict.addListing.listingCreatedSuccessfully);
        reset();
        router.push("/my-listings");
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
      setCreating(false);
    }
  };
  const updateListing = async (listingId: string) => {
    setUpdating(true);
    try {
      const { priceString, ...rest } = form;
      const photos: ListingMedia[] = form.photos ? [...form.photos] : [];
      for (let i = 0; i < photoFiles.length; i++) {
        const file = photoFiles[i];
        const uploadResult = await uploadFile(file);
        if (uploadResult.url) {
          photos.push({
            id: uuidv4(),
            filename: uploadResult.filename,
            type: MediaType.Image,
            sortOrder: i,
            originalFilename: file.name,
            size: file.size,
          });
        }
      }

      let story: ListingMedia | null = form.story || null;
      if (storyVideoFile) {
        const uploadResult = await uploadFile(storyVideoFile);
        if (uploadResult.url) {
          story = {
            id: uuidv4(),
            filename: uploadResult.filename,
            type: MediaType.Video,
            sortOrder: 0,
            originalFilename: storyVideoFile.name,
            size: storyVideoFile.size,
          };
        }
      }
      const result = await ListingService.updateListing({
        id: listingId,
        ...rest,
        cityId: me?.cityId || "",
        photos: photos,
        story: story,
      });
      if (result) {
        showSuccessMessage(dict.addListing.listingUpdatedSuccessfully);
        reset();
        router.push("/my-listings");
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

  return {
    creating,
    updating,
    removing,
    createListing,
    updateListing,
  };
};
