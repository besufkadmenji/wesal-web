import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useQueryState } from "nuqs";
import { ReactNode } from "react";
import { InitiatePhoneChange } from "./InitiatePhoneChange";
import { VerifyPhoneChange } from "./VerifyPhoneChange";
export const PhoneChange = ({ children }: { children: ReactNode }) => {
  const [phoneChange, setPhoneChange] = useQueryState("phoneChange");

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
