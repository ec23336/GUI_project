// ForecastCard Component This component combines multiple card components to display a complete weather forecast item.
import React from 'react';
import styles from '../ComponentStyles.module.css'; // Importing the styles

// Import sections 
import DegreesCard from './DegreesCard';
import HourCard from './HourCard';  
import IconCard from './IconCard'; 
import DayCard from './DayCard';

function ForecastCard({degrees, hour, weatherType, day}) {

  return (
    <div className={styles['forecast-card']}>
        {/* Display the temperature component */}
        <DegreesCard temperature={degrees} />
        
        {/* Display the day information component */}
        <DayCard day={day} />
        
        {/* Display the hour information component */}
        <HourCard hour={hour} />
        
        {/* Display the weather icon component */}
        <IconCard weatherType={weatherType} />
    </div>
  );
}

export default ForecastCard;