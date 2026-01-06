import PhoneIcon from "@/assets/icons/phone.outline.svg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { useQueryState } from "nuqs";
import { ReactNode, useState } from "react";
import { PhoneInput } from "../../shared/inputs/PhoneInput";
import { useChangePhone } from "@/components/app/profile/ChangePhone/useChangePhone";
import { InitiatePhoneChange } from "./InitiatePhoneChange";
import { VerifyPhoneChange } from "./VerifyPhoneChange";
export const PhoneChange = ({ children }: { children: ReactNode }) => {
  const { me } = useMe();
  const dict = useDict();
  const [phoneChange, setPhoneChange] = useQueryState("phoneChange");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useQueryState("country", {
    defaultValue: me?.dialCode ?? "+966",
  });
  const { initiateChange, busy } = useChangePhone();
  return (
    <Dialog
      open={!!phoneChange}
      onOpenChange={(isOpen) => {
        console.log("PhoneChange onOpenChange", isOpen, phoneChange);
        setPhoneChange(
          isOpen ? (phoneChange === null ? "initiate" : "verify") : null,
        );
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="min-w-[42vw]">
        {phoneChange === "initiate" ? (
          <InitiatePhoneChange />
        ) : (
          <VerifyPhoneChange />
        )}
      </DialogContent>
    </Dialog>
  );
};
