"use client";
import EmailIcon from "@/assets/icons/auth/email.svg";
import { useLogin } from "@/components/app/auth/useLogin";
import { PasswordInput } from "@/components/app/shared/inputs/PasswordInput";
import { TextInput } from "@/components/app/shared/inputs/TextInput";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { translateKey } from "@/utils/dict-key";
import { validateField } from "@/utils/register-validation";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useState } from "react";

type Form = { email: string; password: string };

export const LoginWithEmail = () => {
  const [type] = useQueryState("type");
  const dict = useDict();
  const { loginUser, loginProvider, busy } = useLogin();
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Form>>({});
  // Checked here, in the page's language, before calling the API
  // (ClickUp 869fmmt01). Password: required only, the API decides the rest.
  const validate = (values: Form): Partial<Form> => ({
    email:
      validateField("email", values.email.trim(), {}, (key) =>
        translateKey(dict, key),
      ) ?? undefined,
    password: values.password
      ? undefined
      : dict.auth.validation.password.required,
  });
  const update = (field: keyof Form, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    // Re-check while an error is showing so it clears once fixed.
    if (errors[field]) setErrors(validate(next));
  };

  return (
    <form
      noValidate
      className="grid grid-cols-1 gap-20"
      onSubmit={(event) => {
        event.preventDefault();
        const found = validate(form);
        setErrors(found);
        if (found.email || found.password) return;
        const email = form.email.trim();
        if (type === "user") loginUser(email, form.password);
        else if (type === "provider") loginProvider(email, form.password);
      }}
    >
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-5">
          <TextInput
            icon={<EmailIcon />}
            placeholder={dict.auth.login.email}
            type="email"
            value={form.email}
            error={errors.email}
            onChange={(value) => update("email", value)}
          />
          <PasswordInput
            placeholder={dict.auth.login.password}
            value={form.password}
            error={errors.password}
            onChange={(value) => update("password", value)}
          />
        </div>
        <Link
          href={`/auth/forgot-password?type=${type}`}
          className="text-primary justify-self-end text-sm font-semibold"
        >
          {dict.auth.login.forgotPassword}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6.5">
        <Button
          type="submit"
          className="h-12.5 rounded-[20px] text-base font-semibold"
          disabled={busy}
        >
          {dict.auth.login.submit}
        </Button>
        <div className="flex items-center justify-center gap-2">
          <p className="text-gray text-sm leading-6 font-medium">
            {dict.auth.login.noAccount}
          </p>
          <Link
            href={"/auth/choose-type?action=register"}
            className="text-primary justify-self-end text-base font-semibold"
          >
            {dict.auth.login.createAccount}
          </Link>
        </div>
      </div>
    </form>
  );
};
