"use client";

import { ContractStatus } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";
import {
  CircleCheck,
  CircleX,
  Clock3,
  FilePenLine,
  Hourglass,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

export const getContractStatusLabel = (
  status: ContractStatus,
  dict: ReturnType<typeof useDict>,
) => {
  const labels: Partial<Record<ContractStatus, string>> = {
    [ContractStatus.Pending]: dict.contracts.pendingAcceptance,
    [ContractStatus.Accepted]: dict.contracts.pendingPayment,
    [ContractStatus.InProgress]: dict.contracts.inProgress,
    [ContractStatus.AwaitingCustomerConfirmation]: dict.contracts.pendingAcceptance,
    [ContractStatus.DeliveryInProgress]: dict.contracts.outForDelivery,
    [ContractStatus.CancellationRequested]: dict.contracts.cancelled,
    [ContractStatus.Disputed]: dict.contracts.rejectDelivery,
    [ContractStatus.Completed]: dict.contracts.completed,
    [ContractStatus.Rejected]: dict.contracts.rejected,
    [ContractStatus.Cancelled]: dict.contracts.cancelled,
  };
  return (
    labels[status] ||
    (dict.status as Record<string, string>)[status] ||
    status.replaceAll("_", " ")
  );
};

const STATUS_ICONS: Record<ContractStatus, LucideIcon> = {
  [ContractStatus.Draft]: FilePenLine,
  [ContractStatus.Pending]: Clock3,
  [ContractStatus.Accepted]: WalletCards,
  [ContractStatus.InProgress]: Hourglass,
  [ContractStatus.AwaitingCustomerConfirmation]: Clock3,
  [ContractStatus.DeliveryInProgress]: Hourglass,
  [ContractStatus.CancellationRequested]: Clock3,
  [ContractStatus.Disputed]: CircleX,
  [ContractStatus.Completed]: CircleCheck,
  [ContractStatus.Rejected]: CircleX,
  [ContractStatus.Cancelled]: CircleX,
};

const STATUS_CLASSES: Record<ContractStatus, string> = {
  [ContractStatus.Draft]: "border-slate-400 bg-slate-50 text-slate-600",
  [ContractStatus.Pending]: "border-[#f59e0b] bg-amber-50 text-[#d48003]",
  [ContractStatus.Accepted]: "border-blue-500 bg-blue-50 text-blue-600",
  [ContractStatus.InProgress]: "border-violet-500 bg-violet-50 text-violet-600",
  [ContractStatus.AwaitingCustomerConfirmation]:
    "border-amber-500 bg-amber-50 text-amber-700",
  [ContractStatus.DeliveryInProgress]:
    "border-sky-500 bg-sky-50 text-sky-700",
  [ContractStatus.CancellationRequested]:
    "border-orange-500 bg-orange-50 text-orange-700",
  [ContractStatus.Disputed]: "border-rose-500 bg-rose-50 text-rose-700",
  [ContractStatus.Completed]:
    "border-emerald-500 bg-emerald-50 text-emerald-600",
  [ContractStatus.Rejected]: "border-rose-500 bg-rose-50 text-rose-600",
  [ContractStatus.Cancelled]: "border-[#b3251e] bg-[#fbeae9] text-[#b3251e]",
};

export const ContractStatusPill = ({
  status,
  className,
}: {
  status: ContractStatus;
  className?: string;
}) => {
  const dict = useDict();
  const Icon = STATUS_ICONS[status];
  return (
    <span
      className={cn(
        "inline-flex h-10 shrink-0 items-center gap-1 rounded-xl border px-3 text-base leading-8 font-medium",
        STATUS_CLASSES[status],
        className,
      )}
    >
      <Icon className="size-[18px]" />
      {getContractStatusLabel(status, dict)}
    </span>
  );
};
