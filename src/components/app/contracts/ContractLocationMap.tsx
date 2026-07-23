"use client";

import {
  ContractMapMarker,
  DEFAULT_MAP,
} from "@/components/app/contracts/ContractMapMarker";
import GoogleMapReact from "google-map-react";

export const ContractLocationMap = ({
  lat,
  lng,
}: {
  lat?: number | null;
  lng?: number | null;
}) => (
  <div className="h-80 overflow-hidden rounded-[16px]">
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
      }}
      center={{
        lat: lat ?? DEFAULT_MAP.lat,
        lng: lng ?? DEFAULT_MAP.lng,
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
      {lat != null && lng != null && <ContractMapMarker lat={lat} lng={lng} />}
    </GoogleMapReact>
  </div>
);
