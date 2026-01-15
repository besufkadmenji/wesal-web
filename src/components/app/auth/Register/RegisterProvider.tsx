"use client";
import BusinessIcon from "@/assets/icons/auth/business.svg";
import DocumentIcon from "@/assets/icons/auth/document.svg";
import EmailIcon from "@/assets/icons/auth/email.svg";
import NameIcon from "@/assets/icons/auth/name.svg";
import CheckIcon from "@/assets/icons/check.svg";
import { useRegister } from "@/components/app/auth/Register/useRegister";
import type { FormType } from "@/components/app/auth/Register/useRegisterStore";
import { useRegisterStore } from "@/components/app/auth/Register/useRegisterStore";
import { PasswordInput } from "@/components/app/shared/inputs/PasswordInput";
import { PhoneInput } from "@/components/app/shared/inputs/PhoneInput";
import { TextInput } from "@/components/app/shared/inputs/TextInput";
import { UploadImage } from "@/components/app/shared/UploadImage";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { useRegisterProviderForm } from "@/hooks/useRegisterProviderForm";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { twMerge } from "tailwind-merge";

import AddressIcon from "@/assets/icons/address.svg";
import { AppCheckbox } from "@/components/app/auth/AppCheckbox";
import {
  CategorySelect,
  CitySelect,
} from "@/components/app/auth/Register/FormSelect";
import { PickLocation } from "@/components/app/auth/Register/PickLocation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

export const RegisterProvider = () => {
  const dict = useDict();
  const form = useRegisterStore((state) => state.formData);
  const updateField = useRegisterStore((state) => state.updateField);
  const { register, busy } = useRegister();
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(1));
  const {
    validateStep1,
    validateStep2,
    errors,
    handleFieldChange,
    handleCheckboxChange,
  } = useRegisterProviderForm({
    form,
    updateField,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate based on current step
    if (step === 1) {
      const isValid = await validateStep1();
      console.log("Step 1 validation:", isValid, errors);
      if (isValid) {
        setStep(2, { history: "push" });
      }
    } else {
      const isValid = await validateStep2();
      console.log("Step 2 validation:", isValid, errors);
      if (isValid) {
        register();
      }
    }
  };

  useEffect(() => {
    setStep(1, { history: "replace" });

    return () => {};
  }, [setStep]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 px-6 py-10 xl:px-15"
    >
      <div className="grid justify-items-center gap-10">
        <div className="grid justify-items-center gap-3">
          <h1 className="text-center text-xl font-semibold text-black lg:text-2xl lg:leading-8">
            {dict.auth.signup.provider.title}
          </h1>
          <p className="text-gray text-center text-base lg:text-lg lg:leading-9">
            {dict.auth.signup.provider.subtitle}
          </p>
        </div>
        <Stepper currentStep={step} />
      </div>

      {step === 1 ? (
        <BasicInfoForm
          handleFieldChange={handleFieldChange}
          errors={errors}
          updateField={updateField}
        />
      ) : (
        <ProviderForm
          handleFieldChange={handleFieldChange}
          handleCheckboxChange={handleCheckboxChange}
          errors={errors}
        />
      )}

      {/* Submit Button */}
      <Button
        className="h-12.5 rounded-[20px] text-base font-semibold"
        type="submit"
        disabled={busy}
      >
        {step === 1 ? dict.auth.choose.next : dict.auth.signup.submit}
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

const Stepper = ({ currentStep }: { currentStep: number }) => {
  const dict = useDict();
  return (
    <div className="grid grid-cols-[auto_auto_auto] justify-center gap-4">
      <StepperItem
        active={currentStep == 1}
        completed={currentStep > 1}
        label={dict.auth.signup.provider.step1}
        number={1}
      />
      <div className="mt-4.5 h-1 w-20 rounded-full bg-[#E5E7EB]" />
      <StepperItem
        active={currentStep == 2}
        completed={currentStep > 2}
        label={dict.auth.signup.provider.step2}
        number={2}
      />
    </div>
  );
};

const StepperItem = ({
  active,
  completed,
  label,
  number,
}: {
  active: boolean;
  completed: boolean;
  label: string;
  number: number;
}) => {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-2">
      <div
        className={twMerge(
          "grid size-10 items-center justify-items-center rounded-full bg-[#F2F2F2]",
          active && "bg-[#4B5981] text-white",
          completed && "bg-[#0F9D58]",
        )}
      >
        {completed ? <CheckIcon className="size-6" /> : <p>{number}</p>}
      </div>
      <p className="text-center text-xs leading-5 font-normal">{label}</p>
    </div>
  );
};

const BasicInfoForm = ({
  handleFieldChange,
  errors,
  updateField,
}: {
  handleFieldChange: (fieldName: string, value: unknown) => Promise<void>;
  errors: Record<string, { message?: string }>;
  updateField: <K extends keyof FormType>(field: K, value: FormType[K]) => void;
}) => {
  const dict = useDict();
  const form = useRegisterStore((state) => state.formData);

  return (
    <div className="grid grid-cols-1 gap-5">
      {/* Name Field */}
      <TextInput
        icon={<NameIcon />}
        placeholder={dict.auth.signup.name}
        value={form.name || ""}
        onChange={(value) => handleFieldChange("name", value)}
        error={errors.name?.message}
      />
      {/* Name Field */}
      <TextInput
        icon={<BusinessIcon />}
        placeholder={dict.auth.signup.provider.commercialName}
        value={form.commercialName || ""}
        onChange={(value) => handleFieldChange("commercialName", value)}
        error={errors.commercialName?.message}
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
      <div className="grid grid-cols-1 gap-x-3 gap-y-5 lg:grid-cols-2">
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
      <TextInput
        icon={<DocumentIcon />}
        placeholder={dict.auth.signup.provider.commercialRegistrationNumber}
        value={form.commercialRegistrationNumber || ""}
        onChange={(value) =>
          handleFieldChange("commercialRegistrationNumber", value)
        }
        error={errors.commercialRegistrationNumber?.message}
      />
      <UploadImage
        file={form.commercialRegistrationFilename ?? null}
        onChange={(f: File) => {
          updateField(
            "commercialRegistrationFilename",
            f as FormType["commercialRegistrationFilename"],
          );
          handleFieldChange("commercialRegistrationFilename", f);
        }}
        placeholder={dict.auth.signup.provider.uploadCommercialRegistration}
        error={errors.commercialRegistrationFilename?.message}
      />
    </div>
  );
};

const ProviderForm = ({
  handleFieldChange,
  handleCheckboxChange,
  errors,
}: {
  handleFieldChange: (fieldName: string, value: unknown) => Promise<void>;
  handleCheckboxChange: (
    checkboxType: "terms" | "document" | "withAbsher",
    value: boolean,
  ) => Promise<void>;
  errors: Record<string, { message?: string }>;
}) => {
  const dict = useDict();
  const form = useRegisterStore((state) => state.formData);

  console.log("ProviderForm rendered");

  return (
    <div className="grid grid-cols-1 gap-5">
      <CitySelect
        value={form.cityId || ""}
        onChange={(value) => handleFieldChange("cityId", value)}
        error={errors.cityId?.message}
      />
      <TextInput
        icon={<AddressIcon className="size-4" />}
        placeholder={dict.auth.signup.provider.address}
        value={form.address || ""}
        onChange={(value) => handleFieldChange("address", value)}
        error={errors.address?.message}
      />
      <PickLocation
        error={errors.latitude?.message || errors.longitude?.message}
        onChange={(lat, lng) => {
          handleFieldChange("latitude", lat);
          handleFieldChange("longitude", lng);
        }}
        latitude={form.latitude || undefined}
        longitude={form.longitude || undefined}
      />
      <CategorySelect
        error={errors.categoryIds?.message}
        value={form.categoryIds || []}
        onChange={(value) => {
          handleFieldChange("categoryIds", value);
        }}
      />
      <div className="grid grid-cols-1 gap-2 rounded-[16px] border border-[#F2F2F2] bg-[#FBFBFB] p-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="verifyWithAbsher"
            className="size-4.5 border-2 border-[#999999] shadow-none ring-0!"
            checked={form.withAbsher || false}
            onCheckedChange={(checked) =>
              handleCheckboxChange("withAbsher", checked as boolean)
            }
          />
          <div className="flex items-center gap-1">
            <Label
              htmlFor="verifyWithAbsher"
              className="text-base font-medium text-black"
            >
              {dict.auth.signup.provider.verifyWithAbsher}
            </Label>
            <p className="text-gray text-xs font-normal">
              {dict.auth.signup.provider.verifyWithAbsherOptional}
            </p>
          </div>
        </div>
        <p className="text-gray text-base leading-7 font-normal">
          {dict.auth.signup.provider.verifyWithAbsherDescription}
        </p>
      </div>
      <div className="grid grid-cols-1 px-1">
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
    </div>
  );
};
