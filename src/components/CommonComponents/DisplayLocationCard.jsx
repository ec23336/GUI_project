import React, { useState, useEffect } from "react";
import styles from "../ComponentStyles.module.css";
import LocationFinder from "../API_CODE/LocationFinder";
import { useWeather } from "../../context/WeatherContext";

function DisplayLocationCard({ locationProp }) {
  const [displayLocation, setDisplayLocation] = useState(locationProp);
  const { weatherData, setWeatherData } = useWeather();

  useEffect(() => {
    // If there's location data in the context, prioritize that
    if (weatherData.location && weatherData.location.name) {
      setDisplayLocation(weatherData.location.name);
    }
    // Otherwise, if searchLocation is set and manual location is enabled
    else if (weatherData.searchLocation && weatherData.manualLocationSet) {
      setDisplayLocation(weatherData.searchLocation);
    } 
    // Fallback to the prop or auto-detected location
    else if (locationProp !== "Loading..." && !weatherData.manualLocationSet) {
      setDisplayLocation(locationProp);
    }
  }, [weatherData.location, weatherData.searchLocation, locationProp, weatherData.manualLocationSet]);

  const handleLocationFound = (foundLocation) => {
    if (!weatherData.manualLocationSet) {
      setDisplayLocation(foundLocation);
      setWeatherData(prev => ({
        ...prev,
        searchLocation: foundLocation,
        autoLocation: foundLocation
      })); 
    }
  };

  return (
    <div className={styles.locationDisplay}>
      {/* Add location icon for visual consistency */}
      <span className={styles.locationText}>
        {displayLocation === "Loading..." ? "Finding your location..." : displayLocation}
      </span>

      {displayLocation === "Loading..." && !weatherData.manualLocationSet && 
        <LocationFinder onLocationFound={handleLocationFound} />
      }
    </div>
  );
}

export default DisplayLocationCard;





