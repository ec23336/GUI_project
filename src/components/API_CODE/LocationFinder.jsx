import { useEffect } from "react";

const LocationFinder = ({ onLocationFound }) => {
  useEffect(() => {
    if (!navigator.geolocation) {
      onLocationFound("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const apiKey = "d8c45c7d70324524b08672298ee7fb8e";
          const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
          
          const response = await fetch(url);
          const data = await response.json();
          
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
      () => onLocationFound("Unable to retrieve location")
    );
  }, [onLocationFound]);

  return null;
};

export default LocationFinder;
