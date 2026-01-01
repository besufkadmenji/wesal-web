/* eslint-disable @typescript-eslint/no-explicit-any */
import MarkerIcon from "@/assets/icons/marker.svg";
import MinusIcon from "@/assets/icons/minus.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import { Button } from "@/components/ui/button";
import GoogleMapReact from "google-map-react";
import { useRef, useState } from "react";
const defaultProps = {
  center: {
    lat: 21.636981,
    lng: 39.181078,
  },
  zoom: 11,
};
export const ContactMap = () => {
  const [mapProps, setMapProps] = useState(defaultProps);
  const mapRef = useRef<any>(null);
  return (
    <div className="relative h-116.75 w-screen bg-black/68">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
        }}
        center={mapProps.center}
        zoom={mapProps.zoom}
        options={{
          fullscreenControl: false, // disables the fullscreen button
          mapTypeControl: false, // optional: removes the map/satellite switch
          streetViewControl: false, // optional
          zoomControl: false, // optional
          disableDefaultUI: true,
          draggable: false,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          mapRef.current = map;
        }}
      ></GoogleMapReact>
      <div className="absolute top-0 left-0 grid h-full w-full items-center justify-items-center bg-black/68">
        <AddressMarker lat={21.636981} lng={39.181078} />
      </div>

      <div className="absolute top-0 z-10 grid h-full auto-rows-max content-center items-center gap-1.25 ltr:right-5 rtl:left-5">
        <Button
          variant={"secondary"}
          className="grid size-8.5! items-center rounded-full"
          onClick={() => {
            const map = mapRef.current;
            if (!map || map.getZoom() >= 17) return;
            map.setZoom(map.getZoom()! + 1);
          }}
        >
          <PlusIcon className="size-4" />
        </Button>
        <Button
          variant={"secondary"}
          className="grid size-8.5! items-center rounded-full"
          onClick={() => {
            const map = mapRef.current;
            if (!map || map.getZoom() <= 10) return;
            map.setZoom(map.getZoom()! - 1);
          }}
        >
          <MinusIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};

const AddressMarker = ({ lat, lng }: { lat: number; lng: number }) => {
  return (
    <div className="relative z-40">
      <MarkerIcon className="w-11.5" />

      <p className="mt-1.5 text-xl font-medium text-white">العنوان</p>
    </div>
  );
};
