// This component is responsible for displaying the weather forecast in a card format. 
// It includes temperature, hour, weather type, and day information.

// Import necessary libraries and components
import React from 'react';
import styles from '../ComponentStyles.module.css'; // Importing the styles

// Import sections 
import DegreesCard from './DegreesCard';
import HourCard from './HourCard';  
import IconCard from './IconCard'; 
import DayCard from './DayCard';

// ForecastCard component
function ForecastCard({degrees, hour, weatherType, day}) {
  // Display the forecast card with temperature, hour, weather type, and day information
  return (
    <div className={styles['forecast-card']}>
        <DegreesCard temperature={degrees} />
        <DayCard day={day} />
        <HourCard hour={hour} />
        <IconCard weatherType={weatherType} />
    </div>
  );
}

// Export the ForecastCard component
export default ForecastCard;