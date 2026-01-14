import {
  RegisterInput,
  ResendOtpInput,
  UserRole,
  VerifyOtpInput,
} from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import AuthService from "@/services/auth.service";
import { uploadFile } from "@/utils/file.upload";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useRegisterStore } from "./useRegisterStore";

export const useRegister = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const form = useRegisterStore((state) => state.formData);
  const router = useRouter();
  const pathname = usePathname();
  const [method, setMethod] = useQueryState("method", {
    defaultValue: "phone",
  });
  const [type] = useQueryState("type");
  const [underReview, setUnderReview] = useQueryState("underReview");

  const [country, setCountry] = useQueryState("country", {
    defaultValue: "+966",
  });
  const [otp, setOtp] = useState("");

  const register = async () => {
    setBusy(true);
    try {
      const {
        confirmPassword,
        terms,
        document,
        commercialRegistrationFilename,
        ...rest
      } = form;
      let filename;
      if (commercialRegistrationFilename) {
        const uploadResult = await uploadFile(commercialRegistrationFilename);
        if (uploadResult.url) {
          filename = uploadResult.filename;
        }
      }
      const result = await AuthService.register({
        ...(rest as RegisterInput),
        role: type === "provider" ? UserRole.Provider : UserRole.User,
        dialCode: country,
        phone: `${country}${form.phone}`,
        commercialRegistrationFilename: filename,
      });
      if (result) {
        router.push(
          `${pathname}/verify?email=${encodeURIComponent(form.email || "")}&phone=${encodeURIComponent(
            `${country}${form.phone}`,
          )}&method=phone&type=${type}`,
        );
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : dict.auth.registerFailed,
      );
    } finally {
      setBusy(false);
    }
  };
  const verifyOtp = async (input: VerifyOtpInput) => {
    setBusy(true);
    try {
      const result = await AuthService.verifyOtp(input);
      if (result) {
        if (method === "phone") {
          setMethod("email");
          setOtp("");
        } else {
          if (type === "user") {
            showSuccessMessage(dict.auth.register.successMessage);
            setTimeout(() => {
              window.location.href = "/auth/login";
            }, 1500);
          } else {
            setUnderReview("true");
          }
        }
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : dict.auth.registerFailed,
      );
    } finally {
      setBusy(false);
    }
  };

  const resendOtp = async (input: ResendOtpInput) => {
    setBusy(true);
    try {
      await AuthService.resendOtp(input);
    } catch (error) {
      console.error("Login error:", error);
      showErrorMessage(
        error instanceof Error ? error.message : dict.auth.registerFailed,
      );
    } finally {
      setBusy(false);
    }
  };

  return { register, verifyOtp, resendOtp, otp, setOtp, busy };
};
