import { useEffect } from "react";

/**
 * LocationFinder component that retrieves the user's current location
 * and converts the coordinates to a human-readable city and country.
 * Returns null as it doesn't render any UI elements.
 */
const LocationFinder = ({ onLocationFound }) => {
  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      onLocationFound("Geolocation not supported");
      return;
    }

    // Request the user's current position
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          const apiKey = "d8c45c7d70324524b08672298ee7fb8e";
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
          
          // Fetch location information from OpenCage Geocoding API
          const response = await fetch(url);
          const data = await response.json();
          
          // Extract city and country from the API response if available
          if (data.results?.[0]?.components) {
            const components = data.results[0].components;
            const city = components.city || components.town || components.village || "";
            const country = components.country || "";
            onLocationFound(`${city}, ${country}`);
          } else {
            onLocationFound("No location found");
          }
        } catch (error) {
          onLocationFound("Unable to resolve location");
        }
      },
      // Error callback if geolocation permission is denied or unavailable
      () => onLocationFound("Unable to retrieve location")
    );
  }, [onLocationFound]); // Re-run effect if onLocationFound callback changes

  return null;
};

export default LocationFinder;
