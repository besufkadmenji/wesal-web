import { useCallback } from "react";
import { useForm, FieldValues, FieldErrors } from "react-hook-form";
import { useDict } from "@/hooks/useDict";
import { validateField } from "@/utils/register-validation";

interface UseRegisterProviderFormProps<T extends FieldValues> {
  form: T;
  updateField: <K extends keyof T>(field: K, value: T[K]) => void;
}

type ErrorRecord = Record<string, { message?: string }>;

export const useRegisterProviderForm = <T extends FieldValues>({
  form,
  updateField,
}: UseRegisterProviderFormProps<T>) => {
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

  // Validate step 1 fields
  const validateStep1 = useCallback(async () => {
    const step1Fields = [
      "name",
      "phone",
      "email",
      "password",
      "confirmPassword",
      "avatarFile",
    ];

    let allValid = true;

    for (const fieldName of step1Fields) {
      const value = form[fieldName as keyof T];
      const error = validateField(fieldName, value, form, t);
      console.log(
        "Validating field:",
        fieldName,
        "Value:",
        value,
        "Error:",
        error,
      );
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
  }, [form, t, setError, clearErrors, trigger]);

  // Validate step 2 fields
  const validateStep2 = useCallback(async () => {
    const step2Fields = [
      "cityId",
      "address",
      "latitude",
      "longitude",
      "categoryIds",
      "terms",
    ];

    let allValid = true;

    for (const fieldName of step2Fields) {
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
  }, [form, t, setError, clearErrors, trigger]);

  const showError = useCallback(
    (fieldName: string) => {
      const touched = (touchedFields as Record<string, boolean>)[fieldName];
      const error = (errors as ErrorRecord)[fieldName];
      return touched && error?.message;
    },
    [errors, touchedFields],
  );

  const getError = useCallback(
    (field: string) => {
      if (!showError(field)) return undefined;
      const error = (errors as ErrorRecord)[field];
      return error?.message;
    },
    [errors, showError],
  );

  return {
    errors: errors as FieldErrors<T>,
    touched: touchedFields as Record<string, boolean>,
    t,
    handleFieldChange,
    handleCheckboxChange,
    showError,
    getError,
    validateStep1,
    validateStep2,
    trigger,
    setValue,
    setError,
    clearErrors,
  };
};
