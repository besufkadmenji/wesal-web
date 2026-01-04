import DefaultMarkerIcon from "@/assets/icons/default.marker.svg";
import { useRegisterStore } from "@/components/app/auth/Register/useRegisterStore";
import { useRegisterForm } from "@/hooks/useRegisterForm";
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
  <DefaultMarkerIcon className="size-6 origin-center -translate-x-1/2 -translate-y-[80%]" />
);

export const PickLocation = ({ error }: { error?: string }) => {
  const form = useRegisterStore((state) => state.formData);
  const updateField = useRegisterStore((state) => state.updateField);
  const { showError } = useRegisterForm({
    form,
    updateField,
  });
  const mapRef = useRef<{
    setCenter: (arg: { lat: number; lng: number }) => void;
  } | null>(null);

  const handleMapClick = (args: { lat: number; lng: number }) => {
    updateField("latitude", args.lat);
    updateField("longitude", args.lng);
  };

  return (
    <div className="grid grid-cols-1 gap-1">
      <div className="grid h-40 grid-cols-1 overflow-hidden rounded-[32px]">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
          }}
          center={defaultProps.center}
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
          onClick={handleMapClick}
        >
          {form.latitude && form.longitude && (
            <Marker lat={form.latitude} lng={form.longitude} />
          )}
        </GoogleMapReact>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
