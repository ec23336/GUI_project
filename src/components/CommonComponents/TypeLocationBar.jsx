import React, { useState } from "react";
import styles from "../ComponentStyles.module.css";
import MagnifyingGlass from "../../images/magnifyingGlass.png";
import { useWeather } from "../../context/WeatherContext";
import { useNavigate } from "react-router-dom";

function TypeLocationBar({ type, onSearch }) {
    const [location, setLocation] = useState("");
    const { setWeatherData } = useWeather();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!location.trim()) return;
        
        // Call the onSearch prop if provided
        if (onSearch) {
            onSearch(location);
        }
        
        if (type === "ocean") {
            // Navigate to Ocean page with location as query parameter
            navigate(`/ocean?location=${encodeURIComponent(location)}`);
        } else {
            // Update weather context for regular searches
            setWeatherData(prevData => ({ 
                ...prevData, 
                searchLocation: location, 
                manualLocationSet: true,
                loading: true,
                error: null
            }));
        }
        
        // Clear input field after submission
        setLocation("");
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