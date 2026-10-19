"use client";

import { OverdueContractDialog } from "@/components/app/contracts/OverdueContractDialog";
import { useAppRouter } from "@/hooks/use.app.router";
import { useOverdueContracts } from "@/hooks/useContracts";
import { useMe } from "@/hooks/useMe";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * S4-19: while the signed-in party has overdue contracts, block the platform
 * with a pop-up for the oldest one. It steps aside on that contract's
 * details so they can sign and complete; once it is done the user returns
 * home (BRD) and the next overdue contract, if any, takes its place.
 */
export const OverdueContractsGate = () => {
  const { me, isLoggedIn } = useMe();
  const overdue = useOverdueContracts(isLoggedIn);
  const router = useAppRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handling = useRef<string | null>(null);
  const oldest = overdue.data?.[0];

  useEffect(() => {
    if (!handling.current || !overdue.data) return;
    if (overdue.data.some((contract) => contract.id === handling.current)) {
      return;
    }
    handling.current = null;
    router.push("/");
  }, [overdue.data, router]);

  if (!isLoggedIn || !oldest) return null;
  const onDetails =
    (pathname.endsWith("/contracts") &&
      searchParams.get("contractId") === oldest.id) ||
    pathname.endsWith(`/contracts/${oldest.id}`);
  if (onDetails) return null;

  return (
    <OverdueContractDialog
      contractNumber={String(oldest.publicId ?? oldest.id)}
      isProvider={Boolean(me?.provider)}
      onOpenDetails={() => {
        handling.current = oldest.id;
        router.push(`/contracts?contractId=${oldest.id}`);
      }}
    />
  );
};
