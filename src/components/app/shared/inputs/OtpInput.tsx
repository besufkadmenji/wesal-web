import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

/** Verification codes are 4 digits; screens enable "verify" only when full. */
export const OTP_LENGTH = 4;

export const OtpInput = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <div dir="ltr">
      {/* The real input sits under the slots with transparent text; its text
          selection still painted a blue block on a slot (ClickUp 869fmm77y). */}
      <InputOTP
        maxLength={OTP_LENGTH}
        value={value}
        onChange={onChange}
        className="selection:bg-transparent"
      >
        <InputOTPGroup>
          <SlotItem index={0} />
        </InputOTPGroup>
        <InputOTPGroup>
          <SlotItem index={1} />
        </InputOTPGroup>
        <InputOTPGroup>
          <SlotItem index={2} />
        </InputOTPGroup>
        <InputOTPGroup>
          <SlotItem index={3} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

const SlotItem = ({ index }: { index: number }) => {
  return (
    <div className="relative grid grid-cols-1">
      <InputOTPSlot
        index={index}
        className="data-[active=true]:border-primary peer size-15 rounded-[20px]! ring-0! duration-150 ease-in-out"
      />
      <div className="peer-data-[active=true]:bg-primary absolute bottom-3 h-0.5 w-5 justify-self-center bg-[#F2F2F2] duration-150 ease-in-out"></div>
    </div>
  );
};
