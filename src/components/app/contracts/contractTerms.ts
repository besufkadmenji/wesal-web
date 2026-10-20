/** The text in the viewer's language, falling back to the other language. */
export const pickLocalizedText = (
  lang: string,
  ar?: string | null,
  en?: string | null,
) => ((lang === "ar" ? ar || en : en || ar) ?? "").trim();

/** Same `{commission}` / `{minimum}` filling the API contract snapshot does. */
export const renderUndertaking = (
  text: string,
  commissionPercent: number,
  minimumAmount: number,
) =>
  text
    .split("{commission}")
    .join(String(Number(commissionPercent)))
    .split("{minimum}")
    .join(String(Number(minimumAmount)));
