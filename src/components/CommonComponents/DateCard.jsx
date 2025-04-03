// This component is responsible for displaying the current date in a specific format: "Tuesday, 25th February".

// Import necessary libraries and components
import React from 'react';
import CurrentDate from './CurrentDate';
import styles from '../ComponentStyles.module.css';

// DateCard component
function DateCard() {
  return (
    <div className={styles['date-card']}>
      <CurrentDate />
    </div>
  );
}

// Export the DateCard component
export default DateCard;
