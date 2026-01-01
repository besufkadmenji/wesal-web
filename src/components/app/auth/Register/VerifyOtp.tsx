"use client";
import { OtpInput } from "@/components/app/shared/inputs/OtpInput";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { useDict } from "@/hooks/useDict";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useRegister } from "./useRegister";
import { OtpType } from "@/gql/graphql";

export const VerifyOtp = () => {
  const dict = useDict();
  const [type, setType] = useQueryState("type");
  const [method, setMethod] = useQueryState("method", {
    defaultValue: "phone",
  });
  const [phone, setPhone] = useQueryState("phone");
  const [email, setEmail] = useQueryState("email");
  const { remainingSeconds, start, reset, formatTime } = useCountdownTimer(60);
  const router = useRouter();
  const { verifyOtp, resendOtp, otp, setOtp, busy } = useRegister();
  useEffect(() => {
    start();
  }, [start]);

  return (
    <Wrapper>
      <div className="grid grid-cols-1 gap-10 px-15 py-27">
        <div className="grid justify-items-center gap-3">
          <h1 className="text-2xl leading-8 font-semibold text-black">
            {dict.auth.register.verify.title}
          </h1>
          <p
            className="text-gray text-center text-lg leading-9"
            dangerouslySetInnerHTML={{
              __html: (method === "phone"
                ? dict.auth.register.verify.subtitlePhone
                : dict.auth.register.verify.subtitleEmail
              ).replace(
                method === "phone" ? "{phone}" : "{email}",
                `<strong class="text-primary">${
                  method === "phone" ? phone : email
                }</strong>`,
              ),
            }}
          />
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-4">
          <OtpInput value={otp} onChange={setOtp} />
          <div className="grid grid-cols-1 justify-items-center gap-2">
            <p className="text-primary text-sm font-semibold">{formatTime()}</p>
            <p className="text-gray text-sm font-normal">
              {dict.auth.register.verify.codeNotArrived}
            </p>
          </div>
        </div>
        <div className="mt-32 grid grid-cols-1 gap-6">
          <Button
            className="h-12.5 rounded-[20px] text-base font-semibold"
            onClick={() => {
              verifyOtp({
                code: otp,
                target: method === "phone" ? phone! : email!,
                type:
                  method === "phone"
                    ? OtpType.PhoneVerification
                    : OtpType.EmailVerification,
              });
            }}
          >
            {dict.auth.register.verify.verifyButton}
          </Button>
          <Button
            variant={"secondary"}
            className="text-primary h-12.5 rounded-[20px] bg-[#EFF1F6] text-base font-semibold"
            disabled={remainingSeconds > 0 || busy}
            onClick={async () => {
              await resendOtp(
                method === "phone"
                  ? {
                      target: phone!,
                      type: OtpType.PhoneVerification,
                    }
                  : {
                      target: email!,
                      type: OtpType.EmailVerification,
                    },
              );
              reset();
            }}
          >
            {dict.auth.register.verify.resendButton}
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};
