import { ContactMap } from "@/components/app/support/ContactUs/ContactMap";
import en from "@/config/i18n/locales/en.json";
import { act, cleanup, render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const google = vi.hoisted(() => ({
  tilesLoaded: undefined as (() => void) | undefined,
}));
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/assets/icons/marker.svg", () => ({ default: () => <svg /> }));
vi.mock("@/assets/icons/plus.svg", () => ({ default: () => <svg /> }));
vi.mock("@/assets/icons/minus.svg", () => ({ default: () => <svg /> }));
vi.mock("@/components/app/shared/AppLoading", () => ({
  AppLoading: () => <div>spinner</div>,
}));
vi.mock("google-map-react", () => ({
  default: function FakeMap({
    onGoogleApiLoaded,
  }: {
    onGoogleApiLoaded: (api: { map: object; maps: object }) => void;
  }) {
    useEffect(() => {
      onGoogleApiLoaded({
        map: {},
        maps: {
          event: {
            addListenerOnce: (
              _map: object,
              _event: string,
              done: () => void,
            ) => {
              google.tilesLoaded = done;
            },
          },
        },
      });
    }, [onGoogleApiLoaded]);
    return <div />;
  },
}));

const marker = en.support.contactUs.mapMarker;

describe("ContactMap loading (ClickUp 869fmm437)", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    google.tilesLoaded = undefined;
  });

  it("shows a loading state until the map tiles are in", () => {
    render(<ContactMap />);
    expect(screen.getByRole("status")).toHaveTextContent(en.common.loading);
    expect(screen.queryByText(marker)).not.toBeInTheDocument();

    act(() => google.tilesLoaded?.());
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByText(marker)).toBeInTheDocument();
  });

  it("reveals the map anyway if the tiles never report in", () => {
    vi.useFakeTimers();
    render(<ContactMap />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByText(marker)).toBeInTheDocument();
  });
});
