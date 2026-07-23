"use client";

import AgreementIcon from "@/assets/icons/contracts/agreement.svg";
import BillIcon from "@/assets/icons/contracts/bill.svg";
import DocumentIcon from "@/assets/icons/contracts/document.svg";
import MapPointIcon from "@/assets/icons/contracts/map-point.svg";
import UserIcon from "@/assets/icons/contracts/user.svg";
import { ContractFormSection } from "@/components/app/contracts/ContractFormSection";
import { ContractLocationMap } from "@/components/app/contracts/ContractLocationMap";
import { ContractMoneyField } from "@/components/app/contracts/ContractMoneyField";
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
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { forwardRef, useState } from "react";

export const ContractDocumentView = forwardRef<
  HTMLDivElement,
  { contract: Contract }
>(function ContractDocumentView({ contract }, ref) {
  const dict = useDict();
  const lang = useLang();
  const { me } = useMe();
  const [showClientMap, setShowClientMap] = useState(false);
  const [showProviderMap, setShowProviderMap] = useState(false);

  const client = contract.client;
  const provider = contract.provider ?? me?.provider;
  const customerSignature = contract.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.CustomerAcceptance,
  )?.signatureData;
  const customerCompletionSignature = contract.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.CustomerCompletion,
  )?.signatureData;
  const providerSignature = contract.signatures.find(
    (entry) => entry.signatureType === ContractSignatureType.ProviderAcceptance,
  )?.signatureData;
  const deliveryCompanyName =
    lang === "ar"
      ? contract.deliveryCompanyNameAr || contract.deliveryCompanyNameEn
      : contract.deliveryCompanyNameEn || contract.deliveryCompanyNameAr;
  const clientLat = contract.customerLatitude ?? client?.latitude;
  const clientLng = contract.customerLongitude ?? client?.longitude;
  const providerLat = contract.providerLatitude ?? provider?.latitude;
  const providerLng = contract.providerLongitude ?? provider?.longitude;

  return (
    <div ref={ref} className="mx-auto grid w-full max-w-[1232px] gap-6">
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
              data-pdf-exclude=""
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
            <div data-pdf-exclude="">
              <ContractLocationMap lat={clientLat} lng={clientLng} />
            </div>
          )}
        </div>
      </ContractFormSection>

      <ContractFormSection title={dict.contracts.providerInfo} icon={UserIcon}>
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
              data-pdf-exclude=""
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
            <div data-pdf-exclude="">
              <ContractLocationMap lat={providerLat} lng={providerLng} />
            </div>
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
        <div className="grid gap-8 md:grid-cols-2">
          <SignatureInput
            label={dict.contracts.providerAcceptanceSignature}
            initUrl={providerSignature}
            file={null}
            disabled
          />
          <SignatureInput
            label={dict.contracts.providerCompletionSignature}
            initUrl={null}
            file={null}
            disabled
          />
        </div>
      </ContractFormSection>

      <ContractFormSection title={dict.contracts.termsTitle} icon={BillIcon}>
        <div className="grid gap-6">
          <TermsCard title={dict.contracts.bindingContractTitle} readOnly>
            <p className="text-gray text-base leading-[1.7]">
              {contract.contractDocumentText ||
                dict.contract.commitmentDescription}
            </p>
          </TermsCard>
          <TermsCard title={dict.contracts.clientCommitmentTitle} readOnly>
            <p className="text-gray text-base leading-[1.7]">
              {dict.contracts.clientCommitmentBody.replace(
                "{percent}",
                String(contract.commissionPercent),
              )}
            </p>
          </TermsCard>
          <TermsCard title={dict.contracts.refundTitle} readOnly>
            <p className="text-gray text-base leading-[1.7]">
              {dict.contracts.refundBody}
            </p>
          </TermsCard>
        </div>
      </ContractFormSection>
    </div>
  );
});
