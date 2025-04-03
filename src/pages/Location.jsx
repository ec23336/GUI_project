import React, { useState, useEffect } from 'react';
import Navbar from '../components/CommonComponents/NavBar';
import TypeLocationBar from "../components/CommonComponents/TypeLocationBar";
import MarineDataAPI from '../components/API_CODE/MarineDataAPI';
import { useWeather } from '../context/WeatherContext';
import styles from '../components/ComponentStyles.module.css'; 

export default function Location() {
    const [hasSearched, setHasSearched] = useState(false);
    const { weatherData } = useWeather();
    const [searchLocation, setSearchLocation] = useState('');
    
    // Update local state when weatherData.searchLocation changes
    useEffect(() => {
        if (weatherData.manualLocationSet && weatherData.searchLocation) {
            setSearchLocation(weatherData.searchLocation);
            setHasSearched(true);
        }
    }, [weatherData.searchLocation, weatherData.manualLocationSet]);

    return (
        <div>
            <header>
                <Navbar />
            </header>
            
            <div className={styles['location-page-container']}>
                <div className={styles['search-box-overlay']}>
                    <h1 className={styles['location-page-title']}>Search For Marine Specific Weather</h1>
                    <TypeLocationBar type="marine" />
                </div>
                
                {hasSearched && searchLocation && (
                    <div className={styles['location-results-container']}>
                        <h2 className={styles['location-results-title']}>Weather data for {searchLocation}</h2>
                        <LocationDataDisplay location={searchLocation} />
                    </div>
                )}
            </div>
        </div>
    );
}

