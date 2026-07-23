"use client";

import AgreementIcon from "@/assets/icons/contracts/agreement.svg";
import BillIcon from "@/assets/icons/contracts/bill.svg";
import DocumentIcon from "@/assets/icons/contracts/document.svg";
import MapPointIcon from "@/assets/icons/contracts/map-point.svg";
import UserIcon from "@/assets/icons/contracts/user.svg";
import { ContractAcceptanceDialog } from "@/components/app/contracts/ContractAcceptanceDialog";
import { ContractFormSection } from "@/components/app/contracts/ContractFormSection";
import { ContractHero } from "@/components/app/contracts/ContractHero";
import { ContractLocationMap } from "@/components/app/contracts/ContractLocationMap";
import { ContractMoneyField } from "@/components/app/contracts/ContractMoneyField";
import { ContractRejectionDialog } from "@/components/app/contracts/ContractRejectionDialog";
import { formatContractReference } from "@/components/app/contracts/formatContract";
import { formatPhone } from "@/components/app/contracts/formatPhone";
import { TermsCard } from "@/components/app/contracts/TermsCard";
import { FormInput } from "@/components/app/profile/SignedContract/FormInput";
import { SignatureInput } from "@/components/app/profile/SignedContract/SignatureInput";
import { Button } from "@/components/ui/button";
import {
  ContractSignatureType,
  type Contract,
} from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import { useAppRouter } from "@/hooks/use.app.router";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { ContractService } from "@/services/contract.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const ProviderContractAcceptPage = ({
  contract,
}: {
  contract: Contract;
}) => {
  const dict = useDict();
  const lang = useLang();
  const router = useAppRouter();
  const { me } = useMe();
  const queryClient = useQueryClient();
  const [showClientMap, setShowClientMap] = useState(false);
  const [showProviderMap, setShowProviderMap] = useState(false);
  const [acceptedBinding, setAcceptedBinding] = useState(false);
  const [acceptedCommitment, setAcceptedCommitment] = useState(false);
  const [acceptedRefund, setAcceptedRefund] = useState(false);
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState("");

  const client = contract.client;
  const provider = contract.provider ?? me?.provider;
  const providerSignature =
    me?.provider?.signedContract?.serviceProviderSignature || null;
  const customerSignature = contract.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.CustomerAcceptance,
  )?.signatureData;
  const customerCompletionSignature = contract.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.CustomerCompletion,
  )?.signatureData;
  const deliveryCompanyName =
    lang === "ar"
      ? contract.deliveryCompanyNameAr || contract.deliveryCompanyNameEn
      : contract.deliveryCompanyNameEn || contract.deliveryCompanyNameAr;
  const termsReady = acceptedBinding && acceptedCommitment && acceptedRefund;
  const canAccept = termsReady && Boolean(providerSignature);

  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({
        queryKey: queryKeys.contract(contract.id),
      }),
      queryClient.invalidateQueries({ queryKey: queryKeys.contracts }),
      queryClient.invalidateQueries({
        queryKey: queryKeys.conversation(contract.conversationId),
      }),
    ]);

  const accept = useMutation({
    mutationFn: (deliveryTimeDays: number) => {
      if (!providerSignature) {
        throw new Error(dict.contracts.providerAcceptanceSignature);
      }
      return ContractService.accept({
        contractId: contract.id,
        signatureData: providerSignature,
        deliveryTimeDays,
      });
    },
    onSuccess: async () => {
      await refresh();
      setAcceptOpen(false);
      showSuccessMessage(dict.contracts.accepted);
      router.push("/contracts");
    },
    onError: (error) => showErrorMessage(error.message),
  });

  const reject = useMutation({
    mutationFn: () => {
      const rejectionReason = reason.trim();
      if (!rejectionReason) {
        throw new Error(dict.contracts.rejectionReason);
      }
      return ContractService.reject({
        contractId: contract.id,
        reason: rejectionReason,
      });
    },
    onSuccess: async () => {
      await refresh();
      setReason("");
      setRejectOpen(false);
      router.push("/contracts");
    },
    onError: (error) => showErrorMessage(error.message),
  });

  const isLocked = accept.isPending || reject.isPending;
  const clientLat = contract.customerLatitude ?? client?.latitude;
  const clientLng = contract.customerLongitude ?? client?.longitude;
  const providerLat = contract.providerLatitude ?? provider?.latitude;
  const providerLng = contract.providerLongitude ?? provider?.longitude;

  return (
    <>
      <ContractHero
        title={dict.contracts.acceptTitle}
        breadcrumbHref="/"
        breadcrumbLabel={dict.home.nav.home}
      />
      <div className="mx-auto grid max-w-[1232px] gap-6 px-4 py-12 md:px-8 xl:px-[7vw] xl:py-20">
        <ContractFormSection
          title={dict.contracts.contractInfo}
          icon={DocumentIcon}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <FormInput
              label={dict.contracts.contractNumber}
              value={formatContractReference(contract)}
            />
            <FormInput
              label={dict.contracts.listingName}
              value={contract.conversation.listing.name}
            />
          </div>
        </ContractFormSection>

        <ContractFormSection title={dict.contracts.clientInfo} icon={UserIcon}>
          <div className="grid gap-5">
            <div className="grid gap-3 md:grid-cols-2">
              <FormInput
                label={dict.contracts.clientName}
                value={client?.name || "—"}
              />
              <FormInput
                label={dict.contracts.clientPhone}
                value={formatPhone(client?.dialCode, client?.phone)}
              />
            </div>
            <div className="grid items-center gap-3 md:grid-cols-[1fr_auto]">
              <FormInput
                label={dict.contracts.clientLocation}
                value={contract.customerAddress || client?.address || "—"}
              />
              <Button
                type="button"
                variant="ghost"
                className="h-[50px] rounded-[20px] bg-[#eff1f6] px-6 text-base font-semibold text-[#262c40]"
                onClick={() => setShowClientMap((value) => !value)}
              >
                {showClientMap
                  ? dict.contract.hideMap
                  : dict.contract.locationOnMap}
                <MapPointIcon className="size-5" />
              </Button>
            </div>
            {showClientMap && (
              <ContractLocationMap lat={clientLat} lng={clientLng} />
            )}
          </div>
        </ContractFormSection>

        <ContractFormSection
          title={dict.contracts.providerInfo}
          icon={UserIcon}
        >
          <div className="grid gap-5">
            <div className="grid gap-3 md:grid-cols-2">
              <FormInput
                label={dict.contracts.commercialName}
                value={provider?.commercialName || provider?.name || "—"}
              />
              <FormInput
                label={dict.contracts.providerPhone}
                value={formatPhone(provider?.dialCode, provider?.phone)}
              />
            </div>
            <div className="grid items-center gap-3 md:grid-cols-[1fr_auto]">
              <FormInput
                label={dict.contracts.providerLocation}
                value={contract.providerAddress || provider?.address || "—"}
              />
              <Button
                type="button"
                variant="ghost"
                className="h-[50px] rounded-[20px] bg-[#eff1f6] px-6 text-base font-semibold text-[#262c40]"
                onClick={() => setShowProviderMap((value) => !value)}
              >
                {showProviderMap
                  ? dict.contract.hideMap
                  : dict.contract.locationOnMap}
                <MapPointIcon className="size-5" />
              </Button>
            </div>
            {showProviderMap && (
              <ContractLocationMap lat={providerLat} lng={providerLng} />
            )}
          </div>
        </ContractFormSection>

        <ContractFormSection
          title={dict.contracts.financialDetails}
          icon={BillIcon}
        >
          <div className="grid gap-3 md:grid-cols-3">
            <FormInput
              label={dict.contracts.depositPercent}
              value={`${contract.depositPercent}%`}
            />
            <ContractMoneyField
              label={dict.contracts.agreedPrice}
              value={contract.agreedPrice}
            />
            <ContractMoneyField
              label={dict.contracts.depositValue}
              value={contract.downPayment}
            />
            <FormInput
              label={dict.contracts.deliveryCompany}
              value={deliveryCompanyName || "—"}
            />
            <ContractMoneyField
              label={dict.contracts.vat}
              value={contract.vatAmount}
            />
            <ContractMoneyField
              label={dict.contracts.totalAfterTax}
              value={contract.totalPayable}
            />
          </div>
        </ContractFormSection>

        <ContractFormSection
          title={dict.contracts.signatures}
          icon={AgreementIcon}
        >
          <div className="grid gap-8 md:grid-cols-2">
            <SignatureInput
              label={dict.contracts.signature}
              initUrl={customerSignature}
              file={null}
              disabled
            />
            <SignatureInput
              label={dict.contracts.completionSignature}
              initUrl={customerCompletionSignature}
              file={null}
              disabled
            />
          </div>
        </ContractFormSection>

        <ContractFormSection
          title={dict.contracts.providerSignatures}
          icon={AgreementIcon}
        >
          <div className="grid max-w-[586px] gap-2 justify-self-end">
            <SignatureInput
              label={dict.contracts.providerAcceptanceSignature}
              isRequired
              initUrl={providerSignature}
              file={null}
              disabled
            />
            <p className="text-xs leading-[1.7] text-[#999]">
              {dict.contracts.signatureOnce}
            </p>
          </div>
        </ContractFormSection>

        <ContractFormSection title={dict.contracts.termsTitle} icon={BillIcon}>
          <div className="grid gap-6">
            <TermsCard
              title={dict.contracts.bindingContractTitle}
              checked={acceptedBinding}
              onChange={setAcceptedBinding}
            >
              <p className="text-gray text-base leading-[1.7]">
                {contract.contractDocumentText ||
                  dict.contract.commitmentDescription}
              </p>
            </TermsCard>
            <TermsCard
              title={dict.contracts.clientCommitmentTitle}
              checked={acceptedCommitment}
              onChange={setAcceptedCommitment}
            >
              <p className="text-gray text-base leading-[1.7]">
                {dict.contracts.clientCommitmentBody.replace(
                  "{percent}",
                  String(contract.commissionPercent),
                )}
              </p>
            </TermsCard>
            <TermsCard
              title={dict.contracts.refundTitle}
              checked={acceptedRefund}
              onChange={setAcceptedRefund}
            >
              <p className="text-gray text-base leading-[1.7]">
                {dict.contracts.refundBody}
              </p>
            </TermsCard>
          </div>
        </ContractFormSection>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            className="h-[50px] w-full rounded-[20px] px-6 text-base font-semibold text-[#eff9f0] sm:max-w-[285px]"
            disabled={!canAccept || isLocked}
            onClick={() => setAcceptOpen(true)}
          >
            {dict.contracts.accept}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-[50px] w-full rounded-[20px] bg-[#fbeae9] px-6 text-base font-semibold text-[#b3251e] hover:bg-[#f7d9d7] sm:max-w-[285px]"
            disabled={isLocked}
            onClick={() => setRejectOpen(true)}
          >
            {dict.contracts.reject}
          </Button>
        </div>
      </div>

      <ContractAcceptanceDialog
        open={acceptOpen}
        onOpenChange={setAcceptOpen}
        maxCompletionDays={contract.maxCompletionDays}
        isPending={accept.isPending}
        onConfirm={(deliveryTimeDays) => accept.mutate(deliveryTimeDays)}
      />
      <ContractRejectionDialog
        open={rejectOpen}
        reason={reason}
        isPending={reject.isPending}
        isLocked={isLocked}
        onOpenChange={(open) => {
          if (!isLocked) setRejectOpen(open);
        }}
        onReasonChange={setReason}
        onSubmit={() => reject.mutate()}
      />
    </>
  );
};
