const LOCALES: Record<string, string> = {
  ar: "ar-SA-u-ca-gregory-nu-latn",
  en: "en-GB",
};

/** "1/01/2025 • 05:00 م", the date and time shown on a notification. */
export const formatNotificationDate = (value: unknown, lang: string) => {
  const date = new Date(value as string | number);
  if (value == null || Number.isNaN(date.getTime())) return "";
  const locale = LOCALES[lang] ?? LOCALES.ar;
  const day = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).format(date);
  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  // Arabic output carries right-to-left marks that would flip "1/01/2025" to
  // "2025/01/1"; without them the date stays one left-to-right run, as in Figma.
  return `${day} • ${time}`.replace(/\u200f/g, "");
};
