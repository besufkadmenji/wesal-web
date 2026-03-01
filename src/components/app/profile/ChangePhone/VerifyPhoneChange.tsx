import OtpIcon from "@/assets/icons/otp.svg";
import { useChangePhone } from "@/components/app/profile/ChangePhone/useChangePhone";
import { OtpInput } from "@/components/app/shared/inputs/OtpInput";
import { Button } from "@/components/ui/button";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
export const VerifyPhoneChange = () => {
  const { me } = useMe();
  const dict = useDict();
  const { remainingSeconds, start, reset, formatTime } = useCountdownTimer(60);
  const [selectedPhone, setSelectedPhone] = useQueryState("selectedPhone", {
    defaultValue: "false",
  });
  const [countryCode, setCountryCode] = useQueryState("country", {
    defaultValue: me?.user?.dialCode ?? me?.provider?.dialCode ?? "+966",
  });
  const [otp, setOtp] = useState("");
  const { verifyChange, busy } = useChangePhone();
  useEffect(() => {
    start();
  }, [start]);
  return (
    <div className="grid grid-cols-1 gap-7">
      <div className="grid grid-cols-[auto_1fr] gap-6">
        <div className="grid size-15 items-center justify-items-center rounded-[16px] bg-[#EFF1F6]">
          <OtpIcon className="size-7.5" />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <h3 className="text-xl leading-8 font-semibold text-black">
            {dict.profile.phoneVerification.title}
          </h3>
          <p
            className="text-gray leading-7"
            dangerouslySetInnerHTML={{
              __html: dict.profile.phoneVerification.description.replace(
                "{phone}",
                `<strong class="text-primary">${selectedPhone}</strong>`,
              ),
            }}
          />
        </div>
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
            verifyChange(otp, countryCode);
          }}
        >
          {dict.auth.register.verify.verifyButton}
        </Button>
        <Button
          variant={"secondary"}
          className="text-primary h-12.5 rounded-[20px] bg-[#EFF1F6] text-base font-semibold"
          disabled={remainingSeconds > 0 || busy}
          onClick={async () => {
            // await initiateChange(

            // );
            reset();
          }}
        >
          {dict.auth.register.verify.resendButton}
        </Button>
      </div>
    </div>
  );
};
