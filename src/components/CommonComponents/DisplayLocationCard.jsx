// This component is responsible for displaying the location of the user. 
// It uses the LocationFinder component to find the user's location and updates the display accordingly.

// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import styles from "../ComponentStyles.module.css";
import LocationFinder from "../API_CODE/LocationFinder";
import { useWeather } from "../../context/WeatherContext";

// DisplayLocationCard component
function DisplayLocationCard({ locationProp }) {
  const [displayLocation, setDisplayLocation] = useState(locationProp);
  const { weatherData, setWeatherData } = useWeather();

  // Update the display location based on the weather data and location prop
  useEffect(() => {
    if (weatherData.location && weatherData.location.name) {
      setDisplayLocation(weatherData.location.name);
    } else if (weatherData.searchLocation && weatherData.manualLocationSet) {
      setDisplayLocation(weatherData.searchLocation);
    } else if (locationProp !== "Loading..." && !weatherData.manualLocationSet) {
      setDisplayLocation(locationProp);
    }
  }, [weatherData.location, weatherData.searchLocation, locationProp, weatherData.manualLocationSet]);

  // Function to handle location found event
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
      <span className={styles.locationText}>
        {displayLocation === "Loading..." ? "Finding your location..." : displayLocation}
      </span>

      {displayLocation === "Loading..." && !weatherData.manualLocationSet && 
        <LocationFinder onLocationFound={handleLocationFound} />
      }
    </div>
  );
}

/// Export the DisplayLocationCard component
export default DisplayLocationCard;





