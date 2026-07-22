"use client";

import BillIcon from "@/assets/icons/contracts/bill.svg";
import ChevronIcon from "@/assets/icons/contracts/chevron.svg";
import DocumentIcon from "@/assets/icons/contracts/document.svg";
import MapPointIcon from "@/assets/icons/contracts/map-point.svg";
import UserIcon from "@/assets/icons/contracts/user.svg";
import { sar } from "@/assets/fonts/sar";
import { ContractFormSection } from "@/components/app/contracts/ContractFormSection";
import {
  ContractMapMarker,
  DEFAULT_MAP,
} from "@/components/app/contracts/ContractMapMarker";
import { formatPhone } from "@/components/app/contracts/formatPhone";
import { TermsCard } from "@/components/app/contracts/TermsCard";
import type { ContractFormState } from "@/components/app/contracts/useContractForm";
import { FormInput } from "@/components/app/profile/SignedContract/FormInput";
import { Button } from "@/components/ui/button";
import GoogleMapReact from "google-map-react";
import { twMerge } from "tailwind-merge";

export const ContractFormStepOne = ({
  form,
}: {
  form: ContractFormState;
}) => {
  const {
    dict,
    conversation,
    documentText,
    commissionPercent,
    minCommission,
    contractNumber,
    client,
    provider,
    showProviderMap,
    setShowProviderMap,
    acceptedBinding,
    setAcceptedBinding,
    acceptedCommitment,
    setAcceptedCommitment,
    acceptedRefund,
    setAcceptedRefund,
    termsReady,
    setStep,
  } = form;

  if (!conversation.data) return null;

  return (
    <>
      <ContractFormSection
        title={dict.contracts.contractInfo}
        icon={DocumentIcon}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <FormInput
            label={dict.contracts.contractNumber}
            value={contractNumber}
          />
          <FormInput
            label={dict.contracts.listingName}
            value={conversation.data.listing.name}
          />
        </div>
      </ContractFormSection>

      <ContractFormSection title={dict.contracts.clientInfo} icon={UserIcon}>
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
          <div className="grid gap-3 md:grid-cols-[1fr_auto] items-center">
            <FormInput
              label={dict.contracts.providerLocation}
              value={provider?.address || "—"}
            />
            <Button
              type="button"
              variant="ghost"
              className="h-[50px] rounded-[20px] bg-[#eff1f6] px-6 text-base font-semibold text-[#262c40]"
              onClick={() => setShowProviderMap((v) => !v)}
            >
              {showProviderMap
                ? dict.contract.hideMap
                : dict.contract.locationOnMap}
              <MapPointIcon className="size-5" />
            </Button>
          </div>
          {showProviderMap && (
            <div className="h-80 overflow-hidden rounded-[16px]">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
                }}
                center={{
                  lat: provider?.latitude ?? DEFAULT_MAP.lat,
                  lng: provider?.longitude ?? DEFAULT_MAP.lng,
                }}
                zoom={DEFAULT_MAP.zoom}
                options={{
                  fullscreenControl: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                  zoomControl: false,
                  disableDefaultUI: true,
                  draggable: false,
                }}
                yesIWantToUseGoogleMapApiInternals
              >
                {provider?.latitude != null && provider?.longitude != null && (
                  <ContractMapMarker
                    lat={provider.latitude}
                    lng={provider.longitude}
                  />
                )}
              </GoogleMapReact>
            </div>
          )}
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
              {documentText || dict.contract.commitmentDescription}
            </p>
          </TermsCard>
          <TermsCard
            title={dict.contracts.clientCommitmentTitle}
            checked={acceptedCommitment}
            onChange={setAcceptedCommitment}
          >
            <div className="flex flex-wrap items-center justify-end gap-1">
              <p className="text-gray text-base leading-[1.7]">
                {dict.contracts.clientCommitmentBody.replace(
                  "{percent}",
                  String(commissionPercent),
                )}
              </p>
              <span className="text-primary flex items-center gap-1 text-base font-medium leading-8">
                <span
                  className={twMerge("text-app-green text-base", sar.className)}
                >
                  A
                </span>
                ({Number(minCommission).toFixed(2)})
              </span>
            </div>
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

      <Button
        type="button"
        className="mx-auto h-[50px] w-[285px] rounded-[20px] px-6 font-semibold text-[#eff9f0]"
        disabled={!termsReady}
        onClick={() => setStep(2)}
      >
        <ChevronIcon className="size-5 ltr:rotate-180" />
        {dict.contracts.next}
      </Button>
    </>
  );
};
