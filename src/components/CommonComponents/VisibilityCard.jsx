import React from 'react';
import styles from '../ComponentStyles.module.css';
import bellIcon from '../../images/Marine-icons/Bell.svg';

function VisibilityCard({ kilometers = 5 }) {
  // More robust parsing with detailed logging
  console.log("VisibilityCard received:", kilometers, "Type:", typeof kilometers);
  
  // Ensure kilometers is a number with a fallback to 5 (good visibility)
  const DEFAULT_VISIBILITY = 5; // Default value in km
  
  let km;
  if (typeof kilometers === 'number') {
    km = kilometers;
  } else if (typeof kilometers === 'string') {
    // Try to parse and validate the string value
    const parsed = parseFloat(kilometers);
    km = !isNaN(parsed) ? parsed : DEFAULT_VISIBILITY;
  } else {
    km = DEFAULT_VISIBILITY;
  }
  
  // Convert visibility to kilometers if it appears to be in meters
  // (API sometimes returns values in meters but expects kilometers in display)
  if (km > 100) { // If greater than 100, likely in meters
    km = km / 1000;
    console.log("Converted from meters to kilometers:", km);
  }
  
  // Determine visibility condition based on kilometer range
  let message, visibilityClass;
  
  if (km <= 1) {
    message = "Poor Visibility";
    visibilityClass = styles.dangerousVisibility;
  } else if (km <= 4) {
    message = "Moderate Visibility";
    visibilityClass = styles.moderateVisibility;
  } else {
    message = "Good Visibility";
    visibilityClass = styles.goodVisibility;
  }
  
  // Enhanced logging
  console.log(`Final visibility: ${km}km, Class: ${visibilityClass}, Message: ${message}`);

  return (
    <div className={`${styles.Visibility} ${visibilityClass}`}>
      <img src={bellIcon} alt="visibility bell" className={styles.bellIcon} />
      <h3>VISIBILITY ALERT</h3>
      <p>{message}: {km.toFixed(1)} Kilometers</p>
    </div>
  );
}

export default VisibilityCard;
