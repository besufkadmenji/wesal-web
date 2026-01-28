import {
  Category,
  CreateCategoryInput,
  CreateListingInput,
  Listing,
  ListingType,
} from "@/gql/graphql";
import { useEffect } from "react";
import { create } from "zustand";

export interface CreateListingForm extends CreateListingInput {
  priceString: string;
}

interface FormState {
  form: CreateListingForm;
  photoFiles: File[];
  setPhotoFiles: (files: File[]) => void;
  storyVideoFile?: File | null;
  setStoryVideoFile: (file: File | null) => void;
  setForm: (form: Partial<CreateListingForm>) => void;
  reset: () => void;
}

export const useForm = create<FormState>((set) => ({
  form: {
    categoryId: "",
    cityId: "",
    description: "",
    name: "",
    price: 0,
    type: ListingType.Free,
    priceString: "",
  },
  setForm: (form) =>
    set((state) => ({
      form: {
        ...state.form,
        ...form,
      },
    })),
  photoFiles: [],
  setPhotoFiles: (files) => set(() => ({ photoFiles: files })),
  storyVideoFile: null,
  setStoryVideoFile: (file) => set(() => ({ storyVideoFile: file })),
  reset: () =>
    set(() => ({
      form: {
        categoryId: "",
        cityId: "",
        description: "",
        name: "",
        price: 0,
        type: ListingType.Free,
        priceString: "",
      },
      photoFiles: [],
      storyVideoFile: null,
    })),
}));

export const useManageForm = (id: string, listing?: Listing | null) => {
  const form = useForm((state) => state.form);
  const setForm = useForm((state) => state.setForm);
  const reset = useForm((state) => state.reset);

  useEffect(() => {
    setForm({
      categoryId: listing?.categoryId || "",
      cityId: listing?.cityId || "",
      description: listing?.description || "",
      name: listing?.name || "",
      price: listing?.price || 0,
      type: listing?.type ?? ListingType.Free,
      photos: listing?.photos || [],
      story: listing?.story || null,
      priceString: listing ? listing.price.toString() : "",
    });
  }, [listing, setForm]);

  return { form, setForm, reset };
};
