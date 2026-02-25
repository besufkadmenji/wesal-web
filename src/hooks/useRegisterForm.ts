import { useDict } from "@/hooks/useDict";
import { validateField } from "@/utils/register-validation";
import { useCallback } from "react";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";

interface UseRegisterFormProps<T extends FieldValues> {
  form: T;
  updateField: <K extends keyof T>(field: K, value: T[K]) => void;
}

type ErrorRecord = Record<string, { message?: string }>;

export const useRegisterForm = <T extends FieldValues>({
  form,
  updateField,
}: UseRegisterFormProps<T>) => {
  const dict = useDict();

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

  const {
    formState: { errors, touchedFields },
    setValue,
    trigger,
    setError,
    clearErrors,
  } = useForm<T>({
    mode: "onTouched",
    reValidateMode: "onChange",
    values: form,
  });

  // Handle field change with validation
  const handleFieldChange = useCallback(
    async (fieldName: string, value: unknown) => {
      // Update the store
      updateField(fieldName as keyof T, value as T[keyof T]);

      // Update react-hook-form value
      setValue(fieldName as never, value as never, {
        shouldValidate: true,
        shouldTouch: true,
      });

      // Run custom validation
      const error = validateField(fieldName, value, form, t);
      if (error) {
        setError(fieldName as never, {
          type: "manual",
          message: error,
        });
      } else {
        clearErrors(fieldName as never);
      }
    },
    [updateField, setValue, form, t, setError, clearErrors],
  );

  // Handle checkbox changes
  const handleCheckboxChange = useCallback(
    async (checkboxType: "terms" | "document", value: boolean) => {
      updateField(checkboxType as keyof T, value as T[keyof T]);

      setValue(checkboxType as never, value as never, {
        shouldValidate: true,
        shouldTouch: true,
      });

      const error = validateField(checkboxType, value, form, t);
      if (error) {
        setError(checkboxType as never, {
          type: "manual",
          message: error,
        });
      } else {
        clearErrors(checkboxType as never);
      }
    },
    [updateField, setValue, form, t, setError, clearErrors],
  );

  // Validate multiple fields
  const validateFields = useCallback(
    async (fieldNames: string[]) => {
      let allValid = true;

      for (const fieldName of fieldNames) {
        const value = form[fieldName as keyof T];
        const error = validateField(fieldName, value, form, t);

        if (error) {
          setError(fieldName as never, {
            type: "manual",
            message: error,
          });
          allValid = false;
        } else {
          clearErrors(fieldName as never);
        }

        // Mark as touched
        await trigger(fieldName as never);
      }

      return allValid;
    },
    [form, t, setError, clearErrors, trigger],
  );

  const showError = (fieldName: string) => {
    const touched = (touchedFields as Record<string, boolean>)[fieldName];
    const error = (errors as ErrorRecord)[fieldName];
    return touched && error?.message;
  };

  return {
    errors: errors as FieldErrors<T>,
    touched: touchedFields as Record<string, boolean>,
    t,
    handleFieldChange,
    handleCheckboxChange,
    showError,
    validateFields,
    trigger,
    setValue,
    setError,
    clearErrors,
  };
};
