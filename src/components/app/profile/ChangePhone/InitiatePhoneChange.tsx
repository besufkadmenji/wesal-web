import PhoneIcon from "@/assets/icons/phone.outline.svg";
import { useChangePhone } from "@/components/app/profile/ChangePhone/useChangePhone";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { PhoneInput } from "../../shared/inputs/PhoneInput";
export const InitiatePhoneChange = () => {
  const { me } = useMe();
  const dict = useDict();
  const [open, setOpen] = useQueryState("phoneChange", {
    defaultValue: "false",
  });
 
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useQueryState("country", {
    defaultValue: me?.dialCode ?? "+966",
  });
  const { initiateChange, busy } = useChangePhone();
  return (
    <div className="grid grid-cols-1 gap-7">
      <div className="grid grid-cols-[auto_1fr] gap-6">
        <div className="grid size-15 items-center justify-items-center rounded-[16px] bg-[#EFF1F6]">
          <PhoneIcon className="size-7.5" />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <h3 className="text-xl leading-8 font-semibold text-black">
            {dict.profile.changePhoneNumber.title}
          </h3>
          <p className="text-gray leading-7">
            {dict.profile.changePhoneNumber.description}
          </p>
        </div>
      </div>
      <PhoneInput
        value={phone}
        onChange={(value) => setPhone(value)}
        countryCode={countryCode}
        queryKey="changeDialCode"
      />
      <div className="grid grid-cols-2 gap-6">
        <Button
          className="h-12.5 rounded-full font-semibold outline-none!"
          onClick={() => {
            initiateChange(phone, countryCode);
          }}
        >
          {dict.profile.changePhoneNumber.send}
        </Button>
        <Button
          className="h-12.5 rounded-full bg-[#F2F2F2] font-semibold text-[#4D4D4D] outline-none!"
          onClick={() => {
            setOpen(null);
          }}
          variant={"secondary"}
        >
          {dict.profile.changePhoneNumber.cancel}
        </Button>
      </div>
    </div>
  );
};
