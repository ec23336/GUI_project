import React, { useState } from "react";
import styles from '../ComponentStyles.module.css';
import TypeLocationBar from './TypeLocationBar';

function LocationSearchBox() {
    const [location, setLocation] = useState(""); 
    
    const handleLocationSearch = (newLocation) => {
        if (newLocation.trim() !== "") {
            setLocation(newLocation);
            // Location will be handled by TypeLocationBar's navigation
        }
    };

    return (
        <div className={styles['location-search-box']}>
            <h1>Please Enter Coastal Location For Marine Data</h1>
            <TypeLocationBar onSearch={handleLocationSearch} type="ocean" />  
        </div>
    );
}

export default LocationSearchBox;