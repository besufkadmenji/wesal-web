import { CreateListingForm } from "@/components/app/my-listings/manage/useForm";
import { useDict } from "@/hooks/useDict";
import { useCallback, useMemo, useState } from "react";

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 50;
const DESCRIPTION_MIN_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = 1000;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

interface ListingFormData extends CreateListingForm {
  photoFiles?: File[];
  storyVideoFile?: File | null;
}

export const useFormValidation = (form: ListingFormData) => {
  const dict = useDict();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateName = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return dict.addListing.validation.nameRequired;
      }
      if (value.trim().length < NAME_MIN_LENGTH) {
        return dict.addListing.validation.nameMinLength;
      }
      if (value.trim().length > NAME_MAX_LENGTH) {
        return dict.addListing.validation.nameMaxLength;
      }
      return null;
    },
    [dict],
  );

  const validateDescription = useCallback(
    (value: string): string | null => {
      if (!value || value.trim() === "") {
        return dict.addListing.validation.descriptionRequired;
      }
      if (value.trim().length < DESCRIPTION_MIN_LENGTH) {
        return dict.addListing.validation.descriptionMinLength;
      }
      if (value.trim().length > DESCRIPTION_MAX_LENGTH) {
        return dict.addListing.validation.descriptionMaxLength;
      }
      return null;
    },
    [dict],
  );

  const validatePrice = useCallback(
    (value: number | string | null | undefined): string | null => {
      if (value === null || value === undefined || value === "") {
        return dict.addListing.validation.priceRequired;
      }
      const numValue = typeof value === "string" ? parseFloat(value) : value;
      if (isNaN(numValue)) {
        return dict.addListing.validation.priceInvalid;
      }
      if (numValue < 0) {
        return dict.addListing.validation.priceNegative;
      }
      return null;
    },
    [dict],
  );

  const validateCategoryId = useCallback(
    (value: string | null | undefined): string | null => {
      if (!value || value.trim() === "") {
        return dict.addListing.validation.categoryRequired;
      }
      return null;
    },
    [dict],
  );

  const validateType = useCallback(
    (value: string | null | undefined): string | null => {
      if (!value || value.trim() === "") {
        return dict.addListing.validation.typeRequired;
      }
      return null;
    },
    [dict],
  );

  const validatePhotos = useCallback(
    (
      files: File[] | null | undefined,
      existingPhotos: unknown,
    ): string | null => {
      // Only validate if no existing photos and no new files
      const hasExistingPhotos =
        Array.isArray(existingPhotos) && existingPhotos.length > 0;
      if (!hasExistingPhotos && (!files || files.length === 0)) {
        return dict.addListing.validation.photosRequired;
      }
      if (files && files.length > 5) {
        return dict.addListing.validation.photosMaxCount;
      }
      if (files) {
        for (const file of files) {
          if (!file.type.startsWith("image/")) {
            return dict.addListing.validation.photosInvalidFormat;
          }
          if (file.size > MAX_IMAGE_SIZE) {
            return dict.addListing.validation.photosMaxSize;
          }
        }
      }
      return null;
    },
    [dict],
  );

  const validateStoryVideoFile = useCallback(
    (file: File | null | undefined, existingStory: unknown): string | null => {
      // Only validate if no existing story and no new file
      const hasExistingStory = !!existingStory;
      if (!hasExistingStory && !file) {
        return dict.addListing.validation.videoRequired;
      }
      if (file) {
        if (!file.type.startsWith("video/")) {
          return dict.addListing.validation.videoInvalidFormat;
        }
        if (file.size > MAX_VIDEO_SIZE) {
          return dict.addListing.validation.videoMaxSize;
        }
      }
      return null;
    },
    [dict],
  );

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    const nameError = validateName(form.name || "");
    if (nameError) newErrors.name = nameError;

    const descriptionError = validateDescription(form.description || "");
    if (descriptionError) newErrors.description = descriptionError;

    const priceError = validatePrice(form.priceString);
    if (priceError) newErrors.price = priceError;

    const categoryIdError = validateCategoryId(form.categoryId);
    if (categoryIdError) newErrors.categoryId = categoryIdError;

    const typeError = validateType(form.type);
    if (typeError) newErrors.type = typeError;

    const photosError = validatePhotos(form.photoFiles, form.photos);
    if (photosError) newErrors.photoFiles = photosError;

    const videoError = validateStoryVideoFile(form.storyVideoFile, form.story);
    if (videoError) newErrors.storyVideoFile = videoError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    form.name,
    form.description,
    form.priceString,
    form.categoryId,
    form.type,
    form.photoFiles,
    form.storyVideoFile,
    form.photos,
    form.story,
    validateName,
    validateDescription,
    validatePrice,
    validateCategoryId,
    validateType,
    validatePhotos,
    validateStoryVideoFile,
  ]);

  const isFormValid = useMemo(() => {
    const nameError = validateName(form.name || "");
    const descriptionError = validateDescription(form.description || "");
    const priceError = validatePrice(form.priceString || "");
    const categoryIdError = validateCategoryId(form.categoryId);
    const typeError = validateType(form.type);
    const photosError = validatePhotos(form.photoFiles, form.photos);
    const videoError = validateStoryVideoFile(form.storyVideoFile, form.story);

    return (
      !nameError &&
      !descriptionError &&
      !priceError &&
      !categoryIdError &&
      !typeError &&
      !photosError &&
      !videoError
    );
  }, [
    form.name,
    form.description,
    form.priceString,
    form.categoryId,
    form.type,
    form.photoFiles,
    form.storyVideoFile,
    form.photos,
    form.story,
    validateName,
    validateDescription,
    validatePrice,
    validateCategoryId,
    validateType,
    validatePhotos,
    validateStoryVideoFile,
  ]);

  const validateField = useCallback(
    (
      field: keyof ListingFormData,
      value: string | number | File[] | File | null | undefined,
    ) => {
      let error = "";

      switch (field) {
        case "name":
          error = validateName(value as string) || "";
          break;
        case "description":
          error = validateDescription(value as string) || "";
          break;
        case "priceString":
          error =
            validatePrice(value as string | number | null | undefined) || "";
          break;
        case "categoryId":
          error = validateCategoryId(value as string) || "";
          break;
        case "type":
          error = validateType(value as string) || "";
          break;
        case "photoFiles":
          error = validatePhotos(value as File[], form.photos) || "";
          break;
        case "storyVideoFile":
          error =
            validateStoryVideoFile(
              value as File | null | undefined,
              form.story,
            ) || "";
          break;
      }

      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [
      validateName,
      validateDescription,
      validatePrice,
      validateCategoryId,
      validateType,
      validatePhotos,
      validateStoryVideoFile,
      form.photos,
      form.story,
    ],
  );

  const clearError = useCallback(
    (field: string) => {
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    },
    [errors],
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateForm,
    validateField,
    isFormValid,
    clearError,
    clearErrors,
  };
};
