import React from "react";
import ForecastCard from "./ForecastCard";
import styles from "../ComponentStyles.module.css"; 
import { useWeather } from "../../context/WeatherContext";

function ForecastList() {
  const { weatherData } = useWeather();
  const MAX_FORECASTS = 8; // Reduced to 8 forecast items for better horizontal display
  
  // If no forecast data is available yet or it's loading, show placeholder or loading state
  if (!weatherData.forecast || weatherData.forecast.length === 0) {
    return (
      <div className={styles["forecast-list"]}>
        {weatherData.loading ? (
          <p>Loading forecast data...</p>
        ) : ( 
          <p>No forecast data available</p>
        )}
      </div>
    );
  }
  
  // Limit the forecast items to the maximum allowed
  const limitedForecasts = weatherData.forecast.slice(0, MAX_FORECASTS);
  
  return (
    <div className={styles["forecast-list"]}>
      {limitedForecasts.map((forecast, index) => {
        // Extract hour from time string "HH:MM:SS"
        const hour = parseInt(forecast.time?.split(":")?.[0] || "0", 10);
        
        return (
          <ForecastCard 
            key={index}
            degrees={forecast.temperatureC}
            hour={hour}
            weatherType={forecast.weatherType}
            day={forecast.dayName?.substring(0, 3) || ""} // Use first 3 chars of day name
          />
        );
      })}
    </div>
  );
}

export default ForecastList;
