import React from "react";
import ForecastCard from "./ForecastCard";
import styles from "../ComponentStyles.module.css"; // Import CSS styles

function ForecastList() {
  // Get current day of the week
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay(); // 0-6
  
  // Calculate day of the week based on hours
  const getDayOfWeek = (hour) => {
    // Get current hour
    const currentHour = currentDate.getHours();
    
    // Calculate days to add based on hours (24 hour increments)
    let daysToAdd = 0;
    
    if (hour < currentHour) {
      // If forecast hour is less than current hour, it's for the next day or later
      daysToAdd = 1;
    }
    
    // If the current hour is 3 and the forecast hour is also 3, it means today
    // If the current hour is 15 and the forecast hour is 3, it means tomorrow
    if (hour === 3 && currentHour > 3) daysToAdd = 1;
    if (hour === 6 && currentHour > 6) daysToAdd = 1;
    if (hour === 9 && currentHour > 9) daysToAdd = 1;
    if (hour === 12 && currentHour > 12) daysToAdd = 1;
    if (hour === 15 && currentHour > 15) daysToAdd = 1;
    if (hour === 18 && currentHour > 18) daysToAdd = 1;
    if (hour === 21 && currentHour > 21) daysToAdd = 1;
    
    // Calculate the day index
    const dayIndex = (currentDayIndex + daysToAdd) % 7;
    return days[dayIndex];
  };

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
          day={getDayOfWeek(forecast.hour)} // Add day of week
        />
      ))}
    </div>
  );
}

export default ForecastList;
