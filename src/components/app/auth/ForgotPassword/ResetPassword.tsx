"use client";
import { useForgotPassword } from "@/components/app/auth/ForgotPassword/useForgotPassword";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { showErrorMessage } from "@/utils/show.messages";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { PasswordInput } from "../../shared/inputs/PasswordInput";
export const ResetPassword = () => {
  const dict = useDict();
  const [token] = useQueryState("token");
  const { resetPassword, busy } = useForgotPassword();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  return (
    <Wrapper>
      <div className="grid grid-cols-1 gap-10 px-15 py-27">
        <div className="grid justify-items-center gap-3">
          <h1 className="text-2xl leading-8 font-semibold text-black">
            {dict.auth.resetPassword.setNewPassword.title}
          </h1>
          <p className="text-gray text-center text-lg leading-9">
            {dict.auth.resetPassword.setNewPassword.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5">
          <PasswordInput
            placeholder={dict.auth.resetPassword.setNewPassword.newPassword}
            value={form.password}
            onChange={(value) => {
              setForm((prev) => ({ ...prev, password: value }));
            }}
          />
          <PasswordInput
            placeholder={dict.auth.resetPassword.setNewPassword.confirmPassword}
            value={form.confirmPassword}
            onChange={(value) => {
              setForm((prev) => ({ ...prev, confirmPassword: value }));
            }}
          />
          <Button
            className="mt-40 h-12.5 rounded-[20px] text-base font-semibold"
            onClick={() => {
              if (form.password !== form.confirmPassword) {
                showErrorMessage(
                  dict.auth.resetPassword.setNewPassword.passwordMismatch,
                );
                return;
              }
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
