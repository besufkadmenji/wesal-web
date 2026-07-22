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

export type LocationAddressSource = "input" | "selection" | "geocode";

interface LocationPrediction {
  place_id: string;
  description: string;
  structured_formatting?: {
    main_text?: string;
    secondary_text?: string;
  };
}

interface GeocodedLocation {
  formatted_address: string;
}

interface PlaceDetails {
  formatted_address?: string;
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
}

const Marker = ({}: { lat: number; lng: number }) => (
  <DefaultMarkerIcon className="size-16 origin-center -translate-y-[80%] ltr:-translate-x-1/2 rtl:translate-x-1/2" />
);

export const PickLocation = ({
  error,
  latitude,
  longitude,
  onChange,
  mapClassName,
  address: controlledAddress,
  onAddressChange,
  searchPlacement = "overlay",
  searchPlaceholder,
  showLocationInfo = true,
}: {
  error?: string;
  latitude?: number;
  longitude?: number;
  onChange: (lat: number, lng: number) => void;
  mapClassName?: string;
  address?: string;
  onAddressChange?: (address: string, source: LocationAddressSource) => void;
  searchPlacement?: "overlay" | "above";
  searchPlaceholder?: string;
  showLocationInfo?: boolean;
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
  const [internalAddress, setInternalAddress] = useState(
    controlledAddress ?? "",
  );
  const [query, setQuery] = useState(
    searchPlacement === "above" ? (controlledAddress ?? "") : "",
  );
  const [predictions, setPredictions] = useState<LocationPrediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const address = controlledAddress ?? internalAddress;
  const visibleQuery =
    searchPlacement === "above" ? (controlledAddress ?? query) : query;

  const updateAddress = useCallback(
    (value: string, source: LocationAddressSource) => {
      setInternalAddress(value);
      onAddressChange?.(value, source);
    },
    [onAddressChange],
  );

  const reverseGeocode = useCallback(
    (lat: number, lng: number) => {
      if (!mapsRef.current) return;
      const geocoder = new mapsRef.current.Geocoder();
      geocoder.geocode(
        { location: { lat, lng } },
        (results: GeocodedLocation[], status: string) => {
          if (status === "OK" && results?.[0]) {
            const nextAddress = results[0].formatted_address;
            updateAddress(nextAddress, "geocode");
            if (searchPlacement === "above") {
              setQuery(nextAddress);
            }
          }
        },
      );
    },
    [searchPlacement, updateAddress],
  );

  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);
      if (searchPlacement === "above") {
        updateAddress(value, "input");
      }
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
        (results: LocationPrediction[], status: string) => {
          if (status === "OK" && results) {
            setPredictions(results);
            setShowDropdown(true);
          } else {
            setPredictions([]);
            setShowDropdown(false);
          }
        },
      );
    },
    [searchPlacement, updateAddress],
  );

  const handleSelectPrediction = useCallback(
    (prediction: LocationPrediction) => {
      if (!mapsRef.current?.places) return;
      setQuery(prediction.description);
      updateAddress(prediction.description, "selection");
      setPredictions([]);
      setShowDropdown(false);

      const placesDiv = document.createElement("div");
      const service = new mapsRef.current.places.PlacesService(placesDiv);
      service.getDetails(
        {
          placeId: prediction.place_id,
          fields: ["geometry", "formatted_address"],
        },
        (place: PlaceDetails, status: string) => {
          if (status === "OK" && place?.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            onChangeRef.current(lat, lng);
            mapRef.current?.setCenter({ lat, lng });
            mapRef.current?.setZoom(15);
            if (place.formatted_address) {
              setQuery(place.formatted_address);
              updateAddress(place.formatted_address, "selection");
            }
          }
        },
      );
    },
    [updateAddress],
  );

  const setupAutocomplete = useCallback(() => {}, []);

  useEffect(() => {
    if (
      latitude != null &&
      longitude != null &&
      mapsRef.current &&
      (searchPlacement === "overlay" || !address.trim())
    ) {
      reverseGeocode(latitude, longitude);
    }
  }, [address, latitude, longitude, reverseGeocode, searchPlacement]);

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

  const searchField = (
    <div
      className={twMerge(
        "relative z-30",
        searchPlacement === "overlay" &&
          "absolute top-2.5 left-1/2 w-[calc(100%-20px)] -translate-x-1/2",
      )}
    >
      <div
        className={twMerge(
          "border-border flex items-center gap-2 rounded-[20px] border bg-white px-4",
          searchPlacement === "above" ? "h-14" : "h-12",
        )}
      >
        {searchPlacement === "overlay" && (
          <SearchIcon className="size-4 shrink-0 text-[#666]" />
        )}
        <input
          ref={searchInputRef}
          type="text"
          value={visibleQuery}
          onChange={(event) => handleQueryChange(event.target.value)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          onFocus={() => predictions.length > 0 && setShowDropdown(true)}
          placeholder={searchPlaceholder ?? dict.common.searchPlaces}
          className="min-w-0 flex-1 bg-transparent text-sm leading-[1.7] text-[#1a1a1a] outline-none placeholder:text-[#666] rtl:placeholder:text-right"
        />
      </div>
      {showDropdown && predictions.length > 0 && (
        <ul className="absolute right-0 left-0 mt-1 max-h-60 overflow-y-auto rounded-[16px] border border-gray-100 bg-white shadow-lg">
          {predictions.map((prediction) => (
            <li
              key={prediction.place_id}
              onMouseDown={() => handleSelectPrediction(prediction)}
              className="cursor-pointer px-4 py-1.5 text-sm text-[#22283a] hover:bg-gray-50"
            >
              <span className="font-medium">
                {prediction.structured_formatting?.main_text}
              </span>
              {prediction.structured_formatting?.secondary_text && (
                <span className="ms-1 text-xs text-[#666]">
                  {prediction.structured_formatting.secondary_text}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div
      className={twMerge(
        "grid grid-cols-1 gap-1",
        searchPlacement === "above" && "gap-5",
      )}
    >
      {searchPlacement === "above" && searchField}
      <div
        ref={mapContainerRef}
        className={twMerge(
          "border-border relative overflow-hidden rounded-[32px] border",
          isFullScreen && "overflow-visible rounded-none",
        )}
      >
        {/* Map */}
        <div
          className={twMerge("h-84", mapClassName, isFullScreen && "h-screen")}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
              libraries: ["places"],
            }}
            center={
              latitude != null && longitude != null
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
              if (
                latitude != null &&
                longitude != null &&
                (searchPlacement === "overlay" || !address.trim())
              ) {
                reverseGeocode(latitude, longitude);
              }
            }}
            onClick={(args) => {
              onChangeRef.current(args.lat, args.lng);
              reverseGeocode(args.lat, args.lng);
            }}
          >
            {latitude != null && longitude != null && (
              <Marker lat={latitude} lng={longitude} />
            )}
          </GoogleMapReact>
        </div>

        {searchPlacement === "overlay" && searchField}

        {/* Zoom Controls */}
        <div
          className={twMerge(
            "absolute left-1.5 z-10 grid grid-cols-1 gap-0.5",
            showLocationInfo ? "bottom-20" : "bottom-2.5",
          )}
        >
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
        <div
          className={twMerge(
            "absolute right-2.5 z-10",
            showLocationInfo ? "bottom-20" : "bottom-2.5",
          )}
        >
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

        {showLocationInfo && (
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
                  (latitude != null && longitude != null
                    ? "..."
                    : dict.common.chooseLocation)}
              </p>
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
