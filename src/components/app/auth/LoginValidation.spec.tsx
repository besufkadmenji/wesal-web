import { LoginWithEmail } from "@/components/app/auth/LoginWithEmail";
import { LoginWithPhone } from "@/components/app/auth/LoginWithPhone";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const loginUser = vi.fn();
const loginProvider = vi.fn();
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/hooks/useLang", () => ({ useLang: () => "en" }));
vi.mock("@/assets/icons/auth/email.svg", () => ({ default: () => <svg /> }));
vi.mock("@/assets/icons/auth/password.svg", () => ({ default: () => <svg /> }));
vi.mock("@/assets/icons/auth/eye.open.svg", () => ({ default: () => <svg /> }));
vi.mock("@/assets/icons/auth/eye.closed.svg", () => ({
  default: () => <svg />,
}));
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
vi.mock("@/components/app/auth/useLogin", () => ({
  useLogin: () => ({ loginUser, loginProvider, busy: false }),
}));

const copy = en.auth.validation;
const submit = en.auth.login.submit;
const wrap = (node: ReactNode, type = "provider") =>
  render(
    <NuqsTestingAdapter searchParams={`?type=${type}`}>
      {node}
    </NuqsTestingAdapter>,
  );

describe("Login validation (ClickUp 869fmmt01)", () => {
  afterEach(() => {
    cleanup();
    loginUser.mockReset();
    loginProvider.mockReset();
  });

  it("shows inline errors for an empty email form without calling the API", async () => {
    const user = userEvent.setup();
    wrap(<LoginWithEmail />);

    await user.click(screen.getByRole("button", { name: submit }));
    expect(screen.getByText(copy.email.required)).toBeInTheDocument();
    expect(screen.getByText(copy.password.required)).toBeInTheDocument();
    expect(loginProvider).not.toHaveBeenCalled();
  });

  it("rejects a malformed email, then logs in with a valid one", async () => {
    const user = userEvent.setup();
    wrap(<LoginWithEmail />);
    const email = screen.getByPlaceholderText(en.auth.login.email);

    await user.type(email, "name@example");
    await user.type(screen.getByPlaceholderText(en.auth.login.password), "x");
    await user.click(screen.getByRole("button", { name: submit }));
    expect(screen.getByText(copy.email.invalid)).toBeInTheDocument();
    expect(loginProvider).not.toHaveBeenCalled();

    await user.type(email, ".com ");
    expect(screen.queryByText(copy.email.invalid)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: submit }));
    expect(loginProvider).toHaveBeenCalledWith("name@example.com", "x");
  });

  it("checks the phone, then logs in with the dial code", async () => {
    const user = userEvent.setup();
    wrap(<LoginWithPhone />, "user");
    const phone = screen.getByLabelText("phone");

    await user.click(screen.getByRole("button", { name: submit }));
    expect(screen.getByText(copy.phone.required)).toBeInTheDocument();
    expect(screen.getByText(copy.password.required)).toBeInTheDocument();

    await user.type(phone, "5123");
    await user.click(screen.getByRole("button", { name: submit }));
    expect(screen.getByText(copy.phone.invalid)).toBeInTheDocument();
    expect(loginUser).not.toHaveBeenCalled();

    await user.clear(phone);
    await user.type(phone, "512345678");
    await user.type(screen.getByPlaceholderText(en.auth.login.password), "x");
    await user.keyboard("{Enter}");
    expect(loginUser).toHaveBeenCalledWith("+966512345678", "x");
  });
});
