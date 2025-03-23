import React, { useState, useEffect } from "react";
import styles from "../ComponentStyles.module.css"; // Import CSS styles
import LocationFinder from "./LocationFinder"; // Import LocationFinder to fetch the location

function DisplayLocationCard({ locationProp }) {
  const [location, setLocation] = useState(locationProp); // Initialize with the locationProp

  // Whenever the locationProp changes, update the location state
  useEffect(() => {
    setLocation(locationProp);
  }, [locationProp]);

  return (
    <div className={styles.locationDisplay}>
      <span className={styles.locationText}>
        {location === "Loading..." ? "Loading..." : location} {/* Display the location */}
      </span>

      {/* We only want to display LocationFinder if location is "Loading..." */}
      {location === "Loading..." && <LocationFinder onLocationFound={setLocation} />}
    </div>
  );
}

export default DisplayLocationCard;





