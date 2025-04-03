// This component displays the temperature in degrees Celsius.

// Import necessary libraries and components
import React from 'react';
import styles from '../ComponentStyles.module.css'; // Importing the styles

// DegreesCard component
function DegreesCard({ temperature }) {

  return (
    <div className={styles['degrees-card']}>
        <span>{temperature}°C</span>

    </div>
  );
}

// Export the DegreesCard component
export default DegreesCard;
