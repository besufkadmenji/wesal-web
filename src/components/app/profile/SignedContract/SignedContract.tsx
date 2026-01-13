"use client";
import CheckGreenIcon from "@/assets/icons/check.green.svg";
import DownloadIcon from "@/assets/icons/download.svg";
import MapPointIcon from "@/assets/icons/map.point.svg";
import { useContractStore } from "@/components/app/profile/SignedContract/useForm";
import { useSignSignature } from "@/components/app/profile/SignedContract/useSignSignature";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import Image from "next/image";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useEffect, useRef } from "react";
import { FormInput } from "./FormInput";
import { SignatureInput } from "./SignatureInput";
import { downloadPDF } from "@/utils/download.pdf";
export const SignedContract = () => {
  const dict = useDict();
  const lng = useLang();
  const { me } = useMe();
  const contractRef = useRef<HTMLDivElement | null>(null);
  const { saveSignature, busy } = useSignSignature();
  const form = useContractStore((state) => state.form);
  const setServiceProviderSignature = useContractStore(
    (state) => state.setServiceProviderSignature,
  );
  const setPlatformManagerSignature = useContractStore(
    (state) => state.setPlatformManagerSignature,
  );
  const [showMap, setShowMap] = useQueryState(
    "showMap",
    parseAsBoolean.withDefault(false),
  );
  useEffect(() => {
    return () => {};
  }, []);

  return (
    me && (
      <div className="grid grid-cols-1 gap-10">
        <div className="grid grid-cols-1 gap-6" ref={contractRef}>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={dict.contract.serviceProviderName}
              value={me.name || ""}
            />
            <FormInput
              label={dict.contract.commercialName}
              value={me.commercialName || ""}
            />
            <FormInput
              label={dict.contract.phoneNumber}
              value={`${me.dialCode}${me.phone}` || ""}
            />
            <FormInput
              label={dict.contract.category}
              value={
                me.categories
                  ?.map((cat) => (lng === "en" ? cat.nameEn : cat.nameAr))
                  .join(", ") || ""
              }
            />
          </div>
          <div className="grid grid-cols-1 items-start gap-x-4 gap-y-6 rounded-[16px] border border-[#F2F2F2] bg-[#FBFBFB] p-4">
            <FormInput
              label={dict.profile.commercialRecordNumber}
              value={me.commercialRegistrationNumber || ""}
              className="h-max rounded-none border-none p-0"
            />
            <div className="relative h-47.5 w-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_DATA}/files/${me.commercialRegistrationFilename}`}
                alt="Commercial Record"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <FormInput label={dict.contract.address} value={me.address || ""} />
            <Button
              className="h-full rounded-[20px] bg-[#EFF1F6] px-6!"
              variant={"ghost"}
              onClick={() => {
                setShowMap(showMap === true ? null : true);
              }}
            >
              <MapPointIcon className="size-5" />
              {dict.contract.locationOnMap}
            </Button>
          </div>
          <FormInput
            label={dict.contract.platformManagerName}
            value={me.name || ""}
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-[16px] border border-[#F2F2F2] bg-[#FBFBFB] p-4">
            <SignatureInput
              initUrl={me.signedContract?.serviceProviderSignature || null}
              file={form.serviceProviderSignature}
              onChange={(f) => {
                setServiceProviderSignature(f);
              }}
              label={dict.contract.serviceProviderSignature}
              isRequired
            />
            <SignatureInput
              initUrl={me.signedContract?.platformManagerSignature || null}
              file={form.platformManagerSignature}
              onChange={(f) => {
                setPlatformManagerSignature(f);
              }}
              label={dict.contract.platformManagerSignature}
            />
            <p className="col-span-2 text-xs leading-5 text-[#999999]">
              {dict.contract.signatureAllowedOnce}
            </p>
          </div>
          {me.withAbsher && <AbsherVerified />}
          <div className="grid grid-cols-1 rounded-[16px] border border-[#F2F2F2] bg-[#FBFBFB] p-4">
            <h3 className="leading-8 font-medium text-black">
              {dict.contract.commitmentText}
            </h3>
            <p className="text-gray leading-7">
              {dict.contract.commitmentDescription}
            </p>
          </div>
        </div>

        {me.signedContract ? (
          <div className="grid grid-cols-2 gap-3 justify-self-center px-27">
            <Button
              className="h-12.5 rounded-[20px] px-24 font-semibold text-[#EFF9F0]"
              onClick={() => {
                downloadPDF(contractRef);
              }}
            >
              <DownloadIcon className="size-5" />
              {dict.contract.exportPDF}
            </Button>
            <Button
              className="h-12.5 rounded-[20px] bg-[#FBEAE9]! px-24 font-semibold text-[#B3251E]!"
              onClick={() => {
              }}
              variant={"ghost"}
            >
              {dict.contract.cancelContract}
            </Button>
          </div>
        ) : (
          <Button
            className="h-12.5 justify-self-center rounded-[20px] px-24 font-semibold text-[#EFF9F0]"
            onClick={() => {
              saveSignature();
            }}
            disabled={busy}
          >
            {dict.contract.saveSignature}
          </Button>
        )}
      </div>
    )
  );
};

const AbsherVerified = () => {
  const dict = useDict();
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-[16px] border border-[#0F9D58] bg-[#E8FDF3] p-4">
      <CheckGreenIcon className="size-7" />
      <div className="grid grid-cols-1 gap-2">
        <h3 className="font-medium text-black">
          {dict.contract.verifiedWithAbsher}
        </h3>
        <p className="text-gray leading-7">
          {dict.contract.verifiedWithAbsherDescription}
        </p>
      </div>
    </div>
  );
};
