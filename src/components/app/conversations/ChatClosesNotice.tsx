"use client";

import { useLocalizedFormat } from "@/components/app/shared/ParticipantUI";
import { useDict } from "@/hooks/useDict";

/** S4-67: when a chat of a completed contract closes for good. */
export const ChatClosesNotice = ({ closesAt }: { closesAt: unknown }) => {
  const dict = useDict();
  const format = useLocalizedFormat();
  return (
    <p dir="auto" className="text-gray text-sm">
      {dict.conversations.closesOn.replace("{date}", format.date(closesAt))}
    </p>
  );
};
