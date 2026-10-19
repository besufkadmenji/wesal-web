import CalendarIcon from "@/assets/icons/contracts/popup/calendar.svg";
import { formatContractDate } from "@/components/app/contracts/formatContract";
import { TimelineMetric } from "@/components/app/contracts/TimelineMetric";
import type { Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";

const ADMIN_PAYOUT_ACTIONS = ["TIMEOUT_COMPLETED", "DISPUTE_RELEASED"];

/**
 * Q-C3 (2026-10-19): the administration paid the provider without the
 * customer's completion signature. Read-only: when, why, and no rating.
 */
export const ContractAdminResolution = ({
  contract,
}: {
  contract: Pick<Contract, "resolvedAt" | "audits">;
}) => {
  const dict = useDict();
  const reason = [...(contract.audits ?? [])]
    .reverse()
    .find((audit) => ADMIN_PAYOUT_ACTIONS.includes(audit.action))?.reason;
  return (
    <div className="grid gap-3">
      <TimelineMetric
        icon={CalendarIcon}
        label={dict.contracts.resolvedAt}
        value={formatContractDate(contract.resolvedAt)}
      />
      <div className="grid gap-1 rounded-[14px] border border-teal-200 bg-teal-50 p-4 text-start">
        <p className="text-sm leading-6 text-[#1a1a1a]">
          {dict.contracts.adminResolvedNote}
        </p>
        {reason && (
          <p className="text-sm leading-6 break-words whitespace-pre-wrap text-[#1a1a1a]">
            <span className="font-semibold text-teal-700">
              {dict.contracts.adminResolutionReason}:{" "}
            </span>
            {reason}
          </p>
        )}
      </div>
    </div>
  );
};
