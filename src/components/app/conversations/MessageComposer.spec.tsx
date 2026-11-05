import { MessageComposer } from "@/components/app/conversations/MessageComposer";
import en from "@/config/i18n/locales/en.json";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));

const props = () => ({
  content: "",
  setContent: vi.fn(),
  photoPreview: null as string | null,
  pickPhoto: vi.fn(),
  removePhoto: vi.fn(),
  submitMessage: vi.fn(),
  canSubmit: false,
});

/** ClickUp 869fnwhm3: photo button, and a send arrow mirrored in Arabic. */
describe("MessageComposer", () => {
  afterEach(cleanup);

  it("offers a photo button that hands the picked file over", () => {
    const p = props();
    const { container } = render(<MessageComposer {...p} />);
    expect(
      screen.getByRole("button", { name: en.conversations.attachPhoto }),
    ).toBeTruthy();
    const input = container.querySelector<HTMLInputElement>(
      'input[type="file"]',
    )!;
    expect(input.accept).toBe("image/jpeg,image/png,image/webp");
    const file = new File(["x"], "kitchen.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });
    expect(p.pickPhoto).toHaveBeenCalledWith(file);
  });

  it("shows the picked photo with a way to remove it", () => {
    const p = { ...props(), photoPreview: "blob:preview" };
    render(<MessageComposer {...p} />);
    fireEvent.click(
      screen.getByRole("button", { name: en.conversations.removePhoto }),
    );
    expect(p.removePhoto).toHaveBeenCalled();
  });

  it("mirrors the send arrow in Arabic instead of turning it upside down", () => {
    render(<MessageComposer {...props()} />);
    const icon = screen
      .getByRole("button", { name: en.common.send })
      .querySelector("svg")!;
    expect(icon.getAttribute("class")).toContain("rtl:-scale-x-100");
    expect(icon.getAttribute("class")).not.toContain("rotate-180");
  });
});
