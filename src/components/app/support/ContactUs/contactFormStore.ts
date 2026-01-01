import { create } from "zustand";

export interface ContactForm {
  name: string;
  phoneNumber: string;
  countryCode: string;
  email: string;
  messageType: string;
  messageContent: string;
  image: File | null;
}

export interface ContactFormState {
  form: ContactForm;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;

  // Actions
  setForm: (form: Partial<ContactForm>) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
  resetForm: () => void;
}

const initialFormState: ContactForm = {
  name: "",
  phoneNumber: "",
  countryCode: "+966",
  email: "",
  messageType: "",
  messageContent: "",
  image: null,
};

export const useContactFormStore = create<ContactFormState>((set) => ({
  form: initialFormState,
  isSubmitting: false,
  error: null,
  success: false,

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

  resetForm: () =>
    set({
      ...initialFormState,
      isSubmitting: false,
      error: null,
      success: false,
    }),
}));
