import { useChangeEmail } from "@/components/app/profile/ChangeEmail/useChangeEmail";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { useQueryState } from "nuqs";
import { ReactNode, useState } from "react";
import { InitiateEmailChange } from "./InitiateEmailChange";
import { VerifyEmailChange } from "./VerifyEmailChange";
export const EmailChange = ({ children }: { children: ReactNode }) => {
  const { me } = useMe();
  const dict = useDict();
  const [emailChange, setEmailChange] = useQueryState("emailChange");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useQueryState("country", {
    defaultValue: me?.user?.dialCode ?? me?.provider?.dialCode ?? "+966",
  });
  const { initiateChange, busy } = useChangeEmail();
  return (
    <Dialog
      open={!!emailChange}
      onOpenChange={(isOpen) => {
        console.log("EmailChange onOpenChange", isOpen, emailChange);
        setEmailChange(
          isOpen ? (emailChange === null ? "initiate" : "verify") : null,
        );
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="min-w-[42vw]">
        {emailChange === "initiate" ? (
          <InitiateEmailChange />
        ) : (
          <VerifyEmailChange />
        )}
      </DialogContent>
    </Dialog>
  );
};
