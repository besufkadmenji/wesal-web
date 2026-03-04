import ExitScreenIcon from "@/assets/icons/auth/exit.full.screen.svg";
import FullScreenIcon from "@/assets/icons/auth/full.screen.svg";
import MinusIcon from "@/assets/icons/auth/minus.svg";
import PlusIcon from "@/assets/icons/auth/plus.svg";
import {
  default as DefaultMarkerIcon,
  default as MapPointIcon,
} from "@/assets/icons/auth/selected.location.svg";
import SearchIcon from "@/assets/icons/search.svg";
import { useDict } from "@/hooks/useDict";
import GoogleMapReact from "google-map-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const DEFAULT_CENTER = { lat: 21.636981, lng: 39.181078 };
const DEFAULT_ZOOM = 11;

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
  const dict = useDict();
  const [isFullScreen, setIsFullScreen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapsRef = useRef<any>(null);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState("");
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const reverseGeocode = useCallback((lat: number, lng: number) => {
    if (!mapsRef.current) return;
    const geocoder = new mapsRef.current.Geocoder();
    geocoder.geocode(
      { location: { lat, lng } },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (results: any[], status: string) => {
        if (status === "OK" && results?.[0]) {
          setAddress(results[0].formatted_address);
        }
      },
    );
  }, []);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    if (!value.trim() || !mapsRef.current?.places) {
      setPredictions([]);
      setShowDropdown(false);
      return;
    }
    const service = new mapsRef.current.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: value,
        types: ["geocode", "establishment"],
        componentRestrictions: { country: "sa" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (results: any[], status: string) => {
        if (status === "OK" && results) {
          setPredictions(results);
          setShowDropdown(true);
        } else {
          setPredictions([]);
          setShowDropdown(false);
        }
      },
    );
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectPrediction = useCallback((prediction: any) => {
    if (!mapsRef.current?.places) return;
    const placesDiv = document.createElement("div");
    const service = new mapsRef.current.places.PlacesService(placesDiv);
    service.getDetails(
      {
        placeId: prediction.place_id,
        fields: ["geometry", "formatted_address"],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (place: any, status: string) => {
        if (status === "OK" && place?.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          onChangeRef.current(lat, lng);
          mapRef.current?.setCenter({ lat, lng });
          mapRef.current?.setZoom(15);
          if (place.formatted_address) {
            setAddress(place.formatted_address);
          }
        }
      },
    );
    setQuery(prediction.description);
    setPredictions([]);
    setShowDropdown(false);
  }, []);

  const setupAutocomplete = useCallback(() => {}, []);

  useEffect(() => {
    if (latitude && longitude && mapsRef.current) {
      reverseGeocode(latitude, longitude);
    }
  }, [latitude, longitude, reverseGeocode]);

  const handleZoomIn = () => {
    if (!mapRef.current) return;
    const zoom = mapRef.current.getZoom() ?? DEFAULT_ZOOM;
    mapRef.current.setZoom(zoom + 1);
  };

  const handleZoomOut = () => {
    if (!mapRef.current) return;
    const zoom = mapRef.current.getZoom() ?? DEFAULT_ZOOM;
    mapRef.current.setZoom(zoom - 1);
  };

  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const handleFullScreen = () => {
    const el = mapContainerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-1">
      <div
        ref={mapContainerRef}
        className={twMerge(
          "border-border relative overflow-hidden rounded-[32px] border",
          isFullScreen && "overflow-visible rounded-none",
        )}
      >
        {/* Map */}
        <div className={twMerge("h-84", isFullScreen && "h-screen")}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
              libraries: ["places"],
            }}
            center={
              latitude && longitude
                ? { lat: latitude, lng: longitude }
                : DEFAULT_CENTER
            }
            zoom={DEFAULT_ZOOM}
            options={{
              fullscreenControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              zoomControl: false,
              disableDefaultUI: true,
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
              mapRef.current = map;
              mapsRef.current = maps;
              setupAutocomplete();
              if (latitude && longitude) {
                reverseGeocode(latitude, longitude);
              }
            }}
            onClick={(args) => onChange(args.lat, args.lng)}
          >
            {latitude && longitude && <Marker lat={latitude} lng={longitude} />}
          </GoogleMapReact>
        </div>

        {/* Search Input */}
        <div className="absolute top-2.5 left-1/2 z-30 w-[calc(100%-20px)] -translate-x-1/2">
          <div className="border-border flex h-12 items-center gap-2 rounded-[20px] border bg-white px-4">
            <SearchIcon className="size-4 shrink-0 text-[#666]" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              onFocus={() => predictions.length > 0 && setShowDropdown(true)}
              placeholder={dict.common.searchPlaces}
              className="min-w-0 flex-1 bg-transparent text-sm leading-[1.7] text-[#666] outline-none placeholder:text-[#666] rtl:placeholder:text-right"
            />
          </div>
          {showDropdown && predictions.length > 0 && (
            <ul className="mt-1 max-h-60 overflow-y-auto rounded-[16px] border border-gray-100 bg-white shadow-lg">
              {predictions.map((p) => (
                <li
                  key={p.place_id}
                  onMouseDown={() => handleSelectPrediction(p)}
                  className="cursor-pointer px-4 py-1.5 text-sm text-[#22283a] hover:bg-gray-50"
                >
                  <span className="font-medium">
                    {p.structured_formatting?.main_text}
                  </span>
                  {p.structured_formatting?.secondary_text && (
                    <span className="ml-1 text-xs text-[#666]">
                      {p.structured_formatting.secondary_text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-20 left-1.5 z-10 grid grid-cols-1 gap-0.5">
          <button
            type="button"
            onClick={handleZoomIn}
            className="flex size-7.75 items-center justify-center rounded-tl-lg rounded-tr-lg bg-white shadow-sm"
          >
            <PlusIcon className="w-3" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="flex size-7.75 items-center justify-center rounded-br-lg rounded-bl-lg bg-white shadow-sm"
          >
            <MinusIcon className="w-2" />
          </button>
        </div>

        {/* Full Screen Button */}
        <div className="absolute right-2.5 bottom-20 z-10">
          <button
            type="button"
            onClick={handleFullScreen}
            className="flex size-7.75 items-center justify-center rounded-lg bg-white shadow-sm"
          >
            {isFullScreen ? (
              <ExitScreenIcon className="text-primary size-4" />
            ) : (
              <FullScreenIcon className="size-4" />
            )}
          </button>
        </div>

        {/* Location Info Bar */}
        <div className="absolute right-0 bottom-0 left-0 z-10 flex items-center gap-2 rounded-b-3xl bg-white px-4 py-4 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.25)]">
          <div className="flex shrink-0 items-center rounded-lg bg-[#f7f7f7] p-2">
            <MapPointIcon className="h-6" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="text-xs leading-[1.7] font-medium text-[#666]">
              {dict.common.address}
            </p>
            <p className="truncate text-xs leading-[1.7] text-[#22283a]">
              {address ||
                (latitude && longitude ? "..." : dict.common.chooseLocation)}
            </p>
          </div>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
