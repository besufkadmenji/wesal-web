"use client";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useQueryState } from "nuqs";
import { ResetWithEmail } from "./ResetWithEmail";
import { ResetWithPhone } from "./ResetWithPhone";
export const ForgotPassword = () => {
  const dict = useDict();
  const lang = useLang();
  const [type, setType] = useQueryState("type");
  const [method, setMethod] = useQueryState("method", {
    defaultValue: "phone",
  });
  return (
    <Wrapper
      classNames={{
        message: "hidden lg:grid",
      }}
    >
      <div className="grid grid-cols-1 gap-6 px-6 py-10 xl:px-15">
        <div className="grid justify-items-center gap-3">
          <h1 className="text-center text-xl font-semibold text-black lg:text-2xl lg:leading-8">
            {dict.auth.resetPassword.method.title}
          </h1>
          <p className="text-gray text-center text-base lg:text-lg lg:leading-9">
            {dict.auth.resetPassword.method.subtitle}
          </p>
        </div>
        {/* Radix Tabs default to left-to-right; follow the page language. */}
        <Tabs
          dir={lang === "ar" ? "rtl" : "ltr"}
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
