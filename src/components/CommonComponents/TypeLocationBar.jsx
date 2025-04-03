import React, { useState } from "react";
import styles from "../ComponentStyles.module.css";
import MagnifyingGlass from "../../images/magnifyingGlass.png";
import { useWeather } from "../../context/WeatherContext";
import { useNavigate } from "react-router-dom";

function TypeLocationBar({type}) {
    const [location, setLocation] = useState("");
    const { setWeatherData } = useWeather();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === "ocean") {
            navigate('/ocean');
        } else if (type === "marine") {
            // For marine searches, navigate to the Ocean page with location parameter
            if (location.trim()) {
                // Update context
                setWeatherData(prevData => ({ 
                    ...prevData, 
                    searchLocation: location, 
                    manualLocationSet: true,
                    loading: true,
                    error: null
                }));
                
                // Navigate to Ocean page with location parameter
                navigate(`/ocean?location=${encodeURIComponent(location)}`);
                setLocation("");
            }
        } else if (location.trim()) {
            // Default behavior for other types
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