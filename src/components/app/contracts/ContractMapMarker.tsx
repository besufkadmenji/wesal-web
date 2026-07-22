"use client";

import MapPointIcon from "@/assets/icons/contracts/map-point.svg";

export const DEFAULT_MAP = { lat: 21.636981, lng: 39.181078, zoom: 11 };

export const ContractMapMarker = ({}: { lat: number; lng: number }) => (
  <MapPointIcon className="size-10 origin-center -translate-y-[80%] ltr:-translate-x-1/2 rtl:translate-x-1/2" />
);
