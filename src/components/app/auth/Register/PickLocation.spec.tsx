import { PickLocation } from "@/components/app/auth/Register/PickLocation";
import en from "@/config/i18n/locales/en.json";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("google-map-react", () => ({ default: () => <div data-testid="map" /> }));
const svg = vi.hoisted(() => () => ({ default: () => null }));
vi.mock("@/assets/icons/auth/exit.full.screen.svg", svg);
vi.mock("@/assets/icons/auth/full.screen.svg", svg);
vi.mock("@/assets/icons/auth/minus.svg", svg);
vi.mock("@/assets/icons/auth/plus.svg", svg);
vi.mock("@/assets/icons/search.svg", svg);
vi.mock("@/assets/icons/auth/selected.location.svg", svg);

const openFullScreen = () =>
  fireEvent.click(screen.getByRole("button", { name: en.common.fullScreenMap }));

/** ClickUp 869fnx2yw: the contract address map in full screen. */
describe("PickLocation full screen", () => {
  afterEach(cleanup);

  it("keeps the search box and adds a Back button (search placed above)", () => {
    render(
      <PickLocation
        searchPlacement="above"
        searchPlaceholder="Client location"
        onChange={vi.fn()}
      />,
    );
    openFullScreen();

    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByPlaceholderText("Client location")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: en.common.back }));
    expect(screen.queryByRole("dialog")).toBeNull();
    // Back on the page, the search box is above the map again.
    expect(screen.getByPlaceholderText("Client location")).toBeTruthy();
  });

  it("closes with Escape", () => {
    render(<PickLocation onChange={vi.fn()} />);
    openFullScreen();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
