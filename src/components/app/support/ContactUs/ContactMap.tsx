/* eslint-disable @typescript-eslint/no-explicit-any */
import MinusIcon from "@/assets/icons/minus.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import { AppLoading } from "@/components/app/shared/AppLoading";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import GoogleMapReact from "google-map-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AddressMarker } from "./AddressMarker";

const defaultProps = {
  center: {
    lat: 21.636981,
    lng: 39.181078,
  },
  zoom: 11,
};

/** Reveal the map anyway if Google never reports its tiles as loaded. */
const READY_FALLBACK_MS = 8000;

export const ContactMap = () => {
  const dict = useDict();
  const mapRef = useRef<any>(null);
  // ClickUp 869fmm437: Google Maps takes a few seconds; until its tiles are
  // in, the dark overlay sat on nothing and read as a black block. Show a
  // light loading state instead and fade the map in once it's ready.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), READY_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-116.75 w-screen bg-[#eff1f6]">
      <div
        className={twMerge(
          "h-full w-full opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none",
          ready && "opacity-100",
        )}
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
          }}
          center={defaultProps.center}
          zoom={defaultProps.zoom}
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
            maps.event.addListenerOnce(map, "tilesloaded", () =>
              setReady(true),
            );
          }}
        ></GoogleMapReact>
      </div>

      {ready ? (
        <>
          <div className="absolute top-0 left-0 grid h-full w-full items-center justify-items-center bg-black/68">
            <AddressMarker />
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
        </>
      ) : (
        <div
          className="absolute inset-0 grid items-center justify-items-center"
          role="status"
          aria-live="polite"
        >
          <AppLoading />
          <span className="sr-only">{dict.common.loading}</span>
        </div>
      )}
    </div>
  );
};
