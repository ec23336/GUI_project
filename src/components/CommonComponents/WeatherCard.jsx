// This component is responsible for displaying the current weather information in a card format. 
// It includes the temperature and an icon representing the weather condition. 
// The component also handles loading and error states.

// Import necessary libraries and components
import React from 'react';
import styles from '../ComponentStyles.module.css';
import { useWeather } from '../../context/WeatherContext';
import { ThermometerSun } from 'lucide-react';

// Weather icon imports
import cloudy from '../../images/WeatherIcons/cloudy.png';
import rainy from '../../images/WeatherIcons/rainy.png';
import sunny from '../../images/WeatherIcons/sunny.png';
import lightning from '../../images/WeatherIcons/lightning.png';
import snowy from '../../images/WeatherIcons/snow.png';
import partlyCloudy from '../../images/WeatherIcons/partly-cloudy.png';

// Weather icon mapping
const weatherIcons = { cloudy, rainy, sunny, lightning, snowy, partlyCloudy };

// WeatherCard component
function WeatherCard({ customTemperature, customWeatherIcon, isOceanPage = false }) {
  const { weatherData } = useWeather();
  
  // Check if the weather data is loading or if there's an error
  if (weatherData.loading) {
    return <div className={styles['weather-card']}>Loading weather data...</div>;
  }

  // Check if there's an error in the weather data
  if (weatherData.error) {
    return (
      <div className={styles['weather-card']}>
        <div className={styles['error-message']}>{weatherData.error}</div>
      </div>
    );
  }
  
  // Get the temperature and weather type from the weather data or use custom values
  const temperature = customTemperature || 
    (weatherData.currentWeather ? weatherData.currentWeather.temperatureC : "25");
  
  const weatherType = customWeatherIcon || 
    (weatherData.currentWeather ? weatherData.currentWeather.weatherType : "sunny");
  
  const icon = weatherIcons[weatherType] || weatherIcons.sunny;

  // Render the weather card with temperature and icon
  return (
    <div className={`${styles['weather-card']} ${styles['weather-card-centered']}`}>
      <div className={`${styles['weather-left']} ${styles['weather-left-centered']}`}>
        {isOceanPage ? (
          <div className={styles['airtemp-text-container']}>
            <ThermometerSun size={48} className={styles['thermometer-sun-icon']} />
            <div className={styles['airtemp-text']}>
              AIR TEMP<br />1.25m - 2m<br />above ground
            </div>
          </div>
        ) : (
          <img src={icon} alt="weather-icon" />
        )}
      </div>
      
      <div className={`${styles.divider} ${styles['divider-centered']}`}></div>

      <div className={`${styles['weather-right']} ${styles['weather-right-centered']}`}>
        <span>{temperature}°C</span>
      </div>
    </div>
  );
}

// Export the WeatherCard component
export default WeatherCard;

