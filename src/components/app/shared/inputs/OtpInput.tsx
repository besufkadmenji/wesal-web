import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const OtpInput = () => {
  return (
    <div dir="ltr">
      <InputOTP maxLength={4}>
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
