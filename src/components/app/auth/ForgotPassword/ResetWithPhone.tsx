"use client";
import { PhoneInput } from "@/components/app/shared/inputs/PhoneInput";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { translateKey } from "@/utils/dict-key";
import { validateField } from "@/utils/register-validation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useForgotPassword } from "./useForgotPassword";

export const ResetWithPhone = () => {
  const dict = useDict();
  const { forgotPassword, busy } = useForgotPassword();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string>();
  const [country] = useQueryState("country", {
    defaultValue: "+966",
  });
  // Same per-country rules and messages as registration (ClickUp 869fkww0n).
  const validate = (value: string) =>
    validateField("phone", value.trim(), { dialCode: country }, (key) =>
      translateKey(dict, key),
    );

  return (
    <form
      noValidate
      className="grid grid-cols-1 gap-60"
      onSubmit={(event) => {
        event.preventDefault();
        const message = validate(phone);
        setError(message ?? undefined);
        if (message) return;
        forgotPassword({ emailOrPhone: `${country}${phone.trim()}` }, "phone");
      }}
    >
      <PhoneInput
        value={phone}
        error={error}
        onChange={(value) => {
          setPhone(value);
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
