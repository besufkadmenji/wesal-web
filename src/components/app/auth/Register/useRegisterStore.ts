import { create } from "zustand";
import { RegisterInput, UserRole } from "@/gql/graphql";
export type FormType = Partial<RegisterInput> & {
  confirmPassword?: string;
  avatarFile?: File | null;
  terms?: boolean;
  document?: boolean;
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
  categoryIds: [],
  latitude: null,
  longitude: null,
  role: UserRole.User,
  terms: false,
  document: false,
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
