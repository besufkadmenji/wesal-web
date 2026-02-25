import {
  RegisterProviderInput,
  ResendOtpInput,
  VerifyOtpInput,
} from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import AuthProviderService from "@/services/auth.provider.service";
import { uploadFile } from "@/utils/file.upload";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useRegisterProviderStore } from "./useRegisterProviderStore";

export const useRegisterProvider = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const form = useRegisterProviderStore((state) => state.formData);
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
      const result = await AuthProviderService.register({
        ...(rest as RegisterProviderInput),
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
      const result = await AuthProviderService.verifyOtp(input);
      if (result) {
        if (method === "phone") {
          setMethod("email");
          setOtp("");
        } else {
          setUnderReview("true");
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
      await AuthProviderService.resendOtp(input);
      showSuccessMessage(dict.auth.otpResent);
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
