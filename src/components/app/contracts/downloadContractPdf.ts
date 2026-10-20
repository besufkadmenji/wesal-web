/**
 * Downloads a participant PDF from the API (contract document, tax invoice)
 * through the same-origin proxy, which forwards the signed-in token. Throws
 * with the API's localized message, if any.
 */
export const downloadContractPdf = async (
  path: string,
  filename: string,
): Promise<void> => {
  const response = await fetch(`/api/proxy${path}`);
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      message?: unknown;
    } | null;
    throw new Error(
      typeof body?.message === "string" ? body.message : "Download failed",
    );
  }
  const url = URL.createObjectURL(await response.blob());
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};
