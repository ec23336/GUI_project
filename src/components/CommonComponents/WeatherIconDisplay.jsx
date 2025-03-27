import React from 'react';
import { isDaytime, getWeatherIconName } from '../../utils/weatherIconUtils';
import styles from '../ComponentStyles.module.css';

// Import all weather icons
import clearIcon from '../../images/weather-icons/clear.png';
import cloudsIcon from '../../images/weather-icons/clouds.png';
import rainIcon from '../../images/weather-icons/rain.png';
import snowIcon from '../../images/weather-icons/snow.png';
import mistIcon from '../../images/weather-icons/mist.png';
import thunderstormIcon from '../../images/weather-icons/thunderstorm.png';
import drizzleIcon from '../../images/weather-icons/drizzle.png';
import defaultIcon from '../../images/weather-icons/default.png';

// Import night versions of icons
import nightClearIcon from '../../images/weather-icons/night-clear.png';
import nightCloudsIcon from '../../images/weather-icons/night-clouds.png';
import nightRainIcon from '../../images/weather-icons/night-rain.png';
import nightSnowIcon from '../../images/weather-icons/night-snow.png';
import nightMistIcon from '../../images/weather-icons/night-mist.png';
import nightThunderstormIcon from '../../images/weather-icons/night-thunderstorm.png';
import nightDrizzleIcon from '../../images/weather-icons/night-drizzle.png';
import nightDefaultIcon from '../../images/weather-icons/night-default.png';

// Map icon names to imported images
const iconMap = {
  'clear': clearIcon,
  'clouds': cloudsIcon,
  'rain': rainIcon,
  'snow': snowIcon,
  'mist': mistIcon,
  'thunderstorm': thunderstormIcon,
  'drizzle': drizzleIcon,
  'default': defaultIcon,
  'night-clear': nightClearIcon,
  'night-clouds': nightCloudsIcon,
  'night-rain': nightRainIcon,
  'night-snow': nightSnowIcon,
  'night-mist': nightMistIcon,
  'night-thunderstorm': nightThunderstormIcon,
  'night-drizzle': nightDrizzleIcon,
  'night-default': nightDefaultIcon,
};

function WeatherIconDisplay({ weatherData }) {
  // Extract needed data
  const conditionCode = weatherData?.weather?.[0]?.id;
  const sunset = weatherData?.sys?.sunset;
  
  // Determine if it's day or night
  const isDay = isDaytime(sunset);
  
  // Get the appropriate icon name based on condition and time of day
  const iconName = getWeatherIconName(conditionCode, isDay);
  
  // Get the icon image
  const iconSrc = iconMap[iconName] || iconMap.default;
  
  return (
    <div className={styles.weatherIcon}>
      <img src={iconSrc} alt={weatherData?.weather?.[0]?.description || 'Weather icon'} />
    </div>
  );
}

export default WeatherIconDisplay;
