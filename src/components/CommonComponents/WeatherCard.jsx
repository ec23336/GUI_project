import React from 'react';
import styles from '../ComponentStyles.module.css'; // Importing the styles

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

function WeatherCard({ temperature, weatherIcon }) {
  // Dynamically set the weather icon based on the weatherIcon prop
  const icon = weatherIcons[weatherIcon];

  return (
    <div className={styles['weather-card']}>
      <div className={styles['weather-left']}>
        <img src={icon} alt="weather-icon" /> {/* Display the image */}
      </div>
      
      <div className={styles.divider}></div> {/* Corrected the divider class */}

      <div className={styles['weather-right']}>
        <span>{temperature}°C</span>
      </div>
    </div>
  );
}

export default WeatherCard;

