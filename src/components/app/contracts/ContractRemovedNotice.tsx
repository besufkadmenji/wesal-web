import { useDict } from "@/hooks/useDict";
import { X } from "lucide-react";

/** A link to a contract cancelled before payment, which no longer exists (D-13). */
export const ContractRemovedNotice = ({
  onDismiss,
}: {
  onDismiss: () => void;
}) => {
  const dict = useDict();
  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-[14px] border border-[#f2f2f2] bg-white p-4 text-start text-sm text-[#1a1a1a]"
    >
      <p className="flex-1">{dict.contracts.removedTitle}</p>
      <button
        type="button"
        aria-label={dict.common.cancel}
        onClick={onDismiss}
        className="text-gray grid size-8 shrink-0 place-content-center rounded-full border border-[#f2f2f2]"
      >
        <X className="size-4" />
      </button>
    </div>
  );
};
