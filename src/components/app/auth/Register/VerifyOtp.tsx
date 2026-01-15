"use client";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { OtpInput } from "@/components/app/shared/inputs/OtpInput";
import { Button } from "@/components/ui/button";
import { OtpType } from "@/gql/graphql";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { useDict } from "@/hooks/useDict";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { UnderReview } from "./UnderReview";
import { useRegister } from "./useRegister";

export const VerifyOtp = () => {
  const dict = useDict();
  const [type, setType] = useQueryState("type");
  const [method, setMethod] = useQueryState("method", {
    defaultValue: "phone",
  });
  const [phone, setPhone] = useQueryState("phone");
  const [email, setEmail] = useQueryState("email");
  const { remainingSeconds, start, reset, formatTime } = useCountdownTimer(60);
  const { verifyOtp, resendOtp, otp, setOtp, busy } = useRegister();
  useEffect(() => {
    start();
  }, [start]);

  return (
    <>
      <Wrapper
        classNames={{
          message: "hidden lg:grid",
        }}
      >
        <div className="grid grid-cols-1 gap-6 px-6 py-10 xl:px-15">
          <div className="grid justify-items-center gap-3">
            <h1 className="text-center text-xl font-semibold text-black lg:text-2xl lg:leading-8">
              {dict.auth.register.verify.title}
            </h1>
            <p
              className="text-gray text-center text-base lg:text-lg lg:leading-9"
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
              <p className="text-primary text-sm font-semibold">
                {formatTime()}
              </p>
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
      <UnderReview />
    </>
  );
};
