"use client";
import { PasswordInput } from "@/components/app/shared/inputs/PasswordInput";
import { PhoneInput } from "@/components/app/shared/inputs/PhoneInput";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDict } from "@/hooks/useDict";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { TextInput } from "../shared/inputs/TextInput";
import EmailIcon from "@/assets/icons/auth/email.svg";
import { useAuth } from "@/components/app/auth/useAuth";
import { useState } from "react";
export const Login = () => {
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
            {dict.auth.login.title}
          </h1>
          <p className="text-gray text-center text-lg leading-9">
            {dict.auth.login.subtitle}
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
              {dict.auth.login.signInWithPhone}
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="data-[state=active]:bg-light-primary h-11.5 rounded-[16px] text-sm font-semibold data-[state=active]:shadow-none"
            >
              {dict.auth.login.signInWithEmail}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="phone">
            <LoginWithPhone />
          </TabsContent>
          <TabsContent value="email">
            <LoginWithEmail />
          </TabsContent>
        </Tabs>
      </div>
    </Wrapper>
  );
};

const LoginWithEmail = () => {
  const dict = useDict();
  const { login, busy } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="grid grid-cols-1 gap-20">
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-5">
          <TextInput
            icon={<EmailIcon />}
            placeholder={dict.auth.login.email}
            type="email"
            value={form.email}
            onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
          />
          <PasswordInput
            placeholder={dict.auth.login.password}
            value={form.password}
            onChange={(value) =>
              setForm((prev) => ({ ...prev, password: value }))
            }
          />
        </div>
        <Link
          href={"/auth/forgot-password"}
          className="text-primary justify-self-end text-sm font-semibold"
        >
          {dict.auth.login.forgotPassword}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6.5">
        <Button
          className="h-12.5 rounded-[20px] text-base font-semibold"
          onClick={() => login(form.email, form.password)}
          disabled={busy}
        >
          {dict.auth.login.submit}
        </Button>
        <div className="flex items-center justify-center gap-2">
          <p className="text-gray text-sm leading-6 font-medium">
            {dict.auth.login.noAccount}
          </p>
          <Link
            href={"/auth/register"}
            className="text-primary justify-self-end text-base font-semibold"
          >
            {dict.auth.login.createAccount}
          </Link>
        </div>
      </div>
    </div>
  );
};

const LoginWithPhone = () => {
  const dict = useDict();
  return (
    <div className="grid grid-cols-1 gap-20">
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-5">
          <PhoneInput />
          <PasswordInput placeholder={dict.auth.login.password} />
        </div>
        <Link
          href={"/auth/forgot-password"}
          className="text-primary justify-self-end text-sm font-semibold"
        >
          {dict.auth.login.forgotPassword}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6.5">
        <Button className="h-12.5 rounded-[20px] text-base font-semibold">
          {dict.auth.login.submit}
        </Button>
        <div className="flex items-center justify-center gap-2">
          <p className="text-gray text-sm leading-6 font-medium">
            {dict.auth.login.noAccount}
          </p>
          <Link
            href={"/auth/register"}
            className="text-primary justify-self-end text-base font-semibold"
          >
            {dict.auth.login.createAccount}
          </Link>
        </div>
      </div>
    </div>
  );
};
