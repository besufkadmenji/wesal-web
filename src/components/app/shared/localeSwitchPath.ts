/**
 * The current page without its locale prefix, keeping the query (ClickUp
 * 869fmh35z): switching language on `/en/listings?category=…` dropped the
 * category, so the listings page sent the visitor back to the categories.
 * Only a leading `/ar` or `/en` segment is removed (not e.g. `/area`).
 */
export const localeSwitchPath = (pathname: string, search: string) => {
  const path = pathname.replace(/^\/(ar|en)(?=\/|$)/, "");
  return `${path}${search ? `?${search}` : ""}`;
};
