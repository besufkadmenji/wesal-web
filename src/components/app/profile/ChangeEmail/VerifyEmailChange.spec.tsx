import { VerifyEmailChange } from "@/components/app/profile/ChangeEmail/VerifyEmailChange";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { afterEach, describe, expect, it, vi } from "vitest";

const initiateChange = vi.fn();
const showSuccessMessage = vi.fn();
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/hooks/useMe", () => ({ useMe: () => ({ me: null }) }));
vi.mock("@/assets/icons/otp.svg", () => ({ default: () => <svg /> }));
vi.mock("@/components/app/shared/inputs/OtpInput", () => ({
  OTP_LENGTH: 4,
  OtpInput: () => null,
}));
vi.mock("@/hooks/useCountdownTimer", () => ({
  useCountdownTimer: () => ({
    remainingSeconds: 0,
    start: vi.fn(),
    reset: vi.fn(),
    formatTime: () => "00:00",
  }),
}));
vi.mock("@/utils/show.messages", () => ({
  showSuccessMessage: (message: string) => showSuccessMessage(message),
  showErrorMessage: vi.fn(),
}));
vi.mock("@/components/app/profile/ChangeEmail/useChangeEmail", () => ({
  useChangeEmail: () => ({
    verifyChange: vi.fn(),
    initiateChange,
    busy: false,
  }),
}));

const resend = () =>
  screen.getByRole("button", { name: en.auth.register.verify.resendButton });

/** The change-email resend only restarted the timer; it sent nothing. */
describe("VerifyEmailChange resend", () => {
  afterEach(() => {
    cleanup();
    initiateChange.mockReset();
    showSuccessMessage.mockReset();
  });

  it("sends a new code to the same address and confirms it", async () => {
    initiateChange.mockResolvedValue(true);
    render(
      <NuqsTestingAdapter searchParams="?selectedEmail=new%40example.com">
        <VerifyEmailChange />
      </NuqsTestingAdapter>,
    );
    await userEvent.setup().click(resend());
    expect(initiateChange).toHaveBeenCalledWith("new@example.com");
    expect(showSuccessMessage).toHaveBeenCalledWith(en.auth.otpResent);
  });

  it("does not confirm when the send failed", async () => {
    initiateChange.mockResolvedValue(false);
    render(
      <NuqsTestingAdapter searchParams="?selectedEmail=new%40example.com">
        <VerifyEmailChange />
      </NuqsTestingAdapter>,
    );
    await userEvent.setup().click(resend());
    expect(showSuccessMessage).not.toHaveBeenCalled();
  });
});
