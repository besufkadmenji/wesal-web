import { ResetWithEmail } from "@/components/app/auth/ForgotPassword/ResetWithEmail";
import { ResetWithPhone } from "@/components/app/auth/ForgotPassword/ResetWithPhone";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const forgotPassword = vi.fn();
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/hooks/useLang", () => ({ useLang: () => "en" }));
vi.mock("@/assets/icons/auth/email.svg", () => ({ default: () => <svg /> }));
vi.mock("@/components/app/shared/inputs/PhoneInput", () => ({
  PhoneInput: ({
    value,
    onChange,
    error,
  }: {
    value: string;
    onChange: (value: string) => void;
    error?: string;
  }) => (
    <>
      <input
        aria-label="phone"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <p>{error}</p>}
    </>
  ),
}));
vi.mock("@/components/app/auth/ForgotPassword/useForgotPassword", () => ({
  useForgotPassword: () => ({ forgotPassword, busy: false }),
}));

const copy = en.auth.validation;
const submit = en.auth.resetPassword.method.submit;
const wrap = (node: ReactNode) =>
  render(<NuqsTestingAdapter>{node}</NuqsTestingAdapter>);

describe("Forgot password validation (ClickUp 869fkww0n)", () => {
  afterEach(() => {
    cleanup();
    forgotPassword.mockReset();
  });

  it("blocks an empty or malformed email, then sends a valid one", async () => {
    const user = userEvent.setup();
    wrap(<ResetWithEmail />);

    await user.click(screen.getByRole("button", { name: submit }));
    expect(screen.getByText(copy.email.required)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(en.auth.login.email);
    await user.type(input, "name@example");
    await user.click(screen.getByRole("button", { name: submit }));
    expect(screen.getByText(copy.email.invalid)).toBeInTheDocument();
    expect(forgotPassword).not.toHaveBeenCalled();

    await user.type(input, ".com");
    expect(screen.queryByText(copy.email.invalid)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: submit }));
    expect(forgotPassword).toHaveBeenCalledWith(
      { emailOrPhone: "name@example.com" },
      "email",
    );
  });

  it("blocks a malformed Saudi number, then sends a valid one", async () => {
    const user = userEvent.setup();
    wrap(<ResetWithPhone />);

    const input = screen.getByLabelText("phone");
    await user.type(input, "12ab");
    await user.click(screen.getByRole("button", { name: submit }));
    expect(screen.getByText(copy.phone.invalid)).toBeInTheDocument();
    expect(forgotPassword).not.toHaveBeenCalled();

    await user.clear(input);
    await user.type(input, "512345678");
    await user.click(screen.getByRole("button", { name: submit }));
    expect(forgotPassword).toHaveBeenCalledWith(
      { emailOrPhone: "+966512345678" },
      "phone",
    );
  });
});
