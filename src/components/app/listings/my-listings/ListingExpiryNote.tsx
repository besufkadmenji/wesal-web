"use client";

import { useLocalizedFormat } from "@/components/app/shared/ParticipantUI";
import { useDict } from "@/hooks/useDict";

/** S4-59: when an active free ad stops being shown. */
export const ListingExpiryNote = ({ expiresAt }: { expiresAt: unknown }) => {
  const dict = useDict();
  const format = useLocalizedFormat();
  return (
    <p className="text-gray text-sm">
      {dict.myListings.expiry.expiresOn.replace(
        "{date}",
        format.dateOnly(expiresAt),
      )}
    </p>
  );
};
