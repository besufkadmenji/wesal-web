import UserIcon from "@/assets/icons/contracts/user.svg";
import { ContractSectionTitle } from "@/components/app/contracts/ContractSectionTitle";
import { formatPhone } from "@/components/app/contracts/formatPhone";
import { TimelineMetric } from "@/components/app/contracts/TimelineMetric";
import type { Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";

/** S4-15 (BRD): once the contract is paid, the provider sees who to serve. */
export const ContractClientIdentity = ({
  client,
}: {
  client: Contract["client"];
}) => {
  const dict = useDict();
  return (
    <section className="grid gap-4">
      <ContractSectionTitle icon={UserIcon}>
        {dict.contracts.clientInfo}
      </ContractSectionTitle>
      <div className="grid gap-3 md:grid-cols-2">
        <TimelineMetric
          icon={UserIcon}
          label={dict.contracts.clientName}
          value={client?.name || "—"}
        />
        <TimelineMetric
          icon={UserIcon}
          label={dict.contracts.clientPhone}
          value={formatPhone(client?.dialCode, client?.phone)}
        />
      </div>
    </section>
  );
};
