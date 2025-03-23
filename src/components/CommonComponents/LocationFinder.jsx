import React, { useState, useEffect } from "react";

const LocationFinder = ({ onLocationFound }) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    } else {
      onLocationFound("Geolocation not supported");
    }
  }, []); // Empty array means it only runs once when the component mounts

  const handleLocationSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    console.log("Successfully got location:", latitude, longitude);
    reverseGeocode(latitude, longitude);
  };

  const handleLocationError = (error) => {
    console.log("Location error:", error.message);
    onLocationFound("Unable to retrieve location.");
  };

  const reverseGeocode = (latitude, longitude) => {
    const apiKey = "d8c45c7d70324524b08672298ee7fb8e"; // Ensure this key is valid
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Reverse geocode result:", data);
        if (data.results && data.results.length > 0) {
          const components = data.results[0].components;
          const city = components.city || components.town || components.village || "";
          const country = components.country || "";
          const formattedLocation = `${city}, ${country}`;
          onLocationFound(formattedLocation); // Pass location to parent (Home)
        } else {
          onLocationFound("No location found");
        }
      })
      .catch((error) => {
        console.error("Geocoding error:", error);
        onLocationFound("Unable to resolve location.");
      });
  };

  return null;  // Do not render anything here
};

export default LocationFinder;