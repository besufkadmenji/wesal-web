import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const OtpInput = () => {
  return (
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
  );
};

const SlotItem = ({ index }: { index: number }) => {
  return (
    <div className="relative grid grid-cols-1">
      <InputOTPSlot
        index={index}
        className="data-[active=true]:border-primary duration-150 ease-in-out peer size-15 rounded-[20px]! ring-0!"
      />
      <div className="absolute bottom-3 h-0.5 w-5 duration-150 ease-in-out justify-self-center bg-[#F2F2F2] peer-data-[active=true]:bg-primary"></div>
    </div>
  );
};
