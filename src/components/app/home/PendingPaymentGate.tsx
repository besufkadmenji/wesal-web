"use client";

import { PendingPaymentDialog } from "@/components/app/home/PendingPaymentDialog";
import { ContractStatusGroup, SortOrder } from "@/gql/graphql";
import { useContracts, useOverdueContracts } from "@/hooks/useContracts";
import { useMe } from "@/hooks/useMe";
import { useState } from "react";

/**
 * BRD 4.1.16: on every visit to home, the customer is reminded of the oldest
 * accepted contract still waiting for payment. Closing it lasts for this
 * visit; the overdue pop-up wins while one is showing.
 */
export const PendingPaymentGate = () => {
  const { me } = useMe();
  const isCustomer = Boolean(me?.user);
  const [closed, setClosed] = useState(false);
  const overdue = useOverdueContracts(isCustomer);
  const pending = useContracts(
    {
      statusGroup: ContractStatusGroup.PendingPayment,
      sortOrder: SortOrder.Asc,
      limit: 1,
    },
    isCustomer,
  );
  const oldest = pending.data?.items[0];

  if (!isCustomer || closed || !oldest || overdue.data?.length) return null;

  return (
    <PendingPaymentDialog
      contractNumber={String(oldest.publicId ?? oldest.id)}
      href={`/contracts?contractId=${oldest.id}&pay=1`}
      onClose={() => setClosed(true)}
    />
  );
};
