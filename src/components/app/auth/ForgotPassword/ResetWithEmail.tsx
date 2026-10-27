"use client";
import EmailIcon from "@/assets/icons/auth/email.svg";
import { TextInput } from "@/components/app/shared/inputs/TextInput";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { translateKey } from "@/utils/dict-key";
import { validateField } from "@/utils/register-validation";
import { useState } from "react";
import { useForgotPassword } from "./useForgotPassword";

export const ResetWithEmail = () => {
  const dict = useDict();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const { forgotPassword, busy } = useForgotPassword();
  // Same rules and messages as registration (ClickUp 869fkww0n).
  const validate = (value: string) =>
    validateField("email", value.trim(), {}, (key) => translateKey(dict, key));

  return (
    <form
      noValidate
      className="grid grid-cols-1 gap-60"
      onSubmit={(event) => {
        event.preventDefault();
        const message = validate(email);
        setError(message ?? undefined);
        if (message) return;
        forgotPassword({ emailOrPhone: email.trim() }, "email");
      }}
    >
      <TextInput
        icon={<EmailIcon />}
        placeholder={dict.auth.login.email}
        type="email"
        value={email}
        error={error}
        onChange={(value) => {
          setEmail(value);
          // Re-check while an error is showing so it clears once fixed.
          if (error) setError(validate(value) ?? undefined);
        }}
      />
      <Button
        type="submit"
        className="h-12.5 rounded-[20px] text-base font-semibold"
        disabled={busy}
      >
        {dict.auth.resetPassword.method.submit}
      </Button>
    </form>
  );
};
