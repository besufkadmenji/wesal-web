"use client";

import { UpdateUserInput } from "@/gql/graphql";
import { create } from "zustand";

interface ProfileFormState {
  input: UpdateUserInput;
  avatarFile?: File | null;
}

interface ProfileFormStore {
  form: ProfileFormState;
  updateInputField: <K extends keyof UpdateUserInput>(
    field: K,
    value: UpdateUserInput[K],
  ) => void;

  setAvatarFile: (file: File | null) => void;
  updateMultipleFields: (fields: Partial<ProfileFormState>) => void;
  resetForm: () => void;
  setInitialData: (data: Partial<ProfileFormState>) => void;
}

const initialState: ProfileFormState = {
  input: {
    name: "",
    email: "",
    phone: "",
    bankName: "",
    ibanNumber: "",
    address: "",
    avatarFilename: undefined,
    latitude: undefined,
    longitude: undefined,
    id: "",
  },
};

export const useProfileStore = create<ProfileFormStore>((set) => ({
  form: initialState,
  updateInputField: (field, value) =>
    set((state) => ({
      form: {
        ...state.form,
        input: {
          ...state.form.input,
          [field]: value,
        },
      },
    })),
  setAvatarFile: (file) =>
    set((state) => ({
      form: {
        ...state.form,
        avatarFile: file,
      },
    })),
  updateMultipleFields: (fields) =>
    set((state) => ({
      form: {
        ...state.form,
        ...fields,
      },
    })),
  resetForm: () => set({ form: initialState }),
  setInitialData: (data) =>
    set((state) => ({
      form: {
        ...state.form,
        ...data,
      },
    })),
}));
