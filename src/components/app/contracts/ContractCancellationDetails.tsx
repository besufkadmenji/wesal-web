import CalendarIcon from "@/assets/icons/contracts/popup/calendar.svg";
import { formatContractDate } from "@/components/app/contracts/formatContract";
import { TimelineMetric } from "@/components/app/contracts/TimelineMetric";
import type { Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";

/** S4-17 (default D-18): a cancelled contract shows when and why, read-only. */
export const ContractCancellationDetails = ({
  contract,
}: {
  contract: Pick<Contract, "cancelledAt" | "cancellationReason">;
}) => {
  const dict = useDict();
  return (
    <div className="grid gap-3">
      <TimelineMetric
        icon={CalendarIcon}
        label={dict.contracts.cancelledAt}
        value={formatContractDate(contract.cancelledAt)}
      />
      {contract.cancellationReason && (
        <div className="grid gap-1 rounded-[14px] border border-[#f7d8d6] bg-[#fbeae9] p-4 text-start">
          <p className="text-sm font-semibold text-[#b3251e]">
            {dict.contracts.cancellationReason}
          </p>
          <p className="text-sm leading-6 break-words whitespace-pre-wrap text-[#1a1a1a]">
            {contract.cancellationReason}
          </p>
        </div>
      )}
    </div>
  );
};
