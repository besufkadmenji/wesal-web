import { VerifyOtp } from "@/components/app/auth/Register/VerifyOtp";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen } from "@testing-library/react";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ otp: "" }));
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/components/app/auth/Wrapper", () => ({
  Wrapper: ({ children }: { children: ReactNode }) => <>{children}</>,
}));
vi.mock("@/components/app/auth/Register/UnderReview", () => ({
  UnderReview: () => null,
}));
vi.mock("@/components/app/shared/inputs/OtpInput", () => ({
  OTP_LENGTH: 4,
  OtpInput: () => null,
}));
vi.mock("@/hooks/useCountdownTimer", () => ({
  useCountdownTimer: () => ({
    remainingSeconds: 30,
    start: vi.fn(),
    reset: vi.fn(),
    formatTime: () => "00:30",
  }),
}));
vi.mock("@/components/app/auth/Register/useRegister", () => ({
  useRegister: () => ({
    verifyOtp: vi.fn(),
    resendOtp: vi.fn(),
    otp: state.otp,
    setOtp: vi.fn(),
    busy: false,
  }),
}));
vi.mock("@/components/app/auth/Register/useRegisterProvider", () => ({
  useRegisterProvider: () => ({
    verifyOtp: vi.fn(),
    resendOtp: vi.fn(),
    otp: "",
    setOtp: vi.fn(),
    busy: false,
  }),
}));

const verifyButton = () =>
  screen.getByRole("button", { name: en.auth.register.verify.verifyButton });

/** ClickUp 869fmm77y: a short code was sent and answered in English. */
describe("VerifyOtp", () => {
  afterEach(cleanup);

  it("keeps verify disabled until all four digits are entered", () => {
    state.otp = "123";
    render(
      <NuqsTestingAdapter searchParams="?type=user&method=phone&phone=%2B966500000000">
        <VerifyOtp />
      </NuqsTestingAdapter>,
    );
    expect(verifyButton()).toBeDisabled();
  });

  it("enables verify with a full code", () => {
    state.otp = "1234";
    render(
      <NuqsTestingAdapter searchParams="?type=user&method=phone&phone=%2B966500000000">
        <VerifyOtp />
      </NuqsTestingAdapter>,
    );
    expect(verifyButton()).toBeEnabled();
  });
});
