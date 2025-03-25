import React, { useState, useEffect } from "react";
import styles from "../ComponentStyles.module.css";
import LocationFinder from "./LocationFinder";
import { useWeather } from "../../context/WeatherContext";

function DisplayLocationCard({ locationProp }) {
  const [location, setLocation] = useState(locationProp);
  const { weatherData, setWeatherData } = useWeather();

  useEffect(() => {
    // Prioritize manual location over auto-detected location
    if (weatherData.searchLocation && weatherData.manualLocationSet) {
      setLocation(weatherData.searchLocation);
    } 
    else if (locationProp !== "Loading..." && !weatherData.manualLocationSet) {
      setLocation(locationProp);
    }
  }, [weatherData.searchLocation, locationProp, weatherData.manualLocationSet]);

  const handleLocationFound = (foundLocation) => {
    if (!weatherData.manualLocationSet) {
      setLocation(foundLocation);
      setWeatherData(prev => ({
        ...prev,
        autoLocation: foundLocation
      }));
    }
  };

  return (
    <div className={styles.locationDisplay}>
      <span className={styles.locationText}>
        {location === "Loading..." ? "Loading..." : location}
      </span>

      {location === "Loading..." && !weatherData.manualLocationSet && 
        <LocationFinder onLocationFound={handleLocationFound} />
      }
    </div>
  );
}

export default DisplayLocationCard;





