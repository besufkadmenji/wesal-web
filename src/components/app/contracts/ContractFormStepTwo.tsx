"use client";

import AgreementIcon from "@/assets/icons/contracts/agreement.svg";
import ChevronIcon from "@/assets/icons/contracts/chevron.svg";
import PenIcon from "@/assets/icons/contracts/pen.svg";
import PlusIcon from "@/assets/icons/contracts/plus.svg";
import SelectChevronIcon from "@/assets/icons/contracts/select-chevron.svg";
import { PickLocation } from "@/components/app/auth/Register/PickLocation";
import { ContractFormSection } from "@/components/app/contracts/ContractFormSection";
import { QuoteSummary } from "@/components/app/contracts/QuoteSummary";
import type { ContractFormState } from "@/components/app/contracts/useContractForm";
import { SignatureInput } from "@/components/app/profile/SignedContract/SignatureInput";
import { LoadingList } from "@/components/app/shared/ParticipantUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/hooks/useLang";

export const ContractFormStepTwo = ({ form }: { form: ContractFormState }) => {
  const lang = useLang();
  const {
    dict,
    companies,
    quote,
    mutation,
    agreedPrice,
    setAgreedPrice,
    address,
    setAddress,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    deliveryCompanyId,
    setDeliveryCompanyId,
    signature,
    setSignature,
    signatureSaved,
    setSignatureSaved,
    customerSignature,
    step2Valid,
    setStep,
  } = form;

  return (
    <>
      <ContractFormSection title={dict.contracts.clientData} icon={PenIcon}>
        <div className="grid gap-5">
          <PickLocation
            latitude={latitude}
            longitude={longitude}
            address={address}
            onAddressChange={(value, source) => {
              setAddress(value);
              if (source === "input") {
                setLatitude(undefined);
                setLongitude(undefined);
              }
            }}
            searchPlacement="above"
            searchPlaceholder={dict.contracts.clientLocation}
            showLocationInfo={false}
            mapClassName="h-[213px]"
            onChange={(lat, lng) => {
              setLatitude(lat);
              setLongitude(lng);
            }}
          />
          <div className="grid items-center gap-3 md:grid-cols-[1fr_1fr_auto]">
            <label className="border-border flex h-14 items-center rounded-[20px] border px-4">
              <Input
                type="number"
                min="0.01"
                step="0.01"
                value={agreedPrice}
                onChange={(event) => setAgreedPrice(event.target.value)}
                placeholder={`${dict.contracts.agreedPrice} *`}
                className="h-auto border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
              />
            </label>
            <div className="border-border relative flex h-14 items-center rounded-[20px] border px-4">
              <select
                value={deliveryCompanyId}
                onChange={(event) => setDeliveryCompanyId(event.target.value)}
                className="h-full w-full appearance-none bg-transparent text-sm text-[#666] outline-none"
              >
                <option value="">{dict.contracts.deliveryCompany}</option>
                {companies.data?.map((company) => (
                  <option key={company.id} value={company.id}>
                    {lang === "ar" ? company.nameAr : company.nameEn}
                  </option>
                ))}
              </select>
              <SelectChevronIcon className="pointer-events-none absolute size-[18px] text-[#666] ltr:right-4 rtl:left-4" />
            </div>
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              className="flex h-[50px] items-center justify-center rounded-[20px] bg-[#eff1f6] px-6"
            >
              <PlusIcon className="size-5 text-[#22283a]" />
            </button>
          </div>
          {quote.isFetching && <LoadingList rows={1} />}
          {quote.data && <QuoteSummary quote={quote.data} />}
        </div>
      </ContractFormSection>

      <ContractFormSection
        title={dict.contracts.signatures}
        icon={AgreementIcon}
      >
        <div className="grid max-w-[586px] gap-8 justify-self-end">
          <SignatureInput
            label={dict.contracts.signature}
            isRequired
            initUrl={customerSignature}
            file={signature}
            onChange={(file) => {
              setSignature(file);
              setSignatureSaved(false);
            }}
            disabled={Boolean(customerSignature) || signatureSaved}
          />
          <p className="text-xs leading-[1.7] text-[#999]">
            {dict.contract.signatureAllowedOnce}
          </p>
          {!customerSignature && (
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                className="h-[50px] rounded-[20px] px-6 font-semibold text-[#eff9f0]"
                disabled={!signature || signatureSaved}
                onClick={() => setSignatureSaved(true)}
              >
                {dict.contract.saveSignature}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="h-[50px] rounded-[20px] bg-[#eff1f6] px-6 font-semibold text-[#262c40]"
                disabled={!signature && !signatureSaved}
                onClick={() => {
                  setSignature(null);
                  setSignatureSaved(false);
                }}
              >
                {dict.contracts.clearSignature}
              </Button>
            </div>
          )}
        </div>
      </ContractFormSection>

      <div className="flex items-start justify-center gap-3">
        <Button
          type="button"
          variant="ghost"
          className="h-[50px] rounded-[20px] bg-[#eff1f6] px-6"
          onClick={() => setStep(1)}
        >
          <ChevronIcon className="size-5 rtl:rotate-180" />
        </Button>
        <Button
          type="button"
          className="h-[50px] w-[285px] rounded-[20px] px-6 font-semibold text-[#eff9f0]"
          disabled={!step2Valid || mutation.isPending || quote.isFetching}
          onClick={() => mutation.mutate()}
        >
          {dict.contracts.send}
        </Button>
      </div>
    </>
  );
};
