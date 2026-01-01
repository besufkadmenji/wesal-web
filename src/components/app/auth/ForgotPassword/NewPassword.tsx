"use client";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { showSuccessMessage } from "@/utils/show.messages";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { PasswordInput } from "../../shared/inputs/PasswordInput";
export const NewPassword = () => {
  const dict = useDict();
  const [type, setType] = useQueryState("type");
  const [method, setMethod] = useQueryState("method", {
    defaultValue: "phone",
  });
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Wrapper>
      <div className="grid grid-cols-1 gap-10 px-15 py-27">
        <div className="grid justify-items-center gap-3">
          <h1 className="text-2xl leading-8 font-semibold text-black">
            {dict.auth.resetPassword.setNewPassword.title}
          </h1>
          <p className="text-gray text-center text-lg leading-9">
            {dict.auth.resetPassword.setNewPassword.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5">
          <PasswordInput
            placeholder={dict.auth.resetPassword.setNewPassword.newPassword}
          />
          <PasswordInput
            placeholder={dict.auth.resetPassword.setNewPassword.confirmPassword}
          />
          <Button
            className="mt-40 h-12.5 rounded-[20px] text-base font-semibold"
            onClick={() =>
              showSuccessMessage("Password has been reset successfully!")
            }
          >
            {dict.auth.resetPassword.setNewPassword.submit}
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};
