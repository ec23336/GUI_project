// This component is used to display weather icons based on the weather type passed as a prop.

// Import necessary libraries and components
import React from 'react';
import styles from '../ComponentStyles.module.css'; // Importing the styles

// Weather icon imports
import cloudy from '../../images/WeatherIcons/cloudy.png';
import rainy from '../../images/WeatherIcons/rainy.png';
import sunny from '../../images/WeatherIcons/sunny.png';
import lightning from '../../images/WeatherIcons/lightning.png';
import snowy from '../../images/WeatherIcons/snow.png';
import partlyCloudy from '../../images/WeatherIcons/partly-cloudy.png';

// Map of weather types to their corresponding icon images
const weatherIcons = {
    cloudy,
    rainy,
    sunny,
    lightning,
    snowy,
    partlyCloudy
};

// IconCard component
function IconCard({ weatherType }) {
    // Get the appropriate weather icon based on the provided type
    const icon = weatherIcons[weatherType];

  return (
    <div className={styles['icon-card']}>
        {/* Display the weather icon matching the current conditions */}
        <img src={icon} alt="weather-icon" />
    </div>
  );
}

// Export the IconCard component
export default IconCard;