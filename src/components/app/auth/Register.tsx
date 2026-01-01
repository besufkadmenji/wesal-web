"use client";
import NameIcon from "@/assets/icons/auth/name.svg";
import EmailIcon from "@/assets/icons/auth/email.svg";
import BankIcon from "@/assets/icons/auth/bank.svg";
import IbanIcon from "@/assets/icons/auth/iban.svg";
import ProfileIcon from "@/assets/icons/auth/profile.picture.svg";
import { PasswordInput } from "@/components/app/shared/inputs/PasswordInput";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { useDict } from "@/hooks/useDict";
import { useQueryState } from "nuqs";
import { TextInput } from "../shared/inputs/TextInput";
import { PhoneInput } from "../shared/inputs/PhoneInput";
import { AppCheckbox } from "@/components/app/auth/AppCheckbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Register = () => {
  const dict = useDict();
  const [type, setType] = useQueryState("type");
  const [method, setMethod] = useQueryState("method", {
    defaultValue: "phone",
  });
  return (
    <Wrapper>
      <div className="grid grid-cols-1 gap-6 px-15 py-10">
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
          <TextInput icon={<NameIcon />} placeholder={dict.auth.signup.name} />
          <PhoneInput />
          <TextInput
            icon={<EmailIcon />}
            placeholder={dict.auth.signup.email}
          />
          <div className="grid grid-cols-2 gap-3">
            <PasswordInput placeholder={dict.auth.signup.password} />
            <PasswordInput placeholder={dict.auth.signup.confirmPassword} />
          </div>
          <TextInput
            icon={<BankIcon />}
            placeholder={dict.auth.signup.bankName}
          />
          <TextInput
            icon={<IbanIcon />}
            placeholder={dict.auth.signup.ibanNumber}
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <AppCheckbox
            label={dict.auth.signup.documentLink}
            link={{
              url: "/",
              text: dict.auth.signup.documentLinkText,
            }}
            id="document"
          />
          <AppCheckbox
            label={dict.auth.signup.termsAndConditions}
            link={{
              url: "/",
              text: dict.auth.signup.termsAndConditionsLink,
            }}
            id="terms"
          />
        </div>
        <Button className="h-12.5 rounded-[20px] text-base font-semibold">
          {dict.auth.signup.submit}
        </Button>
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
      </div>
    </Wrapper>
  );
};
