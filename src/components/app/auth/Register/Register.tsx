"use client";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { useQueryState } from "nuqs";
import { RegisterProvider } from "./RegisterProvider";
import { RegisterUser } from "./RegisterUser";

export const Register = () => {
  const [type] = useQueryState("type");
console.log("Register type:", type);
  return (
    <Wrapper
      classNames={{
        message: "hidden lg:grid",
      }}
    >
      {type === "provider" ? <RegisterProvider /> : <RegisterUser />}
    </Wrapper>
  );
};
