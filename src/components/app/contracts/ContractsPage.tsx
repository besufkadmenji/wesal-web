"use client";

import { ContractRemovedNotice } from "@/components/app/contracts/ContractRemovedNotice";
import { CompletedContractDetailPage } from "@/components/app/contracts/CompletedContractDetailPage";
import { ContractHero } from "@/components/app/contracts/ContractHero";
import { ContractPaymentDialog } from "@/components/app/contracts/ContractPaymentDialog";
import { CustomerContractDialog } from "@/components/app/contracts/CustomerContractDialog";
import { ProviderContractAcceptPage } from "@/components/app/contracts/ProviderContractAcceptPage";
import { ProviderContractDialog } from "@/components/app/contracts/ProviderContractDialog";
import { SignaturePreview } from "@/components/app/contracts/SignaturePreview";
import { formatHours } from "@/components/app/contracts/formatContract";
import {
  ContractCardSkeleton,
  ContractDetailSkeleton,
} from "@/components/app/contracts/ContractSkeletons";
import { AppPagination } from "@/components/app/shared/AppPagination";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import {
  EmptyState,
  StatusBadge,
  useLocalizedFormat,
} from "@/components/app/shared/ParticipantUI";
import { Button } from "@/components/ui/button";
import {
  ContractSignatureType,
  ContractStatus,
  ContractStatusGroup,
  SortOrder,
  type Contract,
} from "@/gql/graphql";
import { ContractCard } from "@/components/app/contracts/ContractCard";
import { useContract, useContracts } from "@/hooks/useContracts";
import { CharityIntroDialog } from "@/components/app/contracts/CharityIntroDialog";
import { queryKeys } from "@/hooks/queryKeys";
import { useAppRouter } from "@/hooks/use.app.router";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const CONTRACTS_PER_PAGE = 9;

// S4-1: the 7 Figma/BRD tabs; each maps to an API status group.
const CONTRACT_FILTERS: Array<{
  value: ContractStatusGroup | "";
  label:
    | "all"
    | "pendingAcceptance"
    | "pendingPayment"
    | "inProgress"
    | "outForDelivery"
    | "completed"
    | "cancelled";
}> = [
  { value: "", label: "all" },
  { value: ContractStatusGroup.PendingAcceptance, label: "pendingAcceptance" },
  { value: ContractStatusGroup.PendingPayment, label: "pendingPayment" },
  { value: ContractStatusGroup.InProgress, label: "inProgress" },
  { value: ContractStatusGroup.InDelivery, label: "outForDelivery" },
  { value: ContractStatusGroup.Completed, label: "completed" },
  { value: ContractStatusGroup.Cancelled, label: "cancelled" },
];

/**
 * My Contracts. The "charity" variant is the Wesal Al-Khair page (BRD 4.1.10,
 * 4.2.8): the same tabs and cards, limited to the user's charity contracts.
 */
export const ContractsPage = ({
  variant = "all",
}: {
  variant?: "all" | "charity";
}) => {
  const isCharityPage = variant === "charity";
  const basePath = isCharityPage ? "/charity" : "/contracts";
  const dict = useDict();
  const { me } = useMe();
  const router = useAppRouter();
  const searchParams = useSearchParams();
  const requestedContractId = searchParams.get("contractId") || undefined;
  const requestedContract = useContract(requestedContractId);
  const [statusGroup, setStatusGroup] = useState<ContractStatusGroup | "">("");
  const [page, setPage] = useState(1);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null,
  );
  const isCharity = isCharityPage ? true : undefined;
  const contracts = useContracts({
    statusGroup: statusGroup || undefined,
    page,
    limit: CONTRACTS_PER_PAGE,
    isCharity,
    // BRD: newest first.
    sortOrder: SortOrder.Desc,
  });
  // Figma shows the overall total on the "All" tab, whichever tab is open.
  const allContracts = useContracts({ page: 1, limit: 1, isCharity });
  const activeContract = requestedContract.data ?? selectedContract;

  const closeContract = () => {
    setSelectedContract(null);
    if (requestedContractId) {
      router.replace(basePath);
    }
  };

  const selectStatus = (value: ContractStatusGroup | "") => {
    setStatusGroup(value);
    setPage(1);
  };

  return (
    <AppWrapper>
      {isCharityPage && <CharityIntroDialog />}
      <ContractHero
        title={isCharityPage ? dict.charity.title : dict.contracts.title}
        breadcrumbHref="/"
        breadcrumbLabel={dict.home.nav.home}
      />
      <main className="bg-[#fcfdfe] px-4 py-12 md:px-8 xl:px-[7vw] xl:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8">
          {requestedContractId && requestedContract.isError && (
            <ContractRemovedNotice onDismiss={closeContract} />
          )}
          <div className="overflow-x-auto pb-1">
            <div className="flex min-w-max gap-1 rounded-[20px] bg-white p-1 lg:min-w-0">
              {CONTRACT_FILTERS.map((filter) => {
                const isActive = statusGroup === filter.value;
                return (
                  <button
                    key={filter.value || "all"}
                    type="button"
                    aria-pressed={isActive}
                    className={cn(
                      "text-primary flex h-12 min-w-36 flex-1 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-medium whitespace-nowrap transition-colors lg:min-w-0",
                      isActive ? "bg-[#eff1f6]" : "hover:bg-[#f8f9fb]",
                    )}
                    onClick={() => selectStatus(filter.value)}
                  >
                    <span>{dict.contracts[filter.label]}</span>
                    {filter.value === "" && allContracts.data && (
                      <span className="bg-primary grid size-6 shrink-0 place-content-center rounded-full text-xs text-white">
                        {allContracts.data.meta.total}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          {contracts.isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: CONTRACTS_PER_PAGE }).map((_, index) => (
                <ContractCardSkeleton key={index} />
              ))}
            </div>
          ) : !contracts.data?.items.length ? (
            <EmptyState
              title={isCharityPage ? dict.charity.empty : dict.contracts.empty}
            />
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {contracts.data.items.map((contract) => (
                  <ContractCard
                    key={contract.id}
                    contract={contract}
                    isProvider={Boolean(me?.provider)}
                    onOpenContract={
                      me?.user || me?.provider ? setSelectedContract : undefined
                    }
                  />
                ))}
              </div>
              {contracts.data.meta.totalPages > 1 && (
                <AppPagination
                  page={contracts.data.meta.page}
                  totalPages={contracts.data.meta.totalPages}
                  onChange={setPage}
                />
              )}
            </>
          )}
        </div>
      </main>
      {me?.user ? (
        <CustomerContractDialog
          contract={activeContract}
          open={Boolean(activeContract)}
          onOpenChange={(open) => {
            if (!open) closeContract();
          }}
        />
      ) : (
        <ProviderContractDialog
          contract={activeContract}
          open={Boolean(activeContract)}
          onOpenChange={(open) => {
            if (!open) closeContract();
          }}
        />
      )}
    </AppWrapper>
  );
};

export const ContractDetailPage = ({ id }: { id: string }) => {
  const dict = useDict();
  const router = useAppRouter();
  const { me } = useMe();
  const format = useLocalizedFormat();
  const queryClient = useQueryClient();
  const contract = useContract(id);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.contract(id) });
    queryClient.invalidateQueries({ queryKey: queryKeys.contracts });
    if (contract.data?.conversationId) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.conversation(contract.data.conversationId),
      });
    }
  };
  const [paymentOpen, setPaymentOpen] = useState(false);

  if (contract.isLoading)
    return (
      <AppWrapper>
        <ContractDetailSkeleton />
      </AppWrapper>
    );
  if (!contract.data)
    return (
      <AppWrapper>
        <EmptyState
          title={
            contract.isError
              ? dict.contracts.removedTitle
              : dict.contracts.empty
          }
        />
      </AppWrapper>
    );
  const item = contract.data;
  const customerSignature = item.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.CustomerAcceptance,
  );
  const providerSignature = item.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.ProviderAcceptance,
  );
  const completionSignature = item.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.CustomerCompletion,
  );
  const isProvider = Boolean(
    me?.provider && me.provider.id === item.providerId,
  );
  const isCustomer = Boolean(me?.user && me.user.id === item.clientId);

  if (isProvider && item.status === ContractStatus.Pending) {
    return (
      <AppWrapper>
        <main className="bg-[#fcfdfe]">
          <ProviderContractAcceptPage contract={item} />
        </main>
      </AppWrapper>
    );
  }

  if (item.status === ContractStatus.Completed) {
    return (
      <AppWrapper>
        <main className="bg-[#fcfdfe]">
          <CompletedContractDetailPage
            contract={item}
            canRate={isCustomer}
            onRated={refresh}
          />
        </main>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
      <main className="bg-[#fcfdfe] px-4 py-12 md:px-8 xl:px-[7vw] xl:py-20">
        <div className="mx-auto grid max-w-5xl gap-6">
          <header className="flex items-center gap-3 rounded-[20px] bg-white p-5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/contracts")}
            >
              <span className="rtl:hidden">
                <ArrowLeft />
              </span>
              <span className="ltr:hidden">
                <ArrowRight />
              </span>
            </Button>
            <div className="grow">
              <h1 className="text-xl font-semibold">
                {dict.contracts.details}
              </h1>
              <p className="text-gray text-sm">
                #{item.publicId || item.id.slice(0, 8)} ·{" "}
                {dict.contracts.version} {item.version}
              </p>
            </div>
            <StatusBadge status={item.status} />
          </header>

          <section className="grid gap-6 rounded-[20px] bg-white p-5 md:p-7">
            <div className="grid gap-4 md:grid-cols-2">
              <Detail
                label={dict.contracts.agreedPrice}
                value={format.money(item.agreedPrice)}
              />
              <Detail
                label={dict.contracts.address}
                value={item.customerAddress}
              />
              <Detail
                label={dict.contracts.deliveryCompany}
                value={
                  item.deliveryCompanyNameAr ||
                  item.deliveryCompanyNameEn ||
                  "—"
                }
              />
              <Detail
                label={dict.contracts.executionHours}
                value={formatHours(
                  item.executionHours,
                  dict.contracts.hourUnit,
                )}
              />
            </div>
            <FinancialSummary contract={item} />
            <div className="grid gap-4 md:grid-cols-2">
              <SignaturePreview
                variant="detail"
                label={dict.contracts.signature}
                filename={customerSignature?.signatureData}
              />
              {/* BRD (D-19): the customer sees provider signatures only in the PDF. */}
              {!me?.user && (
                <SignaturePreview
                  variant="detail"
                  label={dict.contracts.providerAcceptanceSignature}
                  filename={providerSignature?.signatureData}
                />
              )}
              {completionSignature && (
                <SignaturePreview
                  variant="detail"
                  label={dict.contracts.completionSignature}
                  filename={completionSignature.signatureData}
                />
              )}
            </div>
            <div className="rounded-[14px] bg-[#f8f9fb] p-4">
              <p className="text-sm leading-7 whitespace-pre-wrap">
                {item.contractDocumentText}
              </p>
            </div>
            {item.rejectionReason && (
              <div className="rounded-[14px] bg-red-50 p-4 text-sm text-red-700">
                {item.rejectionReason}
              </div>
            )}
            {item.supersedesContract && (
              <Link
                className="text-primary text-sm underline"
                href={`/contracts/${item.supersedesContract.id}`}
              >
                {dict.contracts.version} {item.supersedesContract.version}
              </Link>
            )}
          </section>

          {isCustomer && item.status === ContractStatus.Accepted && (
            <Button
              className="h-13 justify-self-end rounded-[16px] px-8"
              onClick={() => setPaymentOpen(true)}
            >
              {dict.contracts.pay} · {format.money(item.totalPayable)}
            </Button>
          )}
          {isCustomer && item.status === ContractStatus.Accepted && (
            <ContractPaymentDialog
              contract={item}
              open={paymentOpen}
              onOpenChange={setPaymentOpen}
            />
          )}
          {isCustomer && item.status === ContractStatus.Rejected && (
            <Button
              asChild
              className="h-13 justify-self-end rounded-[16px] px-8"
            >
              <Link href={`/contracts/${item.id}/resend`}>
                {dict.contracts.resend}
              </Link>
            </Button>
          )}
        </div>
      </main>
    </AppWrapper>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="grid gap-1 rounded-[14px] border border-[#f2f2f2] p-4">
    <span className="text-gray text-xs">{label}</span>
    <strong className="text-sm font-medium">{value}</strong>
  </div>
);

export const FinancialSummary = ({
  contract,
}: {
  contract: Pick<
    Contract,
    | "downPayment"
    | "commissionAmount"
    | "vatAmount"
    | "totalPayable"
    | "providerNetAmount"
  >;
}) => {
  const dict = useDict();
  const format = useLocalizedFormat();
  const rows = [
    [dict.contracts.deposit, contract.downPayment],
    [dict.contracts.commission, contract.commissionAmount],
    [dict.contracts.vat, contract.vatAmount],
    [dict.contracts.total, contract.totalPayable],
    [dict.contracts.providerNet, contract.providerNetAmount],
  ] as const;
  return (
    <div className="grid gap-3 rounded-[16px] bg-[#f8f9fb] p-5">
      <h2 className="font-semibold">{dict.contracts.quote}</h2>
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-4 text-sm">
          <span className="text-gray">{label}</span>
          <strong>{format.money(value)}</strong>
        </div>
      ))}
    </div>
  );
};
