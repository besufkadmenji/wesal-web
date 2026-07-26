"use client";

import CalendarIcon from "@/assets/icons/contracts/popup/calendar.svg";
import ClockIcon from "@/assets/icons/contracts/popup/clock.svg";
import TimelineIcon from "@/assets/icons/contracts/popup/timeline.svg";
import TitleIcon from "@/assets/icons/contracts/popup/title.svg";
import { ContractFinancialSection } from "@/components/app/contracts/ContractFinancialSection";
import { ContractSectionTitle } from "@/components/app/contracts/ContractSectionTitle";
import { ContractSignaturesSection } from "@/components/app/contracts/ContractSignaturesSection";
import {
  ContractStatusPill,
  getContractStatusLabel,
} from "@/components/app/contracts/ContractStatusPill";
import { ProviderContractActions } from "@/components/app/contracts/ProviderContractActions";
import { TimelineMetric } from "@/components/app/contracts/TimelineMetric";
import {
  formatContractDate,
  formatContractReference,
  formatDays,
} from "@/components/app/contracts/formatContract";
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
import { X } from "lucide-react";
import { ContractLifecycleHistory } from "./ContractLifecycleHistory";

export const ProviderContractDialog = ({
  contract,
  open,
  onOpenChange,
}: {
  contract: Contract | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const dict = useDict();
  if (!contract) return null;

  const status = contract.status;
  const isPending = status === ContractStatus.Pending;
  const isPendingPayment = status === ContractStatus.Accepted;
  const isInProgress = status === ContractStatus.InProgress;
  const isCompleted = status === ContractStatus.Completed;
  const isCancelled = status === ContractStatus.Cancelled;
  const showsAcceptanceDate = isPendingPayment || isInProgress || isCompleted;

  const customerSignature = contract.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.CustomerAcceptance,
  );
  // The API does not expose a provider completion-time field yet, so the
  // provider and expected-completion metrics can only show a placeholder
  // once the contract leaves the pending state.
  const pendingTimelineValue = isPending
    ? dict.contracts.awaitingProviderInput
    : "—";
  const deliveryTimelineValue = isPending
    ? pendingTimelineValue
    : formatDays(contract.deliveryTimeDays, dict.contracts.dayUnit);

  return (
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
            {getContractStatusLabel(status, dict)}
          </DialogDescription>
          <ContractStatusPill status={status} className="ms-auto" />
          <DialogClose className="text-gray grid size-8 shrink-0 cursor-pointer place-content-center rounded-full border border-[#f2f2f2] bg-white transition hover:bg-[#f8f9fb]">
            <X className="size-4" />
            <span className="sr-only">{dict.common.cancel}</span>
          </DialogClose>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <div className="grid gap-6">
            <section className="grid gap-6">
              <ContractSectionTitle icon={TimelineIcon}>
                {dict.contracts.timelineTitle}
              </ContractSectionTitle>

              <div className="grid grid-cols-1 gap-3">
                <div className="grid gap-3 md:grid-cols-3">
                  <TimelineMetric
                    icon={ClockIcon}
                    label={dict.contracts.providerCompletionTime}
                    value={pendingTimelineValue}
                  />
                  <TimelineMetric
                    icon={ClockIcon}
                    label={dict.contracts.deliveryTime}
                    value={deliveryTimelineValue}
                  />
                  <TimelineMetric
                    icon={ClockIcon}
                    label={dict.contracts.expectedCompletionTime}
                    value={pendingTimelineValue}
                  />
                </div>

                {showsAcceptanceDate && (
                  <div className={cn("grid gap-3 md:grid-cols-2")}>
                    {isCompleted && (
                      <TimelineMetric
                        icon={CalendarIcon}
                        label={dict.contracts.completedAt}
                        value={formatContractDate(contract.updatedAt)}
                      />
                    )}
                    <TimelineMetric
                      icon={CalendarIcon}
                      label={dict.contracts.acceptedAt}
                      value={formatContractDate(contract.acceptedAt)}
                    />
                  </div>
                )}
              </div>
            </section>

            <ContractFinancialSection contract={contract} />
            <ContractLifecycleHistory contract={contract} />

            {isPending && (
              <ContractSignaturesSection
                customerSignature={customerSignature?.signatureData}
              />
            )}
          </div>
        </div>

        {!isCancelled && <ProviderContractActions contract={contract} />}
      </DialogContent>
    </Dialog>
  );
};
