import React from 'react';
import styles from '../ComponentStyles.module.css'; // Importing the styles

function DegreesCard({ temperature }) {

  return (
    <div className={styles['degrees-card']}>
        <span>{temperature}°C</span>

    </div>
  );
}

export default DegreesCard;
