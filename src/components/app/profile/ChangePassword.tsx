"use client";

import { useState } from "react";
import { PasswordInput } from "../shared/inputs/PasswordInput";
import { useDict } from "@/hooks/useDict";
import { Button } from "@/components/ui/button";
import { useChangePassword } from "@/components/app/profile/useChangePassword";
import { useNewPasswordValidation } from "@/hooks/useNewPasswordValidation";

export const ChangePassword = () => {
  const dict = useDict();
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const { changePassword, busy } = useChangePassword();
  const { errors, validate, revalidate } = useNewPasswordValidation();
  return (
    <div className="grid grid-cols-1 gap-5">
      <PasswordInput
        placeholder={dict.profile.changePasswordForm.newPassword}
        value={form.newPassword}
        error={errors.password}
        onChange={(value) => {
          setForm({ ...form, newPassword: value });
          revalidate(value, form.confirmPassword);
        }}
      />
      <PasswordInput
        placeholder={dict.profile.changePasswordForm.confirmPassword}
        value={form.confirmPassword}
        error={errors.confirmPassword}
        onChange={(value) => {
          setForm({ ...form, confirmPassword: value });
          revalidate(form.newPassword, value);
        }}
      />
      <Button
        className="mt-5 h-12.5 min-w-[16vw] justify-self-center rounded-[20px] px-20"
        onClick={() => {
          if (!validate(form.newPassword, form.confirmPassword)) return;
          changePassword(form.newPassword, form.confirmPassword).then(() => {
            setForm({ newPassword: "", confirmPassword: "" });
          });
        }}
        disabled={busy}
      >
        {dict.profile.changePasswordForm.saveChanges}
      </Button>
    </div>
  );
};
