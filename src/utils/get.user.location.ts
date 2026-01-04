/**
 * Geolocation utility for getting user's current geographic location
 */

export interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

export interface LocationData {
  coordinates: GeolocationCoordinates;
  address?: string;
  city?: string;
  country?: string;
  timestamp: number;
}

export interface LocationError {
  code: number;
  message: string;
}

/**
 * Get user's current geolocation (latitude and longitude)
 * @param options - Geolocation options
 * @returns Promise with coordinates or error
 */
export async function getUserLocation(
  options?: PositionOptions,
): Promise<LocationData> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: 0,
        message: "Geolocation is not supported by your browser",
      } as LocationError);
      return;
    }

    const defaultOptions: PositionOptions = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0,
      ...options,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: GeolocationCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
        };

        resolve({
          coordinates: coords,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        let message = "Failed to get geolocation";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location permission denied. Please enable location access in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            message = "The request to get user location timed out.";
            break;
        }

        reject({
          code: error.code,
          message,
        } as LocationError);
      },
      defaultOptions,
    );
  });
}

/**
 * Get user location with reverse geocoding (coordinates + address)
 * Uses OpenStreetMap Nominatim API for free reverse geocoding
 * @param options - Geolocation options
 * @returns Promise with coordinates and address information
 */
export async function getUserLocationWithAddress(
  options?: PositionOptions,
): Promise<LocationData> {
  const locationData = await getUserLocation(options);

  try {
    const addressData = await reverseGeocode(
      locationData.coordinates.latitude,
      locationData.coordinates.longitude,
    );

    return {
      ...locationData,
      address: addressData.address,
      city: addressData.city,
      country: addressData.country,
    };
  } catch (error) {
    // Return location data without address if geocoding fails
    console.warn("Failed to get address from coordinates:", error);
    return locationData;
  }
}

/**
 * Reverse geocode coordinates to get address information
 * Uses OpenStreetMap Nominatim (free, no API key required)
 * @param latitude
 * @param longitude
 * @returns Promise with address, city, and country
 */
async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<{ address: string; city: string; country: string }> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    {
      headers: {
        "Accept-Language": "en",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.statusText}`);
  }

  const data = (await response.json()) as {
    address?: {
      city?: string;
      town?: string;
      village?: string;
      county?: string;
      country?: string;
      display_name?: string;
    };
    display_name?: string;
  };

  const address = data.display_name || "Unknown location";
  const city =
    data.address?.city ||
    data.address?.town ||
    data.address?.village ||
    data.address?.county ||
    "Unknown";
  const country = data.address?.country || "Unknown";

  return { address, city, country };
}

/**
 * Watch user location (continuous updates)
 * @param callback - Called with location data on each update
 * @param errorCallback - Called if an error occurs
 * @param options - Geolocation options
 * @returns watchId to stop watching with stopWatchingLocation
 */
export function watchUserLocation(
  callback: (location: LocationData) => void,
  errorCallback?: (error: LocationError) => void,
  options?: PositionOptions,
): number {
  if (!navigator.geolocation) {
    errorCallback?.({
      code: 0,
      message: "Geolocation is not supported by your browser",
    });
    return -1;
  }

  const defaultOptions: PositionOptions = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0,
    ...options,
  };

  return navigator.geolocation.watchPosition(
    (position) => {
      const coords: GeolocationCoordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
      };

      callback({
        coordinates: coords,
        timestamp: position.timestamp,
      });
    },
    (error) => {
      let message = "Failed to watch geolocation";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          message =
            "Location permission denied. Please enable location access in your browser settings.";
          break;
        case error.POSITION_UNAVAILABLE:
          message = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          message = "The request to get user location timed out.";
          break;
      }

      errorCallback?.({
        code: error.code,
        message,
      });
    },
    defaultOptions,
  );
}

/**
 * Stop watching user location
 * @param watchId - The watch ID returned from watchUserLocation
 */
export function stopWatchingLocation(watchId: number): void {
  if (watchId >= 0) {
    navigator.geolocation.clearWatch(watchId);
  }
}

/**
 * Calculate distance between two coordinates (in kilometers)
 * Uses Haversine formula
 * @param lat1 - First latitude
 * @param lon1 - First longitude
 * @param lat2 - Second latitude
 * @param lon2 - Second longitude
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
