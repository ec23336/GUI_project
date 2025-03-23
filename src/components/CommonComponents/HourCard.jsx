import React from 'react';
import styles from '../ComponentStyles.module.css'; // Importing the styles


function HourCard({ hour }) {

  return (
    <div className={styles['hour-card']}>
        <span>{hour}:00</span>
    </div>
  );
}

export default HourCard;