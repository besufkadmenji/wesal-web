"use client";

import ContractIcon from "@/assets/icons/contracts/popup/contract.svg";
import FinanceIcon from "@/assets/icons/contracts/popup/finance.svg";
import TimelineIcon from "@/assets/icons/contracts/popup/timeline.svg";
import TitleIcon from "@/assets/icons/contracts/popup/title.svg";
import { ContractCompletionDialog } from "@/components/app/contracts/ContractCompletionDialog";
import { ContractPaymentDialog } from "@/components/app/contracts/ContractPaymentDialog";
import { MoneyValue } from "@/components/app/contracts/MoneyValue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ContractSignatureType,
  ContractStatus,
  type Contract,
} from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";
import {
  CalendarCheck2,
  CalendarClock,
  CircleCheck,
  CircleX,
  Clock3,
  Hourglass,
  MessagesSquare,
  Star,
  Truck,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type ComponentType, type ReactNode } from "react";

type CustomerContractStatus = ContractStatus | "OUT_FOR_DELIVERY";

export const CustomerContractDialog = ({
  contract,
  open,
  onOpenChange,
}: {
  contract: Contract | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const dict = useDict();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [completionOpen, setCompletionOpen] = useState(false);
  if (!contract) return null;

  const status = contract.status as CustomerContractStatus;
  const isPending = status === ContractStatus.Pending;
  const isPendingPayment = status === ContractStatus.Accepted;
  const isInProgress = status === ContractStatus.InProgress;
  const isCompleted = status === ContractStatus.Completed;
  const isCancelled = status === ContractStatus.Cancelled;
  const isOutForDelivery = status === "OUT_FOR_DELIVERY";
  const showsAcceptanceDate =
    isPendingPayment || isInProgress || isCompleted || isOutForDelivery;

  const customerSignature = contract.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.CustomerAcceptance,
  );
  const providerSignature = contract.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.ProviderAcceptance,
  );
  const completionSignature = contract.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.CustomerCompletion,
  );
  const providerDays = isPending ? null : undefined;
  const totalDays =
    providerDays != null && contract.deliveryTimeDays != null
      ? providerDays + contract.deliveryTimeDays
      : null;
  const pendingTimelineValue = isPending
    ? dict.contracts.awaitingProviderInput
    : "—";
  const popupStatus = getPopupStatus(status, dict.contracts);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="flex h-[771px] max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden rounded-[20px] border-0 bg-white p-0 shadow-xl sm:max-w-[830px]"
        >
          <header className="flex min-h-[111px] shrink-0 items-center gap-3 bg-[#fbfbfb] p-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className="text-primary grid size-[60px] shrink-0 place-content-center rounded-2xl bg-[#eff1f6]">
                <TitleIcon className="size-[30px]" />
              </span>
              <div className="min-w-0 text-start">
                <DialogTitle className="truncate text-xl leading-8 font-medium text-[#1a1a1a]">
                  {contract.conversation.listing.name}
                </DialogTitle>
                <p
                  className="text-gray truncate text-base leading-[1.7]"
                  dir="ltr"
                >
                  {formatContractReference(contract)}
                </p>
              </div>
            </div>

            <DialogDescription className="sr-only">
              {popupStatus.label}
            </DialogDescription>
            <StatusPill {...popupStatus} />
            <DialogClose className="text-gray grid size-8 shrink-0 cursor-pointer place-content-center rounded-full border border-[#f2f2f2] bg-white transition hover:bg-[#f8f9fb]">
              <X className="size-4" />
              <span className="sr-only">{dict.common.cancel}</span>
            </DialogClose>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
            <div className="grid gap-6">
              <section className="grid gap-6">
                <SectionTitle icon={TimelineIcon}>
                  {dict.contracts.timelineTitle}
                </SectionTitle>

                {isOutForDelivery ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    <TimelineMetric
                      icon={CalendarClock}
                      label={dict.contracts.expectedCompletionTime}
                      value={formatDays(totalDays, dict.contracts.dayUnit)}
                    />
                    <TimelineMetric
                      icon={Clock3}
                      label={dict.contracts.deliveryTime}
                      value={formatDays(
                        contract.deliveryTimeDays,
                        dict.contracts.dayUnit,
                      )}
                    />
                  </div>
                ) : (
                  <div className="grid gap-3 md:grid-cols-3">
                    <TimelineMetric
                      icon={Clock3}
                      label={dict.contracts.providerCompletionTime}
                      value={
                        isPending
                          ? pendingTimelineValue
                          : formatDays(providerDays, dict.contracts.dayUnit)
                      }
                    />
                    <TimelineMetric
                      icon={Clock3}
                      label={dict.contracts.deliveryTime}
                      value={
                        isPending
                          ? pendingTimelineValue
                          : formatDays(
                              contract.deliveryTimeDays,
                              dict.contracts.dayUnit,
                            )
                      }
                    />
                    <TimelineMetric
                      icon={CalendarClock}
                      label={dict.contracts.expectedCompletionTime}
                      value={
                        isPending
                          ? pendingTimelineValue
                          : formatDays(totalDays, dict.contracts.dayUnit)
                      }
                    />
                  </div>
                )}

                {showsAcceptanceDate && (
                  <div
                    className={cn(
                      "grid gap-3 md:grid-cols-2",
                      !isCompleted && "md:[&>*]:col-start-2",
                    )}
                  >
                    {isCompleted && (
                      <TimelineMetric
                        icon={CalendarCheck2}
                        label={dict.contracts.completedAt}
                        value={formatDate(contract.updatedAt)}
                      />
                    )}
                    <TimelineMetric
                      icon={CalendarCheck2}
                      label={dict.contracts.acceptedAt}
                      value={formatDate(contract.acceptedAt)}
                    />
                  </div>
                )}
              </section>

              <FinancialSection contract={contract} />

              {!isOutForDelivery && (
                <SignaturesSection
                  customerSignature={customerSignature?.signatureData}
                  providerSignature={
                    isCompleted ? providerSignature?.signatureData : undefined
                  }
                  completionSignature={
                    isCompleted ? completionSignature?.signatureData : undefined
                  }
                />
              )}

              {isCompleted && <RatingPrompt />}
            </div>
          </div>

          {!isCancelled && (
            <PopupActions
              contract={contract}
              status={status}
              onPay={() => setPaymentOpen(true)}
              onComplete={() => setCompletionOpen(true)}
            />
          )}
        </DialogContent>
      </Dialog>
      <ContractPaymentDialog
        contract={contract}
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        onPaid={() => onOpenChange(false)}
      />
      <ContractCompletionDialog
        contract={contract}
        open={completionOpen}
        onOpenChange={setCompletionOpen}
        onCompleted={() => onOpenChange(false)}
      />
    </>
  );
};

const StatusPill = ({
  label,
  icon: Icon,
  className,
}: {
  label: string;
  icon: LucideIcon;
  className: string;
}) => (
  <span
    className={cn(
      "ms-auto inline-flex h-10 shrink-0 items-center gap-1 rounded-xl border px-3 text-base leading-8 font-medium",
      className,
    )}
  >
    <Icon className="size-[18px]" />
    {label}
  </span>
);

const FinancialSection = ({ contract }: { contract: Contract }) => {
  const dict = useDict();
  return (
    <section className="grid gap-4">
      <SectionTitle icon={FinanceIcon}>
        {dict.contracts.financialDetails}
      </SectionTitle>
      <div className="grid gap-3 rounded-2xl border border-[#f2f2f2] bg-[#fbfbfb] p-4">
        <FinancialRow
          label={dict.contracts.agreedPrice}
          value={contract.agreedPrice}
        />
        <FinancialRow
          label={`${dict.contracts.vat} (${contract.vatRate}%)`}
          value={contract.vatAmount}
        />
        <FinancialRow
          label={`${dict.contracts.commission} (${contract.commissionPercent}%)`}
          value={contract.commissionAmount}
        />
        <div className="my-1 h-px bg-[#f2f2f2]" />
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg leading-8 font-medium text-[#1a1a1a]">
            {dict.contracts.financialTotal}
          </span>
          <MoneyValue
            value={contract.totalPayable}
            amountClassName="text-xl font-medium text-primary"
            currencyClassName="text-xl"
          />
        </div>
      </div>
    </section>
  );
};

const SignaturesSection = ({
  customerSignature,
  providerSignature,
  completionSignature,
}: {
  customerSignature?: string;
  providerSignature?: string;
  completionSignature?: string;
}) => {
  const dict = useDict();
  return (
    <section className="grid gap-4">
      <SectionTitle icon={ContractIcon}>
        {dict.contracts.electronicSignatures}
      </SectionTitle>
      <div className="grid gap-3 rounded-2xl border border-[#f2f2f2] bg-[#fbfbfb] p-4 md:grid-cols-2">
        <SignaturePreview
          label={dict.contracts.signature}
          filename={customerSignature}
        />
        {providerSignature !== undefined && (
          <SignaturePreview
            label={dict.contracts.providerAcceptanceSignature}
            filename={providerSignature}
          />
        )}
        {completionSignature !== undefined && (
          <SignaturePreview
            label={dict.contracts.completionSignature}
            filename={completionSignature}
          />
        )}
      </div>
    </section>
  );
};

const SignaturePreview = ({
  label,
  filename,
}: {
  label: string;
  filename?: string;
}) => (
  <div className="grid gap-3">
    <p className="text-start text-base leading-[1.7] text-[#1a1a1a]">{label}</p>
    <div className="relative h-[120px] overflow-hidden rounded-2xl border border-dashed border-[#e5e7eb] bg-white">
      {filename ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_DATA}/files/${filename}`}
          alt={label}
          fill
          sizes="370px"
          className="object-contain p-3"
        />
      ) : (
        <span className="text-gray absolute inset-0 grid place-content-center">
          —
        </span>
      )}
    </div>
  </div>
);

const RatingPrompt = () => {
  const dict = useDict();
  return (
    <section className="grid gap-4">
      <SectionTitle icon={Star}>{dict.contracts.ratingTitle}</SectionTitle>
      <div className="grid justify-items-center gap-2 rounded-2xl border border-[#f2f2f2] bg-[#fbfbfb] p-4 text-center">
        <p className="text-base font-medium text-[#1a1a1a]">
          {dict.contracts.ratingPrompt}
        </p>
        <p className="text-gray text-sm">{dict.contracts.ratingDescription}</p>
        <Button
          type="button"
          aria-disabled="true"
          onClick={(event) => event.preventDefault()}
          variant="ghost"
          className="text-primary h-auto p-0 text-sm font-semibold"
        >
          {dict.contracts.rateContract}
        </Button>
      </div>
    </section>
  );
};

const PopupActions = ({
  contract,
  status,
  onPay,
  onComplete,
}: {
  contract: Contract;
  status: CustomerContractStatus;
  onPay: () => void;
  onComplete: () => void;
}) => {
  const dict = useDict();
  const isPending = status === ContractStatus.Pending;
  const isPendingPayment = status === ContractStatus.Accepted;
  const isInProgress = status === ContractStatus.InProgress;
  const isCompleted = status === ContractStatus.Completed;
  const isOutForDelivery = status === "OUT_FOR_DELIVERY";
  const actionCount = isPendingPayment || isInProgress ? 3 : 2;

  return (
    <footer
      className={cn(
        "grid shrink-0 gap-3 bg-white p-6 pt-4",
        actionCount === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      <Link
        href={`/conversations/${contract.conversationId}`}
        className="bg-primary flex h-[50px] items-center justify-center gap-2 rounded-[20px] text-base font-semibold text-white transition hover:opacity-90"
      >
        <MessagesSquare className="size-5" />
        {dict.contracts.conversation}
      </Link>

      {isPendingPayment && (
        <Button
          type="button"
          onClick={onPay}
          className="text-primary h-[50px] rounded-[20px] bg-[#eff1f6] text-base font-semibold shadow-none hover:bg-[#e8ebf2]"
        >
          {dict.contracts.pay}
        </Button>
      )}
      {isInProgress && (
        <Button
          type="button"
          onClick={onComplete}
          className="text-primary h-[50px] rounded-[20px] bg-[#eff1f6] text-base font-semibold shadow-none hover:bg-[#e8ebf2]"
        >
          {dict.contracts.completeContract}
        </Button>
      )}
      {isCompleted && (
        <Link
          href={`/contracts/${contract.id}`}
          className="text-primary flex h-[50px] items-center justify-center rounded-[20px] bg-[#eff1f6] text-base font-semibold transition hover:bg-[#e8ebf2]"
        >
          {dict.contracts.viewDetails}
        </Link>
      )}
      {isOutForDelivery && (
        <InactiveAction className="bg-[#fbe8e7] text-[#c12620]">
          {dict.contracts.rejectDelivery}
        </InactiveAction>
      )}
      {(isPending || isPendingPayment || isInProgress) && (
        <InactiveAction className="bg-[#fbe8e7] text-[#c12620]">
          {dict.contracts.cancelContract}
        </InactiveAction>
      )}
    </footer>
  );
};

const InactiveAction = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => (
  <Button
    type="button"
    aria-disabled="true"
    onClick={(event) => event.preventDefault()}
    className={cn(
      "h-[50px] rounded-[20px] text-base font-semibold shadow-none",
      className,
    )}
  >
    {children}
  </Button>
);

const SectionTitle = ({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) => (
  <h2 className="text-primary flex items-center justify-start gap-1 text-lg font-medium">
    <Icon className="size-5" />
    {children}
  </h2>
);

const TimelineMetric = ({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="flex min-h-[87px] items-start justify-between gap-2 rounded-2xl border border-[#f2f2f2] bg-[#fbfbfb] p-4">
    <div className="grid min-w-0 gap-1 text-start">
      <p className="text-gray text-base leading-[1.7]">{label}</p>
      <strong className="text-base font-medium text-[#1a1a1a]">{value}</strong>
    </div>
    <span className="text-gray grid size-[30px] shrink-0 place-content-center rounded-xl bg-[#f2f2f2]">
      <Icon className="size-[18px]" />
    </span>
  </div>
);

const FinancialRow = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-gray text-base leading-[1.7]">{label}</span>
    <MoneyValue
      value={value}
      amountClassName="text-lg font-medium text-gray"
      currencyClassName="text-lg text-gray"
    />
  </div>
);

const getPopupStatus = (
  status: CustomerContractStatus,
  labels: ReturnType<typeof useDict>["contracts"],
) => {
  const statuses: Record<
    CustomerContractStatus,
    { label: string; icon: LucideIcon; className: string }
  > = {
    [ContractStatus.Draft]: {
      label: labels.details,
      icon: Clock3,
      className: "border-slate-400 bg-slate-50 text-slate-600",
    },
    [ContractStatus.Pending]: {
      label: labels.pendingAcceptance,
      icon: Clock3,
      className: "border-[#f59e0b] bg-amber-50 text-[#d48003]",
    },
    [ContractStatus.Accepted]: {
      label: labels.pendingPayment,
      icon: WalletCards,
      className: "border-blue-500 bg-blue-50 text-blue-600",
    },
    [ContractStatus.InProgress]: {
      label: labels.inProgress,
      icon: Hourglass,
      className: "border-violet-500 bg-violet-50 text-violet-600",
    },
    [ContractStatus.Completed]: {
      label: labels.completed,
      icon: CircleCheck,
      className: "border-emerald-500 bg-emerald-50 text-emerald-600",
    },
    [ContractStatus.Rejected]: {
      label: labels.rejected,
      icon: CircleX,
      className: "border-rose-500 bg-rose-50 text-rose-600",
    },
    [ContractStatus.Cancelled]: {
      label: labels.cancelled,
      icon: CircleX,
      className: "border-[#b3251e] bg-[#fbeae9] text-[#b3251e]",
    },
    OUT_FOR_DELIVERY: {
      label: labels.outForDelivery,
      icon: Truck,
      className: "border-cyan-500 bg-cyan-50 text-cyan-500",
    },
  };
  return statuses[status];
};

const DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const formatDate = (value: string | Date | null | undefined) =>
  value ? DATE_FORMATTER.format(new Date(value)) : "—";

const formatDays = (value: number | null | undefined, unit: string) =>
  value ? `${value} ${unit}` : "—";

const formatContractReference = (contract: Contract) =>
  contract.publicId
    ? `TX-${contract.publicId}`
    : `TX-${contract.id.slice(0, 8).toUpperCase()}`;
