
// LocationFinder.jsx Uses browser geolocation API to detect user's current location reverse geocodes coordinates to a human-readable location name.

import { useEffect } from "react";

const LocationFinder = ({ onLocationFound }) => {
  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      onLocationFound("Geolocation not supported");
      return;
    }

    // Request user's current position
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Extract latitude and longitude from geolocation response
          const { latitude, longitude } = position.coords;
          
          // Use OpenCage Geocoding API to convert coordinates to location name
          const apiKey = "d8c45c7d70324524b08672298ee7fb8e";
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
          
          const response = await fetch(url);
          const data = await response.json();
          
          // Extract relevant location components from API response
          if (data.results?.[0]?.components) {
            const components = data.results[0].components;
            
            // Prioritize city, town, or village name
            const city = components.city || components.town || components.village || "";
            const country = components.country || "";
            
            // Return formatted location string
            onLocationFound(`${city}, ${country}`);
          } else {
            onLocationFound("No location found");
          }
        } catch (error) {
          // Handle API or processing errors
          onLocationFound("Unable to resolve location");
        }
      },
      // Handle geolocation permission denied or timeout errors
      () => onLocationFound("Unable to retrieve location")
    );
  }, [onLocationFound]);

  // Component doesn't render anything visible
  return null;
};

export default LocationFinder;
