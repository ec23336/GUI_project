import React from 'react';
import CurrentDate from './CurrentDate';
import styles from '../ComponentStyles.module.css';

function DateCard() {
  return (
    <div className={styles['date-card']}>
      <CurrentDate />
    </div>
  );
}

export default DateCard;
