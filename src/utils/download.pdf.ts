import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { RefObject } from "react";
export const downloadPDF = async (ref: RefObject<HTMLDivElement | null>) => {
  const input = ref?.current;

  if (!input) return;

  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
  });

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Padding/margins in mm
  const margins = 10;
  const contentWidth = pageWidth - margins * 2;

  // Calculate dimensions maintaining aspect ratio
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imgWidth = contentWidth;

  // Calculate how much canvas height fits on one page while maintaining aspect ratio
  const canvasHeightPerPage =
    ((pageHeight - margins * 2) * canvasWidth) / pageWidth;

  // Calculate number of pages needed
  const totalPages = Math.ceil(canvasHeight / canvasHeightPerPage);

  // Add image to PDF, splitting across multiple pages if necessary
  for (let pageNum = 0; pageNum < totalPages; pageNum++) {
    if (pageNum > 0) {
      pdf.addPage();
    }

    // Calculate the source rectangle for this page
    const sourceY = pageNum * canvasHeightPerPage;
    const sourceHeight = Math.min(canvasHeightPerPage, canvasHeight - sourceY);

    // Create a temporary canvas for this page
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvasWidth;
    pageCanvas.height = sourceHeight;

    const ctx = pageCanvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(
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
    }

    const pageImgData = pageCanvas.toDataURL("image/png");
    const imgHeight = (sourceHeight * imgWidth) / canvasWidth;

    // Add image with padding/margins
    pdf.addImage(pageImgData, "PNG", margins, margins, imgWidth, imgHeight);
  }

  pdf.save("contract.pdf");
};
