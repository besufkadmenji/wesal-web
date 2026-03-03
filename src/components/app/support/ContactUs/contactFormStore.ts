import { MessageType } from "@/gql/graphql";
import type { ContactFormErrors } from "@/utils/contact-form-validation";
import { create } from "zustand";

export interface ContactForm {
  name: string;
  phoneNumber: string;
  countryCode: string;
  email: string;
  messageType?: MessageType;
  messageContent: string;
  image: File | null;
}

export interface ContactFormState {
  form: ContactForm;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  validationErrors: ContactFormErrors;

  // Actions
  setForm: (form: Partial<ContactForm>) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
  setValidationErrors: (errors: ContactFormErrors) => void;
  resetForm: () => void;
}

const initialFormState: ContactForm = {
  name: "",
  phoneNumber: "",
  countryCode: "+966",
  email: "",
  messageType: undefined,
  messageContent: "",
  image: null,
};

export const useContactFormStore = create<ContactFormState>((set) => ({
  form: initialFormState,
  isSubmitting: false,
  error: null,
  success: false,
  validationErrors: {},

  setForm: (form: Partial<ContactForm>) =>
    set((state) => ({
      ...state,
      form: {
        ...state.form,
        ...form,
      },
    })),
  setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),
  setError: (error: string | null) => set({ error }),
  setSuccess: (success: boolean) => set({ success }),
  setValidationErrors: (validationErrors: ContactFormErrors) =>
    set({ validationErrors }),

  resetForm: () =>
    set({
      form: initialFormState,
      isSubmitting: false,
      error: null,
      success: false,
      validationErrors: {},
    }),
}));
