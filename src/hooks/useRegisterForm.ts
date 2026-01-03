import { useCallback, useState } from "react";
import { useDict } from "@/hooks/useDict";
import {
  validateField,
  validateRegisterForm,
  ValidationErrors,
} from "@/utils/register-validation";
import { useQueryState } from "nuqs";

interface UseRegisterFormProps<T extends Record<string, unknown>> {
  form: T;
  updateField: <K extends keyof T>(field: K, value: T[K]) => void;
}

export const useRegisterForm = <T extends Record<string, unknown>>({
  form,
  updateField,
}: UseRegisterFormProps<T>) => {
  const dict = useDict();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [accepted, setAccepted] = useState({ terms: false, document: false });
  const [type] = useQueryState("type");

  // Translation function helper
  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let value: Record<string, unknown> | string | unknown = dict;
      for (const k of keys) {
        if (typeof value === "object" && value !== null) {
          value = (value as Record<string, unknown>)[k];
        }
      }
      return typeof value === "string" ? value : key;
    },
    [dict],
  );

  // Handle field change with validation
  const handleFieldChange = useCallback(
    (fieldName: string, value: unknown) => {
      updateField(fieldName as keyof T, value as T[keyof T]);

      // Validate field if touched
      if (touched[fieldName]) {
        const error = validateField(fieldName, value, form, t);
        setErrors((prev) => {
          const newErrors = { ...prev };
          if (error) {
            newErrors[fieldName] = error;
          } else {
            delete newErrors[fieldName];
          }
          return newErrors;
        });
      }
    },
    [form, touched, t, updateField],
  );

  // Handle checkbox changes
  const handleCheckboxChange = (
    checkboxType: "terms" | "document",
    value: boolean,
  ) => {
    setAccepted((prev) => ({ ...prev, [checkboxType]: value }));
    setTouched((prev) => ({ ...prev, [checkboxType]: true }));

    const error =
      checkboxType === "terms"
        ? value
          ? null
          : t("auth.validation.terms.required")
        : value
          ? null
          : t("auth.validation.document.required");

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[checkboxType] = error;
      } else {
        delete newErrors[checkboxType];
      }
      return newErrors;
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allFieldsTouched = {
      name: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      bankName: true,
      ibanNumber: true,
      terms: true,
      document: true,
    };
    setTouched(allFieldsTouched);

    // Validate all fields
    const allErrors = validateRegisterForm(
      form as unknown as Record<string, unknown>,
      type || "",
      t,
    );

    // Add checkbox validation
    if (!accepted.terms) {
      allErrors.terms = t("auth.validation.terms.required");
    }
    if (!accepted.document) {
      allErrors.document = t("auth.validation.document.required");
    }

    setErrors(allErrors);

    // Return validation result
    return Object.keys(allErrors).length === 0;
  };

  const showError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName];
  };

  return {
    errors,
    touched,
    accepted,
    t,
    handleFieldChange,
    handleCheckboxChange,
    handleSubmit,
    showError,
  };
};
