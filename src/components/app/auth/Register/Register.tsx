"use client";
import NameIcon from "@/assets/icons/auth/name.svg";
import EmailIcon from "@/assets/icons/auth/email.svg";
import BankIcon from "@/assets/icons/auth/bank.svg";
import IbanIcon from "@/assets/icons/auth/iban.svg";
import ProfileIcon from "@/assets/icons/auth/profile.picture.svg";
import { PasswordInput } from "@/components/app/shared/inputs/PasswordInput";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { useDict } from "@/hooks/useDict";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { TextInput } from "../../shared/inputs/TextInput";
import { PhoneInput } from "../../shared/inputs/PhoneInput";
import { AppCheckbox } from "@/components/app/auth/AppCheckbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRegisterStore } from "@/components/app/auth/Register/useRegisterStore";
import { useRegister } from "./useRegister";

export const Register = () => {
  const dict = useDict();
  const form = useRegisterStore((state) => state.formData);
  const updateField = useRegisterStore((state) => state.updateField);
  const { register, busy } = useRegister();
  const {
    errors,
    handleFieldChange,
    handleCheckboxChange,
    handleSubmit: validateForm,
    showError,
  } = useRegisterForm({ form, updateField });

  const handleSubmit = (e: React.FormEvent) => {
    const isValid = validateForm(e);
    console.log("isValid", isValid, errors);
    if (isValid) {
      register();
    }
  };

  return (
    <Wrapper>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 px-15 py-10"
      >
        <div className="grid justify-items-center gap-10">
          <div className="grid justify-items-center gap-3">
            <h1 className="text-2xl leading-8 font-semibold text-black">
              {dict.auth.signup.title}
            </h1>
            <p className="text-gray text-center text-lg leading-9">
              {dict.auth.signup.subtitle}
            </p>
          </div>
          <ProfileIcon className="size-20" />
        </div>

        <div className="grid grid-cols-1 gap-5">
          {/* Name Field */}
          <TextInput
            icon={<NameIcon />}
            placeholder={dict.auth.signup.name}
            value={form.name || ""}
            onChange={(value) => handleFieldChange("name", value)}
            error={showError("name") ? errors.name : undefined}
          />

          {/* Phone Field */}
          <PhoneInput
            value={form.phone || ""}
            onChange={(value) => handleFieldChange("phone", value)}
            error={showError("phone") ? errors.phone : undefined}
          />

          {/* Email Field */}
          <TextInput
            icon={<EmailIcon />}
            placeholder={dict.auth.signup.email}
            value={form.email || ""}
            onChange={(value) => handleFieldChange("email", value)}
            error={showError("email") ? errors.email : undefined}
          />

          {/* Password Fields */}
          <div className="grid grid-cols-2 gap-3">
            <PasswordInput
              placeholder={dict.auth.signup.password}
              value={form.password || ""}
              onChange={(value) => handleFieldChange("password", value)}
              error={showError("password") ? errors.password : undefined}
            />
            <PasswordInput
              placeholder={dict.auth.signup.confirmPassword}
              value={form.confirmPassword || ""}
              onChange={(value) => handleFieldChange("confirmPassword", value)}
              error={
                showError("confirmPassword")
                  ? errors.confirmPassword
                  : undefined
              }
            />
          </div>

          {/* Bank Name Field */}
          <TextInput
            icon={<BankIcon />}
            placeholder={dict.auth.signup.bankName}
            value={form.bankName || ""}
            onChange={(value) => handleFieldChange("bankName", value)}
            error={showError("bankName") ? errors.bankName : undefined}
          />

          {/* IBAN Field */}
          <TextInput
            icon={<IbanIcon />}
            placeholder={dict.auth.signup.ibanNumber}
            value={form.ibanNumber || ""}
            onChange={(value) => handleFieldChange("ibanNumber", value)}
            error={showError("ibanNumber") ? errors.ibanNumber : undefined}
          />
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-1 gap-3">
          <AppCheckbox
            label={dict.auth.signup.documentLink}
            link={{
              url: "/",
              text: dict.auth.signup.documentLinkText,
            }}
            id="document"
            onChange={(value) => handleCheckboxChange("document", value)}
            error={showError("document") ? errors.document : undefined}
          />
          <AppCheckbox
            label={dict.auth.signup.termsAndConditions}
            link={{
              url: "/",
              text: dict.auth.signup.termsAndConditionsLink,
            }}
            id="terms"
            onChange={(value) => handleCheckboxChange("terms", value)}
            error={showError("terms") ? errors.terms : undefined}
          />
        </div>

        {/* Submit Button */}
        <Button
          className="h-12.5 rounded-[20px] text-base font-semibold"
          type="submit"
          disabled={busy}
        >
          {dict.auth.signup.submit}
        </Button>

        {/* Sign In Link */}
        <div className="flex items-center justify-center gap-2">
          <p className="text-gray text-sm leading-6 font-medium">
            {dict.auth.signup.haveAccount}
          </p>
          <Link
            href={"/auth/login"}
            className="text-primary justify-self-end text-base font-semibold"
          >
            {dict.auth.signup.signIn}
          </Link>
        </div>
      </form>
    </Wrapper>
  );
};
