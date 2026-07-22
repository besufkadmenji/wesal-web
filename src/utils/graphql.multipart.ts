import Cookies from "js-cookie";

type GraphQlEnvelope<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function graphqlMultipartRequest<T>(options: {
  query: string;
  variables: Record<string, unknown>;
  files: File[];
  fileVariable: string;
}): Promise<T> {
  const form = new FormData();
  form.append(
    "operations",
    JSON.stringify({ query: options.query, variables: options.variables }),
  );
  form.append(
    "map",
    JSON.stringify(
      Object.fromEntries(
        options.files.map((_, index) => [
          String(index),
          [`variables.${options.fileVariable}.${index}`],
        ]),
      ),
    ),
  );
  options.files.forEach((file, index) => form.append(String(index), file));

  const response = await fetch("/api/proxy/graphql", {
    method: "POST",
    body: form,
    credentials: "include",
    headers: {
      "apollo-require-preflight": "true",
      ...(Cookies.get("token")
        ? { Authorization: `Bearer ${Cookies.get("token")}` }
        : {}),
      "accept-language": Cookies.get("lang") || "ar",
    },
  });
  const payload = (await response.json()) as GraphQlEnvelope<T>;
  if (!response.ok || payload.errors?.length || !payload.data) {
    throw new Error(
      payload.errors?.[0]?.message || `Upload failed (${response.status})`,
    );
  }
  return payload.data;
}
