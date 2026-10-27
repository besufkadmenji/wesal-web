import { usePathname, useSearchParams } from "next/navigation";

/**
 * The terms link opens TermsModal through `?show-terms=true`. It keeps the
 * current query (ClickUp 869fkvm9w): dropping `type=provider` switched a
 * provider back to the customer form when the terms were closed.
 */
export const useTermsUrl = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  params.set("show-terms", "true");
  return `${pathname}?${params.toString()}`;
};
