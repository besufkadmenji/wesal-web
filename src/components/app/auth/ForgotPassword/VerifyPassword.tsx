"use client";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { OtpInput } from "@/components/app/shared/inputs/OtpInput";
import { Button } from "@/components/ui/button";
import { OtpType } from "@/gql/graphql";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { useDict } from "@/hooks/useDict";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useForgotPassword } from "./useForgotPassword";

export const VerifyForgotPassword = () => {
  const dict = useDict();
  const [type] = useQueryState("type");
  const [target] = useQueryState("target");
  const { remainingSeconds, start, reset, formatTime } = useCountdownTimer(60);
  const { verifyOtp, resendOtp, busy } = useForgotPassword();
  const [otp, setOtp] = useState("");
  useEffect(() => {
    start();
  }, [start]);

  return (
    <Wrapper
      classNames={{
        message: "hidden lg:grid",
      }}
    >
      <div className="grid grid-cols-1 gap-6 px-6 py-10 xl:px-15">
        <div className="grid justify-items-center gap-3">
          <h1 className="text-center text-xl font-semibold text-black lg:text-2xl lg:leading-8">
            {dict.auth.resetPassword.verify.title}
          </h1>
          <p
            className="text-gray text-center text-base lg:text-lg lg:leading-9"
            dangerouslySetInnerHTML={{
              __html: (type === "phone"
                ? dict.auth.resetPassword.verify.subtitlePhone
                : dict.auth.resetPassword.verify.subtitleEmail
              ).replace(
                type === "phone" ? "{phone}" : "{email}",
                `<strong class="text-primary">${target}</strong>`,
              ),
            }}
          />
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-4">
          <OtpInput value={otp} onChange={setOtp} />
          <div className="grid grid-cols-1 justify-items-center gap-2">
            <p className="text-primary text-sm font-semibold">{formatTime()}</p>
            <p className="text-gray text-sm font-normal">
              {dict.auth.resetPassword.verify.codeNotArrived}
            </p>
          </div>
        </div>
        <div className="mt-32 grid grid-cols-1 gap-6">
          <Button
            className="h-12.5 rounded-[20px] text-base font-semibold"
            onClick={() => {
              verifyOtp({
                code: otp,
                target: target!,
              });
            }}
            disabled={busy}
          >
            {dict.auth.resetPassword.verify.verifyButton}
          </Button>
          <Button
            variant={"secondary"}
            className="text-primary h-12.5 rounded-[20px] bg-[#EFF1F6] text-base font-semibold"
            disabled={remainingSeconds > 0 || busy}
            onClick={async () => {
              await resendOtp({
                target: target!,
                type: OtpType.PhoneVerification,
              });
              reset();
            }}
          >
            {dict.auth.resetPassword.verify.resendButton}
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};
