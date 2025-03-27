import React, { useState, useEffect } from "react";
import { useWeather } from "../../context/WeatherContext"; 
import styles from "../ComponentStyles.module.css"; 
import AlertImg from "../../images/AlertImg.png";

function AlertBell() {
  const { weatherData } = useWeather();
  const [isOpen, setIsOpen] = useState(false);
  const [hasAlerts, setHasAlerts] = useState(false);
  
  // Update hasAlerts whenever weatherData.alerts changes
  useEffect(() => {
    setHasAlerts(weatherData.alerts && weatherData.alerts.length > 0);
    console.log("Alerts in component:", weatherData.alerts);
  }, [weatherData.alerts]);

  return (
    <div className={styles["alert-bell-wrapper"]} onClick={() => setIsOpen(!isOpen)}>
      <img
        src={AlertImg}
        alt="Alerts"
        className={styles["alert-icon"]}
      />
      {hasAlerts && <span className={styles["alert-dot"]} />}

      {isOpen && (
        <div className={styles["alert-dropdown"]}>
          {hasAlerts ? (
            weatherData.alerts.map((alert, idx) => (
              <div key={idx} className={styles["alert-item"]}>
                <strong>{alert.event}</strong>
                <p>{alert.description}</p>
              </div>
            ))
          ) : (
            <div className={styles["alert-item"]}>
              <p>No weather alerts at this time.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AlertBell;
