import { ChangePassword } from "@/components/app/profile/ChangePassword";
import en from "@/config/i18n/locales/en.json";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const changePassword = vi.fn(() => Promise.resolve());
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/components/app/profile/useChangePassword", () => ({
  useChangePassword: () => ({ changePassword, busy: false }),
}));
vi.mock("@/components/app/shared/inputs/PasswordInput", () => ({
  PasswordInput: ({
    placeholder,
    value,
    onChange,
    error,
  }: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
  }) => (
    <>
      <input
        aria-label={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <p>{error}</p>}
    </>
  ),
}));

const form = en.profile.changePasswordForm;
const rules = en.auth.validation;

/** ClickUp 869fmmfge: any 8 characters were accepted. */
describe("ChangePassword", () => {
  afterEach(() => {
    cleanup();
    changePassword.mockClear();
  });

  it("rejects a weak password and a mismatch, then saves a strong one", async () => {
    const user = userEvent.setup();
    render(<ChangePassword />);
    const password = screen.getByLabelText(form.newPassword);
    const confirm = screen.getByLabelText(form.confirmPassword);
    const save = screen.getByRole("button", { name: form.saveChanges });

    await user.type(password, "qwertyui");
    await user.type(confirm, "qwertyui");
    await user.click(save);
    expect(screen.getByText(rules.password.weak)).toBeInTheDocument();
    expect(changePassword).not.toHaveBeenCalled();

    await user.clear(password);
    await user.type(password, "Qwerty1@");
    expect(screen.queryByText(rules.password.weak)).not.toBeInTheDocument();
    expect(screen.getByText(rules.confirmPassword.noMatch)).toBeInTheDocument();

    await user.clear(confirm);
    await user.type(confirm, "Qwerty1@");
    await user.click(save);
    expect(changePassword).toHaveBeenCalledWith("Qwerty1@", "Qwerty1@");
  });
});
