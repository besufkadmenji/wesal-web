"use client";

import { SignContractInput } from "@/gql/graphql";
import { create } from "zustand";

export interface ContactFormState {
  input: SignContractInput;
  serviceProviderSignature: File | null;
}

interface ContractFormStore {
  form: ContactFormState;
  updateInputField: <K extends keyof SignContractInput>(
    field: K,
    value: SignContractInput[K],
  ) => void;

  updateMultipleFields: (fields: Partial<ContactFormState>) => void;
  resetForm: () => void;
  setInitialData: (data: Partial<ContactFormState>) => void;
  setServiceProviderSignature: (file: File | null) => void;
  setPlatformManagerSignature: (file: File | null) => void;
}

const initialState: ContactFormState = {
  input: {
    serviceProviderSignature: "",
    acceptedRulesAr: [],
    acceptedRulesEn: [],
  },
  serviceProviderSignature: null,
};

export const useContractStore = create<ContractFormStore>((set) => ({
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
  setServiceProviderSignature: (file) =>
    set((state) => ({
      form: {
        ...state.form,
        serviceProviderSignature: file,
      },
    })),
  setPlatformManagerSignature: (file) =>
    set((state) => ({
      form: {
        ...state.form,
        platformManagerSignature: file,
      },
    })),
}));
