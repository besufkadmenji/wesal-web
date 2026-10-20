import CalendarIcon from "@/assets/icons/contracts/popup/calendar.svg";
import { formatContractDate } from "@/components/app/contracts/formatContract";
import { TimelineMetric } from "@/components/app/contracts/TimelineMetric";
import { type Contract, ContractStatus } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

/**
 * BRD 4.1.18 / Q-C5 (2026-10-19): the money is held while the administration
 * reviews a refused receipt or a cancellation after completion. Interim copy
 * until the designer covers this state (D-23).
 */
export const ContractHeldFunds = ({
  contract,
  viewer,
}: {
  contract: Pick<Contract, "disputedAt" | "disputeReason" | "audits">;
  viewer: "customer" | "provider";
}) => {
  const dict = useDict();
  const copy = dict.contracts;
  const held = [...(contract.audits ?? [])]
    .reverse()
    .find((audit) => audit.newStatus === ContractStatus.Disputed);
  const cause =
    held?.previousStatus === ContractStatus.DeliveryInProgress
      ? copy.heldRefusedReceipt
      : copy.heldCancelledAfterCompletion;

  return (
    <div className="grid gap-3">
      <div className="grid gap-2 rounded-[14px] border border-orange-200 bg-orange-50 p-4 text-start">
        <p className="flex items-center gap-2 text-sm font-semibold text-orange-700">
          <ShieldAlert className="size-4 shrink-0" />
          {copy.heldTitle}
        </p>
        <p className="text-sm leading-6 text-[#1a1a1a]">
          {cause}.{" "}
          {viewer === "customer"
            ? copy.heldCustomerDescription
            : copy.heldProviderDescription}
        </p>
        {contract.disputeReason && (
          <p className="text-sm leading-6 break-words whitespace-pre-wrap text-[#1a1a1a]">
            <span className="text-gray">{copy.heldReason}: </span>
            {contract.disputeReason}
          </p>
        )}
        <p className="text-gray text-sm leading-6">
          {copy.heldSupport}{" "}
          <Link
            href="/support/contact-us"
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            {copy.contactUs}
          </Link>
        </p>
      </div>
      <TimelineMetric
        icon={CalendarIcon}
        label={copy.heldSince}
        value={formatContractDate(contract.disputedAt)}
      />
    </div>
  );
};
