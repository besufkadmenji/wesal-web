"use client";
import { LoginWithEmail } from "@/components/app/auth/LoginWithEmail";
import { LoginWithPhone } from "@/components/app/auth/LoginWithPhone";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
export const Login = () => {
  const dict = useDict();
  const [type] = useQueryState("type");
  const [method, setMethod] = useQueryState("method", {
    defaultValue: "phone",
  });
  const router = useRouter();
  useEffect(() => {
    if (!type) {
      router.replace("/auth/choose-type");
    }
    return () => {};
  }, [router, type]);
  return (
    type && (
      <Wrapper
        classNames={{
          message: "hidden lg:grid",
        }}
      >
        <div className="grid grid-cols-1 gap-10 px-4 py-10 lg:px-15 lg:py-27">
          <div className="grid justify-items-center gap-3">
            <h1 className="text-xl font-semibold text-black lg:text-2xl lg:leading-8">
              {dict.auth.login.title}
            </h1>
            <p className="text-gray text-center text-base lg:text-lg lg:leading-9">
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
                className="data-[state=active]:bg-light-primary h-11.5 rounded-[16px] text-xs font-semibold data-[state=active]:shadow-none lg:text-sm"
              >
                {dict.auth.login.signInWithPhone}
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="data-[state=active]:bg-light-primary h-11.5 rounded-[16px] text-xs font-semibold data-[state=active]:shadow-none lg:text-sm"
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
    )
  );
};
