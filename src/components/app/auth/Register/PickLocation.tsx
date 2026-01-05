import DefaultMarkerIcon from "@/assets/icons/user.marker.svg";
import GoogleMapReact from "google-map-react";
import { useRef } from "react";

const defaultProps = {
  center: {
    lat: 21.636981,
    lng: 39.181078,
  },
  zoom: 11,
};

const Marker = ({}: { lat: number; lng: number }) => (
  <DefaultMarkerIcon className="size-16 origin-center -translate-y-[80%] ltr:-translate-x-1/2 rtl:translate-x-1/2" />
);

export const PickLocation = ({
  error,
  latitude,
  longitude,
  onChange,
}: {
  error?: string;
  latitude?: number;
  longitude?: number;
  onChange: (lat: number, lng: number) => void;
}) => {
  const mapRef = useRef<{
    setCenter: (arg: { lat: number; lng: number }) => void;
  } | null>(null);
  return (
    <div className="grid grid-cols-1 gap-1">
      <div className="grid h-47.5 grid-cols-1 overflow-hidden rounded-[32px]">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
          }}
          center={
            latitude && longitude
              ? { lat: latitude, lng: longitude }
              : defaultProps.center
          }
          zoom={defaultProps.zoom}
          options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            disableDefaultUI: true,
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onClick={(args) => onChange(args.lat, args.lng)}
        >
          {latitude && longitude && <Marker lat={latitude} lng={longitude} />}
        </GoogleMapReact>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
