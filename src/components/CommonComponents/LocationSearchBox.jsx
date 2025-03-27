import React, { useState } from "react";
import styles from '../ComponentStyles.module.css';
import TypeLocationBar from './TypeLocationBar';

function LocationSearchBox() {
    const [location, setLocation] = useState("Loading..."); // State for location
    
      const handleLocationSearch = (newLocation) => {
        if (newLocation.trim() === "") {
          setLocation("Loading...");
        } else {
          setLocation(newLocation);
        }
      };
    return (
        <div className={styles['location-search-box']}>
            <h1>Please Enter Coastal Location For Marine Data</h1>
            <TypeLocationBar onSearch={handleLocationSearch} type="ocean"/>  
        </div>
  );
}

export default LocationSearchBox;