import React from "react";
import ForecastCard from "./ForecastCard";
import styles from "../ComponentStyles.module.css"; // Import CSS styles

function ForecastList() {
  // 7 different hourly weather slots
  const forecastData = [
    { degrees: 3, hour: 3, weatherType: "cloudy" },
    { degrees: 7, hour: 6, weatherType: "sunny" },
    { degrees: 10, hour: 9, weatherType: "rainy" },
    { degrees: 14, hour: 12, weatherType: "partlyCloudy" },
    { degrees: 16, hour: 15, weatherType: "snowy" },
    { degrees: 12, hour: 18, weatherType: "lightning" },
    { degrees: 8, hour: 21, weatherType: "sunny" },
  ];

  return (
    <div className={styles["forecast-list"]}>
      {forecastData.map((forecast) => (
        <ForecastCard 
          key={forecast.hour} // ✅ Unique key for React
          degrees={forecast.degrees} 
          hour={`${forecast.hour}`} // ✅ Format hour properly
          weatherType={forecast.weatherType} 
        />
      ))}
    </div>
  );
}

export default ForecastList;
