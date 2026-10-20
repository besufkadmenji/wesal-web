import html2canvas from "html2canvas-pro";
import jsPDF, { GState } from "jspdf";
import { RefObject } from "react";

/** UI-15: the navy brand mark (public/images/logo.pdf.png, 636×492). */
const LOGO_SRC = "/images/logo.pdf.png";
const LOGO_RATIO = 636 / 492;
const WATERMARK_OPACITY = 0.035;

const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });

/**
 * Captures the element and saves it as an A4 PDF, split across pages, with
 * the Wesal logo in each page header and a barely visible centred logo
 * watermark (UI-15).
 */
export const downloadPDF = async (
  ref: RefObject<HTMLDivElement | null>,
  fileName = "contract.pdf",
) => {
  const input = ref?.current;
  if (!input) return;

  const [canvas, logo] = await Promise.all([
    html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      ignoreElements: (element) => element.hasAttribute("data-pdf-exclude"),
    }),
    loadImage(LOGO_SRC),
  ]);

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const rtl = document.documentElement.dir === "rtl";

  const margins = 10;
  const logoHeight = 11;
  const logoWidth = logoHeight * LOGO_RATIO;
  const headerHeight = logo ? logoHeight + 5 : 0;
  const contentTop = margins + headerHeight;
  const contentWidth = pageWidth - margins * 2;
  const contentHeight = pageHeight - contentTop - margins;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const canvasHeightPerPage = (contentHeight * canvasWidth) / contentWidth;
  const totalPages = Math.max(1, Math.ceil(canvasHeight / canvasHeightPerPage));

  for (let pageNum = 0; pageNum < totalPages; pageNum++) {
    if (pageNum > 0) pdf.addPage();

    if (logo) {
      pdf.addImage(
        logo,
        "PNG",
        rtl ? pageWidth - margins - logoWidth : margins,
        margins,
        logoWidth,
        logoHeight,
      );
      pdf.setDrawColor(34, 40, 58);
      pdf.setLineWidth(0.3);
      pdf.line(
        margins,
        margins + logoHeight + 2,
        pageWidth - margins,
        margins + logoHeight + 2,
      );
    }

    const sourceY = pageNum * canvasHeightPerPage;
    const sourceHeight = Math.min(canvasHeightPerPage, canvasHeight - sourceY);
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvasWidth;
    pageCanvas.height = sourceHeight;
    pageCanvas
      .getContext("2d")
      ?.drawImage(
        canvas,
        0,
        sourceY,
        canvasWidth,
        sourceHeight,
        0,
        0,
        canvasWidth,
        sourceHeight,
      );
    pdf.addImage(
      pageCanvas.toDataURL("image/png"),
      "PNG",
      margins,
      contentTop,
      contentWidth,
      (sourceHeight * contentWidth) / canvasWidth,
    );

    // The captured page is opaque, so the watermark goes on top, faintly.
    if (logo) {
      const markWidth = pageWidth * 0.5;
      const markHeight = markWidth / LOGO_RATIO;
      pdf.setGState(new GState({ opacity: WATERMARK_OPACITY }));
      pdf.addImage(
        logo,
        "PNG",
        (pageWidth - markWidth) / 2,
        (pageHeight - markHeight) / 2,
        markWidth,
        markHeight,
      );
      pdf.setGState(new GState({ opacity: 1 }));
    }
  }

  pdf.save(fileName);
};
