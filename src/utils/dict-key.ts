/**
 * Looks up a dotted dictionary key (e.g. "auth.validation.email.invalid"),
 * as the validation helpers return them; falls back to the key itself.
 */
export const translateKey = (dict: unknown, key: string): string => {
  let value: unknown = dict;
  for (const part of key.split(".")) {
    if (typeof value !== "object" || value === null) break;
    value = (value as Record<string, unknown>)[part];
  }
  return typeof value === "string" ? value : key;
};
