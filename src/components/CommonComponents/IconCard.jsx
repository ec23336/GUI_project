import React from 'react';
import styles from '../ComponentStyles.module.css'; // Importing the styles

// Weather icon imports
import cloudy from '../../images/WeatherIcons/cloudy.png';
import rainy from '../../images/WeatherIcons/rainy.png';
import sunny from '../../images/WeatherIcons/sunny.png';
import lightning from '../../images/WeatherIcons/lightning.png';
import snowy from '../../images/WeatherIcons/snow.png';
import partlyCloudy from '../../images/WeatherIcons/partly-cloudy.png';

const weatherIcons = {
    cloudy,
    rainy,
    sunny,
    lightning,
    snowy,
    partlyCloudy
};


function IconCard({ weatherType }) {

    const icon = weatherIcons[weatherType];

  return (
    <div className={styles['icon-card']}>
        <img src={icon} alt="weather-icon" />
    </div>
  );
}

export default IconCard;