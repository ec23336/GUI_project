// This component is used to display the hour in a card format.

// Import necessary libraries and components
import React from 'react';
import styles from '../ComponentStyles.module.css';

// HourCard component
function HourCard({ hour }) {
  // Ensure hour is treated as a number
  const hourNum = typeof hour === 'string' ? parseInt(hour, 10) : hour;
  
  // Add AM/PM based on the specific hours we're using
  let timeLabel;
  switch(hourNum) {
    case 6:
      timeLabel = "6:00 AM";
      break;
    case 12:
      timeLabel = "12:00 PM";
      break;
    case 18:
      timeLabel = "6:00 PM";
      break;
    default:
      timeLabel = `${hourNum}:00`;
  }
  
  return (
    <div className={styles['hour-card']}>
        <span>{timeLabel}</span>
    </div>
  );
}

// Export the HourCard component
export default HourCard;