// This component is responsible for displaying weather alerts in a bell icon.

//Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { useWeather } from "../../context/WeatherContext"; 
import { useLocation } from "react-router-dom";
import styles from "../ComponentStyles.module.css"; 
import AlertImg from "../../images/AlertImg.png";


// AlertBell component
function AlertBell() {
  const { weatherData } = useWeather();
  const [isOpen, setIsOpen] = useState(false);
  const [hasAlerts, setHasAlerts] = useState(false);
  const [currentAlerts, setCurrentAlerts] = useState([]);
  
  const location = useLocation();
  
  // Reset the alerts when the location changes
  useEffect(() => {
    setIsOpen(false);
    setHasAlerts(false);
    setCurrentAlerts([]);
    
    // Only set alerts if we're on the landing page
    if (location.pathname === "/" || location.pathname === "/home") {
      setHasAlerts(weatherData.alerts && weatherData.alerts.length > 0);
      setCurrentAlerts(weatherData.alerts || []);
    }
  }, [location.pathname, weatherData.alerts]);

  return (
    <div className={styles["alert-bell-wrapper"]} onClick={() => setIsOpen(!isOpen)}>
      <img
        src={AlertImg}
        alt="Alerts"
        className={styles["alert-icon"]}
      />
      {hasAlerts && <span className={styles["alert-dot"]} />}

      {isOpen && (
        // Dropdown menu for alerts
        <div className={styles["alert-dropdown"]}>
          {hasAlerts ? (
            currentAlerts.map((alert, idx) => (
              <div key={idx} className={styles["alert-item"]}>
                <strong>{alert.event}</strong>
                <p>{alert.description}</p>
              </div>
            ))
          ) : (
            // Message when there are no alerts
            <div className={styles["alert-item"]}>
              <p>No weather alerts at this time.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Export the AlertBell component
export default AlertBell;