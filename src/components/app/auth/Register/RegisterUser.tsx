import NameIcon from "@/assets/icons/auth/name.svg";
import EmailIcon from "@/assets/icons/auth/email.svg";
import BankIcon from "@/assets/icons/auth/bank.svg";
import IbanIcon from "@/assets/icons/auth/iban.svg";
import ProfileIcon from "@/assets/icons/auth/profile.picture.svg";
import { PasswordInput } from "@/components/app/shared/inputs/PasswordInput";
import { TextInput } from "@/components/app/shared/inputs/TextInput";
import { PhoneInput } from "@/components/app/shared/inputs/PhoneInput";
import { AppCheckbox } from "@/components/app/auth/AppCheckbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDict } from "@/hooks/useDict";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { useRegisterStore } from "@/components/app/auth/Register/useRegisterStore";
import { useRegister } from "@/components/app/auth/Register/useRegister";
export const RegisterUser = () => {
  const dict = useDict();
  const form = useRegisterStore((state) => state.formData);
  const updateField = useRegisterStore((state) => state.updateField);
  const { register, busy } = useRegister();
  const {
    errors,
    handleFieldChange,
    handleCheckboxChange,
    showError,
    validateFields,
  } = useRegisterForm({ form, updateField });

  const getError = (field: string) => {
    if (!showError(field)) return undefined;
    const error = errors[field as keyof typeof errors];
    return error?.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFields = [
      "name",
      "phone",
      "email",
      "password",
      "confirmPassword",
      "bankName",
      "ibanNumber",
      "document",
      "terms",
    ];

    const isValid = await validateFields(allFields);
    console.log("isValid", isValid, errors);

    if (isValid) {
      register();
    }
  };
  return (
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
          error={errors.name?.message}
        />

        {/* Phone Field */}
        <PhoneInput
          value={form.phone || ""}
          onChange={(value) => handleFieldChange("phone", value)}
          error={errors.phone?.message}
        />

        {/* Email Field */}
        <TextInput
          icon={<EmailIcon />}
          placeholder={dict.auth.signup.email}
          value={form.email || ""}
          onChange={(value) => handleFieldChange("email", value)}
          error={errors.email?.message}
        />

        {/* Password Fields */}
        <div className="grid grid-cols-2 gap-3">
          <PasswordInput
            placeholder={dict.auth.signup.password}
            value={form.password || ""}
            onChange={(value) => handleFieldChange("password", value)}
            error={errors.password?.message}
          />
          <PasswordInput
            placeholder={dict.auth.signup.confirmPassword}
            value={form.confirmPassword || ""}
            onChange={(value) => handleFieldChange("confirmPassword", value)}
            error={errors.confirmPassword?.message}
          />
        </div>

        {/* Bank Name Field */}
        <TextInput
          icon={<BankIcon />}
          placeholder={dict.auth.signup.bankName}
          value={form.bankName || ""}
          onChange={(value) => handleFieldChange("bankName", value)}
          error={errors.bankName?.message}
        />

        {/* IBAN Field */}
        <TextInput
          icon={<IbanIcon />}
          placeholder={dict.auth.signup.ibanNumber}
          value={form.ibanNumber || ""}
          onChange={(value) => handleFieldChange("ibanNumber", value)}
          error={errors.ibanNumber?.message}
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
          checked={form.document || false}
          onChange={(value) => handleCheckboxChange("document", value)}
          error={errors.document?.message}
        />
        <AppCheckbox
          label={dict.auth.signup.termsAndConditions}
          link={{
            url: "/",
            text: dict.auth.signup.termsAndConditionsLink,
          }}
          id="terms"
          checked={form.terms || false}
          onChange={(value) => handleCheckboxChange("terms", value)}
          error={errors.terms?.message}
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
          href={"/auth/choose-type?action=login"}
          className="text-primary justify-self-end text-base font-semibold"
        >
          {dict.auth.signup.signIn}
        </Link>
      </div>
    </form>
  );
};
