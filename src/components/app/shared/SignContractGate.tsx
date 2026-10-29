"use client";

import { SignedContractStatus } from "@/gql/graphql";
import { useMe } from "@/hooks/useMe";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SignContractDialog } from "./SignContractDialog";

/**
 * Replaces the proxy redirect that sent a provider without an active
 * e-contract to the contract page from every link (ClickUp 869fmna2q,
 * 869fmn4gn): the page opens, and the sign-contract prompt shows on top.
 * "Stay" closes it for this page only, so the next page explains again.
 */
export const SignContractGate = () => {
  const { me } = useMe();
  const pathname = usePathname();
  const [closedOn, setClosedOn] = useState<string | null>(null);
  const contract = me?.provider?.signedContract;
  const mustSign =
    Boolean(me?.provider) &&
    (!contract || contract.status === SignedContractStatus.Pending);

  if (
    !mustSign ||
    closedOn === pathname ||
    pathname.endsWith("/profile/signed-contract")
  ) {
    return null;
  }
  return <SignContractDialog onClose={() => setClosedOn(pathname)} />;
};
