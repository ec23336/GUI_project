import React from 'react';
import styles from '../ComponentStyles.module.css'; // Importing the styles

// Import sections 
import DegreesCard from './DegreesCard';
import HourCard from './HourCard';  
import IconCard from './IconCard'; 

function ForecastCard({degrees, hour, weatherType}) {

  return (
    <div className={styles['forecast-card']}>
        <DegreesCard temperature={degrees} />
        <HourCard hour={hour} />
        <IconCard weatherType={weatherType} />
    </div>
  );
}

export default ForecastCard;