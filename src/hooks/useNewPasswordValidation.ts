import { useDict } from "@/hooks/useDict";
import { translateKey } from "@/utils/dict-key";
import { validateField } from "@/utils/register-validation";
import { useState } from "react";

type NewPasswordErrors = { password?: string; confirmPassword?: string };

/**
 * ClickUp 869fmmfge: changing or resetting a password used the same rules as
 * registration (8+ characters with upper and lower case, a number and a
 * special character) only at sign-up; any 8 characters were accepted here.
 */
export const useNewPasswordValidation = () => {
  const dict = useDict();
  const [errors, setErrors] = useState<NewPasswordErrors>({});
  const t = (key: string) => translateKey(dict, key);

  const check = (password: string, confirmPassword: string) => {
    const next: NewPasswordErrors = {
      password: validateField("password", password, {}, t) ?? undefined,
      confirmPassword:
        validateField("confirmPassword", confirmPassword, { password }, t) ??
        undefined,
    };
    setErrors(next);
    return !next.password && !next.confirmPassword;
  };

  return {
    errors,
    /** Validates both fields; true when the new password can be sent. */
    validate: check,
    /** Re-checks while errors are showing, so they clear once fixed. */
    revalidate: (password: string, confirmPassword: string) => {
      if (errors.password || errors.confirmPassword)
        check(password, confirmPassword);
    },
  };
};
