export interface UploadResponse {
  filename: string;
  url: string;
  size: number;
}

/**
 * Upload a file. Supports two modes:
 * - Browser: pass a `File` object
 * - Node: pass a local file path string
 *
 * @param input File (browser) or string (local path in Node)
 * @param uploadUrl optional upload endpoint (defaults to NEXT_PUBLIC_UPLOAD_URL or https://wesal-api.testing3000.cloud/upload)
 */
export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch("/api/proxy/upload", {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upload failed: ${res.status} ${res.statusText} ${text}`);
  }

  const data = (await res.json()) as UploadResponse;
  return data;
};
