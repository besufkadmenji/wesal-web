export interface ValidationErrors {
  [key: string]: string;
}

export interface RegisterValidationData {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  bankName?: string;
  ibanNumber?: string;
  address?: string;
  dialCode?: string;
  cityId?: string;
  categoryIds?: string[];
  latitude?: number;
  longitude?: number;
  role?: string;
  avatarFile?: File | null;
}

// Validation rules and patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;

// Phone number rules (subscriber number, excluding country dial code)
const PHONE_RULES_BY_DIAL_CODE: Record<
  string,
  { min: number; max: number; startsWith?: string[] }
> = {
  "+966": { min: 9, max: 9, startsWith: ["5"] }, // Saudi Arabia — 05x
  "+20": { min: 10, max: 10, startsWith: ["10", "11", "12", "15"] }, // Egypt
  "+212": { min: 9, max: 9, startsWith: ["6", "7"] }, // Morocco
  "+962": { min: 8, max: 9, startsWith: ["7"] }, // Jordan
  "+961": { min: 7, max: 8, startsWith: ["3", "7", "81"] }, // Lebanon
  "+965": { min: 8, max: 8, startsWith: ["5", "6", "9"] }, // Kuwait
  "+971": { min: 9, max: 9, startsWith: ["5"] }, // UAE
};
const DEFAULT_PHONE_LENGTH = { min: 7, max: 15 };
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

// Validation functions
const validateName = (
  value: string,
  t: (key: string) => string,
): string | null => {
  if (!value || value.trim() === "") return t("auth.validation.name.required");
  if (value.length < 2) return t("auth.validation.name.minLength");
  if (value.length > 50) return t("auth.validation.name.maxLength");
  return null;
};

const validateEmail = (
  value: string,
  t: (key: string) => string,
): string | null => {
  if (!value || value.trim() === "") return t("auth.validation.email.required");
  if (!emailRegex.test(value)) return t("auth.validation.email.invalid");
  return null;
};

const validatePhone = (
  value: string,
  t: (key: string) => string,
  dialCode?: string,
): string | null => {
  if (!value || value.trim() === "") return t("auth.validation.phone.required");
  if (!/^\d+$/.test(value)) return t("auth.validation.phone.invalid");
  const rules =
    (dialCode && PHONE_RULES_BY_DIAL_CODE[dialCode]) || DEFAULT_PHONE_LENGTH;
  if (value.length < rules.min || value.length > rules.max)
    return t("auth.validation.phone.invalid");
  const allowedPrefixes =
    "startsWith" in rules ? (rules.startsWith as string[]) : undefined;
  if (
    allowedPrefixes &&
    !allowedPrefixes.some((prefix) => value.startsWith(prefix))
  )
    return t("auth.validation.phone.invalid");
  return null;
};

const validatePassword = (
  value: string,
  t: (key: string) => string,
): string | null => {
  if (!value || value.trim() === "")
    return t("auth.validation.password.required");
  if (value.length < 8) return t("auth.validation.password.minLength");
  if (!passwordRegex.test(value)) return t("auth.validation.password.weak");
  return null;
};

const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
  t: (key: string) => string,
): string | null => {
  if (!confirmPassword || confirmPassword.trim() === "") {
    return t("auth.validation.confirmPassword.required");
  }
  if (password !== confirmPassword) {
    return t("auth.validation.confirmPassword.noMatch");
  }
  return null;
};

const validateBankName = (
  value: string,
  t: (key: string) => string,
): string | null => {
  if (!value || value.trim() === "")
    return t("auth.validation.bankName.required");
  if (value.length < 2) return t("auth.validation.bankName.minLength");
  return null;
};

const validateIbanNumber = (
  value: string,
  t: (key: string) => string,
): string | null => {
  if (!value || value.trim() === "")
    return t("auth.validation.ibanNumber.required");
  if (!ibanRegex.test(value)) return t("auth.validation.ibanNumber.invalid");
  return null;
};

const validateAddress = (
  value: string,
  t: (key: string) => string,
): string | null => {
  if (!value || value.trim() === "")
    return t("auth.validation.address.required");
  if (value.length < 5) return t("auth.validation.address.minLength");
  return null;
};

const validateCityId = (
  value: string | undefined,
  t: (key: string) => string,
): string | null => {
  if (!value) return t("auth.validation.cityId.required");
  return null;
};

const validateCategoryIds = (
  value: string[] | undefined,
  t: (key: string) => string,
): string | null => {
  if (!value || value.length === 0)
    return t("auth.validation.categoryIds.required");
  return null;
};

const validateTerms = (
  value: boolean | undefined,
  t: (key: string) => string,
): string | null => {
  if (!value) return t("auth.validation.terms.required");
  return null;
};

const validateDocument = (
  value: boolean | undefined,
  t: (key: string) => string,
): string | null => {
  if (!value) return t("auth.validation.document.required");
  return null;
};

const validateAvatarFile = (
  value: File | null | undefined,
  t: (key: string) => string,
): string | null => {
  if (!value) return t("auth.validation.avatarFile.required");
  return null;
};

const validateLocation = (
  latitude: number | null | undefined,
  longitude: number | null | undefined,
  t: (key: string) => string,
): string | null => {
  if (!latitude || !longitude) {
    return t("auth.validation.location.required");
  }
  // Validate latitude range (-90 to 90)
  if (latitude < -90 || latitude > 90) {
    return t("auth.validation.location.invalid");
  }
  // Validate longitude range (-180 to 180)
  if (longitude < -180 || longitude > 180) {
    return t("auth.validation.location.invalid");
  }
  return null;
};

/**
 * Validate register form data
 * @param data - The register form data to validate
 * @param t - Translation function
 * @returns Object with validation errors by field
 */
export const validateRegisterForm = (
  data: RegisterValidationData,
  type: string,
  t: (key: string) => string,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Required fields
  if (data.name !== undefined) {
    const nameError = validateName(data.name, t);
    if (nameError) errors.name = nameError;
  }

  if (data.email !== undefined) {
    const emailError = validateEmail(data.email, t);
    if (emailError) errors.email = emailError;
  }

  if (data.phone !== undefined) {
    const phoneError = validatePhone(data.phone, t, data.dialCode);
    if (phoneError) errors.phone = phoneError;
  }

  if (data.password !== undefined) {
    const passwordError = validatePassword(data.password, t);
    if (passwordError) errors.password = passwordError;
  }

  if (data.confirmPassword !== undefined && data.password !== undefined) {
    const confirmError = validateConfirmPassword(
      data.password,
      data.confirmPassword,
      t,
    );
    if (confirmError) errors.confirmPassword = confirmError;
  }

  if (type === "user" && data.bankName !== undefined) {
    const bankError = validateBankName(data.bankName, t);
    if (bankError) errors.bankName = bankError;
  }

  if (type === "user" && data.ibanNumber !== undefined) {
    const ibanError = validateIbanNumber(data.ibanNumber, t);
    if (ibanError) errors.ibanNumber = ibanError;
  }

  // Fields required only for provider role
  const isProvider = data.role === "provider";

  if (isProvider || data.address) {
    const addressError = validateAddress(data.address || "", t);
    if (addressError) errors.address = addressError;
  }

  if (isProvider || data.cityId) {
    const cityError = validateCityId(data.cityId, t);
    if (cityError) errors.cityId = cityError;
  }

  if (isProvider || (data.categoryIds && data.categoryIds.length > 0)) {
    const categoryError = validateCategoryIds(data.categoryIds, t);
    if (categoryError) errors.categoryIds = categoryError;
  }

  return errors;
};

/**
 * Validate a single field
 * @param field - Field name
 * @param value - Field value
 * @param formData - Entire form data (for cross-field validation)
 * @param t - Translation function
 * @returns Error message or null
 */
export const validateField = (
  field: string,
  value: unknown,
  formData: RegisterValidationData,
  t: (key: string) => string,
): string | null => {
  console.log("isProvider ", formData.role);
  switch (field) {
    case "name":
      return validateName(value as string, t);
    case "email":
      return validateEmail(value as string, t);
    case "phone":
      return validatePhone(value as string, t, formData.dialCode);
    case "password":
      return validatePassword(value as string, t);
    case "confirmPassword":
      return validateConfirmPassword(
        formData.password || "",
        value as string,
        t,
      );
    case "bankName":
      return validateBankName(value as string, t);
    case "ibanNumber":
      return validateIbanNumber(value as string, t);
    case "terms":
      return validateTerms(value as boolean, t);
    case "document":
      return validateDocument(value as boolean, t);
    default:
      return null;
  }
};
