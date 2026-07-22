const DISALLOWED_REQUEST_HEADERS = new Set([
  "connection",
  "content-length",
  "cookie",
  "host",
]);

export const buildProxyRequestHeaders = (
  incomingHeaders: Headers,
  token?: string,
): Headers => {
  const headers = new Headers();
  incomingHeaders.forEach((value, key) => {
    if (!DISALLOWED_REQUEST_HEADERS.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  const normalizedToken = token?.trim();
  if (!headers.has("authorization") && normalizedToken) {
    headers.set("authorization", `Bearer ${normalizedToken}`);
  }

  return headers;
};
