import { create } from "zustand";
import { RegisterInput } from "@/gql/graphql";
export type FormType = Partial<RegisterInput> & {
  confirmPassword?: string;
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
  dialCode: "",
  address: null,
  cityId: null,
  categoryIds: null,
  latitude: null,
  longitude: null,
  role: null,
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
