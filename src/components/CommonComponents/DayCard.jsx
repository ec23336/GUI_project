// This component is responsible for displaying a single day in a card format.

// Import necessary libraries and components
import React from 'react';
import styles from '../ComponentStyles.module.css';

// DayCard component
function DayCard({ day }) {
  return (
    <div className={styles['day-card']}>
      {day}
    </div>
  );
}

// Export the DayCard component
export default DayCard;
