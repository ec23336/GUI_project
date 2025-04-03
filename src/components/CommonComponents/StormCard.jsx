// FILE: StormCard.jsx AT ROOT/GUI_project\src\components\CommonComponents\StormCard.jsx

import React from 'react';
import styles from '../ComponentStyles.module.css';
import alertIcon from '../../images/Marine-icons/OctAlert.svg';

function StormCard({ weatherCode = 113 }) { // Default to clear/sunny (113)
  // Ensure weatherCode is a number for comparisons
  const code = Number(weatherCode);
  console.log("StormCard received weatherCode:", code);

  let message = "Weather appears normal. No weather alerts at this time.";
  let weatherConditionClass = styles.clearWeather; // Default class

  // Handle the WorldWeatherOnline weather codes
  // Thunderstorm conditions (200, 386, 389, 392, 395)
  if ([200, 386, 389, 392, 395].includes(code)) {
    message = "Thunderstorm warning! Take shelter immediately.";
    weatherConditionClass = styles.thunderstormWeather;
  } 
  // Heavy rain/torrential (308, 305, 359)
  else if ([308, 305, 359].includes(code)) {
    message = "Heavy rain alert! Be cautious of flooding.";
    weatherConditionClass = styles.rainyWeather;
  }
  // Moderate rain (302, 299, 356)
  else if ([302, 299, 356].includes(code)) {
    message = "Moderate rain expected. Bring waterproof gear.";
    weatherConditionClass = styles.rainyWeather;
  }
  // Light rain (293, 296, 353)
  else if ([293, 296, 353, 263, 266].includes(code)) {
    message = "Light rain or drizzle expected.";
    weatherConditionClass = styles.rainyWeather;
  }
  // Snow conditions (227, 230, 323, 326, 329, 332, 335, 338, 368, 371)
  else if ([227, 230, 323, 326, 329, 332, 335, 338, 368, 371].includes(code)) {
    message = "Snow conditions expected. Dress warmly.";
    weatherConditionClass = styles.snowyWeather;
  }
  // Sleet/freezing conditions (182, 185, 281, 284, 311, 314, 317, 320, 350, 362, 365, 374, 377)
  else if ([182, 185, 281, 284, 311, 314, 317, 320, 350, 362, 365, 374, 377].includes(code)) {
    message = "Icy conditions alert! Exercise extreme caution.";
    weatherConditionClass = styles.icyWeather;
  }
  // Fog/mist conditions (143, 248, 260)
  else if ([143, 248, 260].includes(code)) {
    message = "Reduced visibility due to fog or mist.";
    weatherConditionClass = styles.foggyWeather;
  }
  // Cloudy/overcast (116, 119, 122)
  else if ([116, 119, 122].includes(code)) {
    message = "Cloudy conditions. No significant weather concerns.";
    weatherConditionClass = styles.clearWeather;
  }
  // Clear/sunny (113)
  else if (code === 113) {
    message = "Clear skies ahead. Excellent conditions.";
    weatherConditionClass = styles.clearWeather;
  }
  // For any other codes
  else {
    message = "Check weather updates for latest conditions.";
    weatherConditionClass = styles.unknownWeather;
  }

  return (
    <div className={`${styles.Storm} ${weatherConditionClass}`}>
      <img src={alertIcon} alt="alert icon" className={styles.alertIcon} />
      <h3>WEATHER ALERT</h3>
      <p>{message}</p>
    </div>
  );
}

export default StormCard;
