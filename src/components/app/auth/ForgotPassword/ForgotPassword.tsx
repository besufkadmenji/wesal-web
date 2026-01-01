"use client";
import { TextInput } from "@/components/app/shared/inputs/TextInput";
import { PhoneInput } from "@/components/app/shared/inputs/PhoneInput";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDict } from "@/hooks/useDict";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import EmailIcon from "@/assets/icons/auth/email.svg";
import { useState } from "react";
import { useForgotPassword } from "./useForgotPassword";
export const ForgotPassword = () => {
  const dict = useDict();
  const [type, setType] = useQueryState("type");
  const [method, setMethod] = useQueryState("method", {
    defaultValue: "phone",
  });
  return (
    <Wrapper>
      <div className="grid grid-cols-1 gap-10 px-15 py-27">
        <div className="grid justify-items-center gap-3">
          <h1 className="text-2xl leading-8 font-semibold text-black">
            {dict.auth.resetPassword.method.title}
          </h1>
          <p className="text-gray text-center text-lg leading-9">
            {dict.auth.resetPassword.method.subtitle}
          </p>
        </div>
        <Tabs
          defaultValue={method}
          onValueChange={setMethod}
          className="grid grid-cols-1 gap-10"
        >
          <TabsList className="grid w-full grid-cols-2 border-none bg-transparent">
            <TabsTrigger
              value="phone"
              className="data-[state=active]:bg-light-primary h-11.5 rounded-[16px] text-sm font-semibold data-[state=active]:shadow-none"
            >
              {dict.auth.resetPassword.method.withPhone}
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="data-[state=active]:bg-light-primary h-11.5 rounded-[16px] text-sm font-semibold data-[state=active]:shadow-none"
            >
              {dict.auth.resetPassword.method.withEmail}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="phone">
            <ResetWithPhone />
          </TabsContent>
          <TabsContent value="email">
            <ResetWithEmail />
          </TabsContent>
        </Tabs>
      </div>
    </Wrapper>
  );
};

const ResetWithEmail = () => {
  const dict = useDict();
  const [email, setEmail] = useState("");
  const { forgotPassword, busy } = useForgotPassword();
  return (
    <div className="grid grid-cols-1 gap-60">
      <TextInput
        icon={<EmailIcon />}
        placeholder={dict.auth.login.email}
        type="email"
        value={email}
        onChange={(value) => setEmail(value)}
      />
      <Button
        className="h-12.5 rounded-[20px] text-base font-semibold"
        onClick={() => {
          forgotPassword(
            {
              emailOrPhone: email,
            },
            "email",
          );
        }}
        disabled={busy}
      >
        {dict.auth.resetPassword.method.submit}
      </Button>
    </div>
  );
};

const ResetWithPhone = () => {
  const dict = useDict();
  const { forgotPassword, busy } = useForgotPassword();
  const [phone, setPhone] = useState("");
  const [country] = useQueryState("country", {
    defaultValue: "+966",
  });
  return (
    <div className="grid grid-cols-1 gap-60">
      <PhoneInput value={phone} onChange={(value) => setPhone(value)} />
      <Button
        className="h-12.5 rounded-[20px] text-base font-semibold"
        onClick={() => {
          forgotPassword({
            emailOrPhone: `${country}${phone}`,
          },"phone");
        }}
        disabled={busy}
      >
        {dict.auth.resetPassword.method.submit}
      </Button>
    </div>
  );
};
