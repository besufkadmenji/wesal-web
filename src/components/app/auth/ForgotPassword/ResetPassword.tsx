"use client";
import { useForgotPassword } from "@/components/app/auth/ForgotPassword/useForgotPassword";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { useNewPasswordValidation } from "@/hooks/useNewPasswordValidation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { PasswordInput } from "../../shared/inputs/PasswordInput";
export const ResetPassword = () => {
  const dict = useDict();
  const [token] = useQueryState("token");
  const { resetPassword, busy } = useForgotPassword();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const { errors, validate, revalidate } = useNewPasswordValidation();
  return (
    <Wrapper
      classNames={{
        message: "hidden lg:grid",
      }}
    >
      <div className="grid grid-cols-1 gap-6 px-6 py-10 xl:px-15">
        <div className="grid justify-items-center gap-3">
          <h1 className="text-center text-xl font-semibold text-black lg:text-2xl lg:leading-8">
            {dict.auth.resetPassword.setNewPassword.title}
          </h1>
          <p className="text-gray text-center text-base lg:text-lg lg:leading-9">
            {dict.auth.resetPassword.setNewPassword.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5">
          <PasswordInput
            placeholder={dict.auth.resetPassword.setNewPassword.newPassword}
            value={form.password}
            error={errors.password}
            onChange={(value) => {
              setForm((prev) => ({ ...prev, password: value }));
              revalidate(value, form.confirmPassword);
            }}
          />
          <PasswordInput
            placeholder={dict.auth.resetPassword.setNewPassword.confirmPassword}
            value={form.confirmPassword}
            error={errors.confirmPassword}
            onChange={(value) => {
              setForm((prev) => ({ ...prev, confirmPassword: value }));
              revalidate(form.password, value);
            }}
          />
          <Button
            className="mt-40 h-12.5 rounded-[20px] text-base font-semibold"
            onClick={() => {
              // Same rules as registration, incl. the match (ClickUp 869fmmfge).
              if (!validate(form.password, form.confirmPassword)) return;
              resetPassword({
                resetToken: token!,
                newPassword: form.password,
              });
            }}
            disabled={busy}
          >
            {dict.auth.resetPassword.setNewPassword.submit}
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};
