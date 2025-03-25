import React from 'react';
import styles from '../ComponentStyles.module.css';

function DayCard({ day }) {
  return (
    <div className={styles['day-card']}>
      {day}
    </div>
  );
}

export default DayCard;
