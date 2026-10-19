import { formatNotificationDate } from "@/components/app/shared/formatNotificationDate";

/**
 * "1/01/2025 • 05:00 م" as in the Figma notification and chat popups.
 * Separate runs: mixed RTL/LTR text would otherwise reorder the string.
 */
export const ListDateTime = ({
  value,
  lang,
}: {
  value: unknown;
  lang: string;
}) => (
  <span className="flex shrink-0 items-center gap-1.5 text-xs font-light whitespace-nowrap text-[#666]">
    {formatNotificationDate(value, lang)
      .split(" • ")
      .map((part, index) => (
        <span key={index} className="flex items-center gap-1.5">
          {index > 0 && <span aria-hidden="true">•</span>}
          <span dir="ltr">{part}</span>
        </span>
      ))}
  </span>
);
