import EmailIcon from "@/assets/icons/email.outline.svg";
import { useChangeEmail } from "@/components/app/profile/ChangeEmail/useChangeEmail";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { TextInput } from "../../shared/inputs/TextInput";
export const InitiateEmailChange = () => {
  const dict = useDict();
  const [open, setOpen] = useQueryState("emailChange", {
    defaultValue: "false",
  });

  const [email, setEmail] = useState("");

  const { initiateChange, busy } = useChangeEmail();
  return (
    <div className="grid grid-cols-1 gap-7">
      <div className="grid grid-cols-[auto_1fr] gap-6">
        <div className="grid size-15 items-center justify-items-center rounded-[16px] bg-[#EFF1F6]">
          <EmailIcon className="size-7.5" />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <h3 className="text-xl leading-8 font-semibold text-black">
            {dict.profile.changeEmail.title}
          </h3>
          <p className="text-gray leading-7">
            {dict.profile.changeEmail.description}
          </p>
        </div>
      </div>
      <TextInput
        value={email}
        onChange={(value) => setEmail(value)}
        placeholder={dict.profile.changeEmail.email}
        icon={<EmailIcon className="size-5" />}
        type="email"
      />
      <div className="grid grid-cols-2 gap-6">
        <Button
          className="h-12.5 rounded-full font-semibold outline-none!"
          onClick={() => {
            initiateChange(email);
          }}
        >
          {dict.profile.changeEmail.send}
        </Button>
        <Button
          className="h-12.5 rounded-full bg-[#F2F2F2] font-semibold text-[#4D4D4D] outline-none!"
          onClick={() => {
            setOpen(null);
          }}
          variant={"secondary"}
        >
          {dict.profile.changeEmail.cancel}
        </Button>
      </div>
    </div>
  );
};
