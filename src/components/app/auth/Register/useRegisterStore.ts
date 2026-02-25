import { RegisterInput } from "@/gql/graphql";
import { create } from "zustand";
export type FormType = Partial<RegisterInput> & {
  confirmPassword?: string;
  terms?: boolean;
  document?: boolean;
  avatar?: File | null;
};
interface RegisterState {
  formData: FormType;
  setFormData: (data: FormType) => void;
  updateField: <K extends keyof FormType>(field: K, value: FormType[K]) => void;
  resetForm: () => void;
  getFormData: () => FormType;
}

const initialState: FormType = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  dialCode: "+966",
  cityId: null,
  terms: false,
  document: false,
  avatarFilename: null,
  avatar: null,
};

export const useRegisterStore = create<RegisterState>((set, get) => ({
  formData: initialState,

  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  updateField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  resetForm: () => set({ formData: initialState }),

  getFormData: () => get().formData,
}));
