import { beforeEach, describe, expect, it, vi } from "vitest";

const calls = vi.hoisted(() => ({
  addImage: [] as unknown[][],
  gState: [] as number[],
  pages: 0,
  saved: "",
}));
vi.mock("html2canvas-pro", () => ({
  default: vi.fn(async () => ({ width: 1000, height: 3000 })),
}));
vi.mock("jspdf", () => {
  class GState {
    constructor(public options: { opacity: number }) {}
  }
  class JsPDF {
    internal = { pageSize: { getWidth: () => 210, getHeight: () => 297 } };
    addImage = (...args: unknown[]) => void calls.addImage.push(args);
    addPage = () => void (calls.pages += 1);
    setDrawColor = vi.fn();
    setLineWidth = vi.fn();
    line = vi.fn();
    setGState = (state: GState) =>
      void calls.gState.push(state.options.opacity);
    save = (name: string) => void (calls.saved = name);
  }
  return { default: JsPDF, GState };
});

import { downloadPDF } from "./download.pdf";

describe("downloadPDF (UI-15)", () => {
  beforeEach(() => {
    calls.addImage = [];
    calls.gState = [];
    calls.pages = 0;
    vi.stubGlobal(
      "Image",
      class {
        onload?: () => void;
        set src(_: string) {
          setTimeout(() => this.onload?.());
        }
      },
    );
    HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as never;
    HTMLCanvasElement.prototype.toDataURL = vi.fn(
      () => "data:image/png;base64,",
    );
  });

  it("puts the logo and a faint watermark on every page", async () => {
    const element = document.createElement("div");
    await downloadPDF({ current: element });

    const pages = calls.pages + 1;
    expect(pages).toBeGreaterThan(1);
    // Per page: header logo, content slice, watermark.
    expect(calls.addImage).toHaveLength(pages * 3);
    expect(calls.gState.filter((o) => o < 0.1)).toHaveLength(pages);
    expect(calls.gState.filter((o) => o === 1)).toHaveLength(pages);
    expect(calls.saved).toBe("contract.pdf");
  });
});
