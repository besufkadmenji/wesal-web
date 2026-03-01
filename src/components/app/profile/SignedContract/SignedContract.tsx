"use client";
import CheckGreenIcon from "@/assets/icons/check.green.svg";
import DefaultMarkerIcon from "@/assets/icons/user.marker.svg";
import DownloadIcon from "@/assets/icons/download.svg";
import MapPointIcon from "@/assets/icons/map.point.svg";
import GoogleMapReact from "google-map-react";
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
import { CancelContract } from "@/components/app/profile/SignedContract/CancelContact";
import { useSetting } from "@/hooks/useSettings";

const defaultProps = {
  center: { lat: 21.636981, lng: 39.181078 },
  zoom: 14,
};

const Marker = ({}: { lat: number; lng: number }) => (
  <DefaultMarkerIcon className="size-16 origin-center -translate-y-[80%] ltr:-translate-x-1/2 rtl:translate-x-1/2" />
);

export const SignedContract = () => {
  const dict = useDict();
  const lng = useLang();
  const { me } = useMe();
  const { setting } = useSetting();
  const contractRef = useRef<HTMLDivElement | null>(null);
  const { saveSignature, getRules, busy } = useSignSignature();
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
    me?.provider && (
      <div className="grid grid-cols-1 gap-10">
        <div className="grid grid-cols-1 gap-6" ref={contractRef}>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label={dict.contract.serviceProviderName}
              value={me.provider.name || ""}
            />
            <FormInput
              label={dict.contract.commercialName}
              value={me.provider.commercialName || ""}
            />
            <FormInput
              label={dict.contract.phoneNumber}
              value={`${me.provider.dialCode}${me.provider.phone}` || ""}
            />
            <FormInput
              label={dict.contract.category}
              value={
                me.provider.categories
                  ?.map((cat) => (lng === "en" ? cat.nameEn : cat.nameAr))
                  .join(", ") || ""
              }
            />
          </div>
          <div className="grid grid-cols-1 items-start gap-x-4 gap-y-6 rounded-[16px] border border-[#F2F2F2] bg-[#FBFBFB] p-4">
            <FormInput
              label={dict.profile.commercialRecordNumber}
              value={me.provider.commercialRegistrationNumber || ""}
              className="h-max rounded-none border-none p-0"
            />
            <div className="relative h-47.5 w-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_DATA}/files/${me.provider.commercialRegistrationFilename}`}
                alt="Commercial Record"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <FormInput
              label={dict.contract.address}
              value={me.provider.address || ""}
            />
            <Button
              data-html2canvas-ignore
              className="h-full rounded-[20px] bg-[#EFF1F6] px-6!"
              variant={"ghost"}
              onClick={() => {
                setShowMap(showMap === true ? null : true);
              }}
            >
              <MapPointIcon className="size-5" />
              {showMap ? dict.contract.hideMap : dict.contract.locationOnMap}
            </Button>
          </div>
          {showMap && (
            <div
              data-html2canvas-ignore
              className="grid h-80 grid-cols-1 overflow-hidden rounded-[16px]"
            >
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
                }}
                center={{
                  lat: me.provider.latitude ?? defaultProps.center.lat,
                  lng: me.provider.longitude ?? defaultProps.center.lng,
                }}
                zoom={defaultProps.zoom}
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
                {me.provider.latitude && me.provider.longitude && (
                  <Marker
                    lat={me.provider.latitude}
                    lng={me.provider.longitude}
                  />
                )}
              </GoogleMapReact>
            </div>
          )}
          <FormInput
            label={dict.contract.platformManagerName}
            value={me.provider.name || ""}
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-[16px] border border-[#F2F2F2] bg-[#FBFBFB] p-4">
            <SignatureInput
              initUrl={
                me.provider.signedContract?.serviceProviderSignature || null
              }
              file={form.serviceProviderSignature}
              onChange={(f) => {
                setServiceProviderSignature(f);
              }}
              label={dict.contract.serviceProviderSignature}
              isRequired
            />
            <SignatureInput
              initUrl={
                me.provider.signedContract?.platformManagerSignature || null
              }
              file={null}
              onChange={(f) => {
                setPlatformManagerSignature(f);
              }}
              label={dict.contract.platformManagerSignature}
              disabled
            />
            <p className="col-span-2 text-xs leading-5 text-[#999999]">
              {dict.contract.signatureAllowedOnce}
            </p>
          </div>
          {me.provider.withAbsher && <AbsherVerified />}
          <div className="grid grid-cols-1 rounded-[16px] border border-[#F2F2F2] bg-[#FBFBFB] p-4">
            <h3 className="leading-8 font-medium text-black">
              {dict.contract.commitmentText}
            </h3>
            <div className="grid grid-cols-1">
              {getRules()?.map((rule, index) =>
                rule.label === "general" ? (
                  <p
                    key={index}
                    className="text-gray leading-7 whitespace-pre-line"
                  >
                    {rule.value}
                  </p>
                ) : (
                  <div key={index} className="mt-4 grid grid-cols-1 gap-1">
                    <h4 className="text-sm font-medium text-black">
                      {rule.label}
                    </h4>
                    <p className="text-gray leading-7 whitespace-pre-line">
                      {rule.value}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {me.provider.signedContract ? (
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
            <CancelContract>
              <Button
                className="h-12.5 rounded-[20px] bg-[#FBEAE9]! px-24 font-semibold text-[#B3251E]!"
                onClick={() => {}}
                variant={"ghost"}
              >
                {dict.contract.cancelContract}
              </Button>
            </CancelContract>
          </div>
        ) : (
          <Button
            className="h-12.5 justify-self-center rounded-[20px] px-24 font-semibold text-[#EFF9F0]"
            onClick={() => {
              saveSignature();
            }}
            disabled={busy}
          >
            {dict.contract.signContract}
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
