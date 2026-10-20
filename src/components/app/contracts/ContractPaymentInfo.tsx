import BillIcon from "@/assets/icons/contracts/bill.svg";
import CalendarIcon from "@/assets/icons/contracts/popup/calendar.svg";
import { ContractSectionTitle } from "@/components/app/contracts/ContractSectionTitle";
import { formatContractDate } from "@/components/app/contracts/formatContract";
import { TimelineMetric } from "@/components/app/contracts/TimelineMetric";
import type { Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";

/**
 * S4-12 (D-1): how and when the contract was paid, read-only. The provider
 * also sees that payment is still awaited; neither party can act on it here.
 */
export const ContractPaymentInfo = ({
  contract,
}: {
  contract: Pick<Contract, "paidAt" | "paymentMethod">;
}) => {
  const dict = useDict();
  const methods = dict.payments.methods as Record<string, string>;
  const paid = Boolean(contract.paidAt);
  return (
    <section className="grid gap-4">
      <ContractSectionTitle icon={BillIcon}>
        {dict.payments.section}
      </ContractSectionTitle>
      <div className="grid gap-3 md:grid-cols-2">
        <TimelineMetric
          icon={BillIcon}
          label={dict.payments.status}
          value={paid ? dict.payments.statusPaid : dict.payments.statusPending}
        />
        {paid && (
          <TimelineMetric
            icon={BillIcon}
            label={dict.payments.method}
            value={
              contract.paymentMethod
                ? (methods[contract.paymentMethod] ?? contract.paymentMethod)
                : "—"
            }
          />
        )}
        {paid && (
          <TimelineMetric
            icon={CalendarIcon}
            label={dict.payments.paidAt}
            value={formatContractDate(contract.paidAt)}
          />
        )}
      </div>
    </section>
  );
};
