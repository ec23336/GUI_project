import React from 'react';
import styles from '../ComponentStyles.module.css';
import { useWeather } from '../../context/WeatherContext';

// Weather icon imports
import cloudy from '../../images/WeatherIcons/cloudy.png';
import rainy from '../../images/WeatherIcons/rainy.png';
import sunny from '../../images/WeatherIcons/sunny.png';
import lightning from '../../images/WeatherIcons/lightning.png';
import snowy from '../../images/WeatherIcons/snow.png';
import partlyCloudy from '../../images/WeatherIcons/partly-cloudy.png';

// Create a mapping for the weather types and icons
const weatherIcons = {
  cloudy,
  rainy,
  sunny,
  lightning,
  snowy,
  partlyCloudy
};

function WeatherCard({ customTemperature, customWeatherIcon }) {
  const { weatherData } = useWeather();
  
  // Show loading state if weather data is being fetched
  if (weatherData.loading) {
    return <div className={styles['weather-card']}>Loading weather data...</div>;
  }

  // Show error message if there is one
  if (weatherData.error) {
    return (
      <div className={styles['weather-card']}>
        <div className={styles['error-message']}>
          {weatherData.error}
        </div>
      </div>
    );
  }
  
  // Use custom props if provided, otherwise use data from context
  const temperature = customTemperature || 
    (weatherData.currentWeather ? weatherData.currentWeather.temperatureC : "25");
  
  const weatherType = customWeatherIcon || 
    (weatherData.currentWeather ? weatherData.currentWeather.weatherType : "sunny");
  
  // Get the appropriate icon
  const icon = weatherIcons[weatherType] || weatherIcons.sunny;

  return (
    <div className={styles['weather-card']}>
      <div className={styles['weather-left']}>
        <img src={icon} alt="weather-icon" />
      </div>
      
      <div className={styles.divider}></div>

      <div className={styles['weather-right']}>
        <span>{temperature}°C</span>
      </div>
    </div>
  );
}

export default WeatherCard;

