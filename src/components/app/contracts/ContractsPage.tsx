"use client";

import DocumentIcon from "@/assets/icons/contracts/document.svg";
import { CompletedContractDetailPage } from "@/components/app/contracts/CompletedContractDetailPage";
import { ContractHero } from "@/components/app/contracts/ContractHero";
import { MoneyValue } from "@/components/app/contracts/MoneyValue";
import { CustomerContractDialog } from "@/components/app/contracts/CustomerContractDialog";
import { ContractStatusPill } from "@/components/app/contracts/ContractStatusPill";
import { ProviderContractAcceptPage } from "@/components/app/contracts/ProviderContractAcceptPage";
import { ProviderContractDialog } from "@/components/app/contracts/ProviderContractDialog";
import { SignaturePreview } from "@/components/app/contracts/SignaturePreview";
import {
  CONTRACT_DATE_FORMATTER,
  formatContractReference,
  toContractDate,
} from "@/components/app/contracts/formatContract";
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
  type Contract,
} from "@/gql/graphql";
import { useContract, useContracts } from "@/hooks/useContracts";
import { queryKeys } from "@/hooks/queryKeys";
import { useAppRouter } from "@/hooks/use.app.router";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { cn } from "@/lib/utils";
import { ContractService } from "@/services/contract.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  CalendarDays,
  CircleDollarSign,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const CONTRACTS_PER_PAGE = 9;

const CONTRACT_FILTERS: Array<{
  value: ContractStatus | "";
  label:
    | "all"
    | "pendingAcceptance"
    | "pendingPayment"
    | "inProgress"
    | "completed"
    | "rejected"
    | "cancelled";
}> = [
  { value: "", label: "all" },
  { value: ContractStatus.Pending, label: "pendingAcceptance" },
  { value: ContractStatus.Accepted, label: "pendingPayment" },
  { value: ContractStatus.InProgress, label: "inProgress" },
  { value: ContractStatus.Completed, label: "completed" },
  { value: ContractStatus.Rejected, label: "rejected" },
  { value: ContractStatus.Cancelled, label: "cancelled" },
];

export const ContractsPage = () => {
  const dict = useDict();
  const { me } = useMe();
  const router = useAppRouter();
  const searchParams = useSearchParams();
  const requestedContractId = searchParams.get("contractId") || undefined;
  const requestedContract = useContract(requestedContractId);
  const [status, setStatus] = useState<ContractStatus | "">("");
  const [page, setPage] = useState(1);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null,
  );
  const contracts = useContracts({
    status: status || undefined,
    page,
    limit: CONTRACTS_PER_PAGE,
  });
  const activeContract = requestedContract.data ?? selectedContract;

  const closeContract = () => {
    setSelectedContract(null);
    if (requestedContractId) {
      router.replace("/contracts");
    }
  };

  const selectStatus = (value: ContractStatus | "") => {
    setStatus(value);
    setPage(1);
  };

  return (
    <AppWrapper>
      <ContractHero
        title={dict.contracts.title}
        breadcrumbHref="/"
        breadcrumbLabel={dict.home.nav.home}
      />
      <main className="bg-[#fcfdfe] px-4 py-12 md:px-8 xl:px-[7vw] xl:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8">
          <div className="overflow-x-auto pb-1">
            <div className="flex min-w-max gap-1 rounded-[20px] bg-white p-1 lg:min-w-0">
              {CONTRACT_FILTERS.map((filter) => {
                const isActive = status === filter.value;
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
                    {isActive && contracts.data && (
                      <span className="bg-primary grid size-6 shrink-0 place-content-center rounded-full text-xs text-white">
                        {contracts.data.meta.total}
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
            <EmptyState title={dict.contracts.empty} />
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {contracts.data.items.map((contract) => (
                  <ContractCard
                    key={contract.id}
                    contract={contract}
                    isProvider={Boolean(me?.provider)}
                    onOpenContract={
                      me?.user || me?.provider
                        ? setSelectedContract
                        : undefined
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

const ContractCard = ({
  contract,
  isProvider,
  onOpenContract,
}: {
  contract: Contract;
  isProvider?: boolean;
  onOpenContract?: (contract: Contract) => void;
}) => {
  const dict = useDict();
  // Completed contracts use the document page for PDF export. Provider-pending
  // contracts retain their acceptance workflow; all other statuses use a popup.
  const opensContractDialog = Boolean(
    onOpenContract &&
    contract.status !== ContractStatus.Completed &&
    !(isProvider && contract.status === ContractStatus.Pending),
  );
  const cardDetails = (
    <>
      <header className="flex h-20 items-center justify-between gap-3 bg-[#fbfbfb] p-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-primary grid size-10 shrink-0 place-content-center rounded-xl bg-[#eff1f6]">
            <DocumentIcon className="size-6" />
          </span>
          <div className="min-w-0 text-left rtl:text-right">
            <h2 className="truncate text-base leading-8 font-medium text-[#1a1a1a]">
              {contract.conversation.listing.name}
            </h2>
            <p className="text-gray truncate text-sm leading-[1.7]" dir="ltr">
              {formatContractReference(contract)}
            </p>
          </div>
        </div>
        <ContractStatusPill status={contract.status} />
      </header>

      <div className="mt-4 flex items-center gap-1 px-3">
        <CircleDollarSign className="text-gray size-[18px] shrink-0" />
        <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
          <p className="text-gray shrink-0 text-sm leading-[1.7]">
            {dict.contracts.agreedPrice}
          </p>
          <MoneyValue
            value={contract.agreedPrice}
            className="min-w-0"
            amountClassName="truncate text-xl leading-8 font-medium text-primary"
            currencyClassName="text-lg"
          />
        </div>
      </div>
      <ContractCardDates contract={contract} />
    </>
  );

  return (
    <article className="group flex h-[254px] flex-col gap-4 overflow-hidden rounded-[20px] border border-[#f2f2f2] bg-white pb-3 transition hover:-translate-y-0.5 hover:shadow-sm">
      {opensContractDialog ? (
        <button
          type="button"
          className="block w-full cursor-pointer text-start"
          onClick={() => onOpenContract?.(contract)}
        >
          {cardDetails}
        </button>
      ) : (
        <Link href={`/contracts/${contract.id}`} className="block">
          {cardDetails}
        </Link>
      )}

      <Link
        href={`/conversations/${contract.conversationId}`}
        className="bg-primary mx-3 mt-auto flex h-[50px] shrink-0 items-center justify-center gap-2 rounded-[20px] text-base font-semibold text-white transition hover:opacity-90"
      >
        <MessagesSquare className="size-5" />
        {dict.contracts.conversation}
      </Link>
    </article>
  );
};

const ContractCardDates = ({ contract }: { contract: Contract }) => {
  const dict = useDict();
  const status = contract.status;
  const showsAcceptance = [
    ContractStatus.Accepted,
    ContractStatus.InProgress,
    ContractStatus.Completed,
  ].includes(status);

  if (!showsAcceptance) {
    return <div aria-hidden className="mx-3 mt-2 h-6" />;
  }

  const acceptanceDate = contract.acceptedAt || contract.updatedAt;
  const isCompleted = status === ContractStatus.Completed;

  return (
    <div
      className={cn(
        "mx-3 mt-2 flex h-6 items-start gap-2",
        isCompleted ? "justify-between" : "justify-center",
      )}
    >
      <ContractCardDate
        icon={CalendarDays}
        label={dict.contracts.acceptedAt}
        value={acceptanceDate}
        className={isCompleted ? "flex-1" : undefined}
      />
      {isCompleted && (
        <ContractCardDate
          icon={CalendarCheck2}
          label={dict.contracts.completedAt}
          value={contract.updatedAt}
          className="flex-1"
        />
      )}
    </div>
  );
};

const ContractCardDate = ({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: unknown;
  className?: string;
}) => {
  const date = toContractDate(value);
  if (!date) return null;

  return (
    <div
      className={cn(
        "flex min-w-0 items-center justify-center gap-1 text-sm leading-[1.7] whitespace-nowrap",
        className,
      )}
    >
      <Icon className="text-gray size-[18px] shrink-0" />
      <span className="text-gray">{label}:</span>
      <time
        dateTime={date.toISOString()}
        className="truncate font-medium text-[#1a1a1a]"
        dir="ltr"
      >
        {CONTRACT_DATE_FORMATTER.format(date)}
      </time>
    </div>
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
  const pay = useMutation({
    mutationFn: () => ContractService.pay(id),
    onSuccess: () => {
      showSuccessMessage(dict.contracts.paid);
      refresh();
    },
    onError: (error) => showErrorMessage(error.message),
  });

  if (contract.isLoading)
    return (
      <AppWrapper>
        <ContractDetailSkeleton />
      </AppWrapper>
    );
  if (!contract.data)
    return (
      <AppWrapper>
        <EmptyState title={dict.contracts.empty} />
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
          <CompletedContractDetailPage contract={item} />
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
                label={dict.contracts.deliveryDays}
                value={
                  item.deliveryTimeDays
                    ? `${item.deliveryTimeDays} ${dict.common.days}`
                    : "—"
                }
              />
            </div>
            <FinancialSummary contract={item} />
            <div className="grid gap-4 md:grid-cols-2">
              <SignaturePreview
                variant="detail"
                label={dict.contracts.signature}
                filename={customerSignature?.signatureData}
              />
              <SignaturePreview
                variant="detail"
                label={dict.contracts.providerAcceptanceSignature}
                filename={providerSignature?.signatureData}
              />
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
              disabled={pay.isPending}
              onClick={() => pay.mutate()}
            >
              {dict.contracts.pay} · {format.money(item.totalPayable)}
            </Button>
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
