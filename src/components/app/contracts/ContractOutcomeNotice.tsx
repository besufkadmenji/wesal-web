import { Info } from "lucide-react";

/** The money consequence shown before a cancel or refuse-receipt is sent. */
export const ContractOutcomeNotice = ({ text }: { text: string | null }) => {
  if (!text) return null;
  return (
    <p
      role="note"
      className="flex items-start gap-2 rounded-[14px] border border-amber-200 bg-amber-50 p-4 text-start text-sm leading-6 text-[#1a1a1a]"
    >
      <Info className="mt-0.5 size-4 shrink-0 text-amber-600" />
      <span>{text}</span>
    </p>
  );
};
