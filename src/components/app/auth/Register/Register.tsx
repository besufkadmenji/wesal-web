"use client";
import { useRegisterStore } from "@/components/app/auth/Register/useRegisterStore";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { UserRole } from "@/gql/graphql";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { RegisterProvider } from "./RegisterProvider";
import { RegisterUser } from "./RegisterUser";

export const Register = () => {
  const [type] = useQueryState("type");
  const setForm = useRegisterStore((state) => state.setFormData);
  useEffect(() => {
    if (type) {
      setForm({ role: type === "user" ? UserRole.User : UserRole.Provider });
    }

    return () => {};
  }, [setForm, type]);

  return (
    <Wrapper>
      {type === "provider" ? <RegisterProvider /> : <RegisterUser />}
    </Wrapper>
  );
};
