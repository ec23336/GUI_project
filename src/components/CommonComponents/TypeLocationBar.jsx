import React, { useState } from "react";
import styles from "../ComponentStyles.module.css";
import MagnifyingGlass from "../../images/magnifyingGlass.png";
import { useWeather } from "../../context/WeatherContext";

function TypeLocationBar() {
    const [location, setLocation] = useState("");
    const { setWeatherData } = useWeather();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.trim()) {
            setWeatherData(prevData => ({ 
                ...prevData, 
                searchLocation: location, 
                manualLocationSet: true,
                loading: true,
                error: null
            }));
            setLocation("");
        }
    };

    return (
        <form className={styles.typeLocationBar} onSubmit={handleSubmit}>
            <button type="submit" className={styles.searchButton}>
                <img src={MagnifyingGlass} alt="Search" />
            </button>

            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Type location..."
                className={styles.inputField}
            />
        </form>
    );
}

export default TypeLocationBar;