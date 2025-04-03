// FILE: Ocean.jsx AT ROOT/GUI_project\src\pages\Ocean.jsx

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../components/ComponentStyles.module.css';
import Navbar from '../components/CommonComponents/NavBar';
import WeatherCard from '../components/CommonComponents/WeatherCard';
import SunriseCard from '../components/CommonComponents/SunriseCard';
import SunsetCard from '../components/CommonComponents/SunsetCard';
import WindCard from '../components/CommonComponents/WindCard';
import ExtraInfoCard from '../components/CommonComponents/ExtraInfoCard';
import TidesCard from '../components/CommonComponents/TidesCard';
import WaterCard from '../components/CommonComponents/WaterCard';
import StormCard from '../components/CommonComponents/StormCard';
import VisibilityCard from '../components/CommonComponents/VisibilityCard';
import FishingConditions from '../components/CommonComponents/conditions';
import MarineDataAPI from '../components/API_CODE/MarineDataAPI';

export default function Ocean() {
    const location = useLocation();
    const [marineLocation, setMarineLocation] = useState('Plymouth'); // Default location

    // MarineDataAPI returns an object with marineData, weatherApiData, loading, error
    const { marineData, weatherApiData, loading, error } = MarineDataAPI({ marineLocation });
    const [sunriseTime, setSunriseTime] = useState('6:00 AM');
    const [sunsetTime, setSunsetTime] = useState('7:00 PM');
    const [windSpeed, setWindSpeed] = useState('12');
    const [windDirection, setWindDirection] = useState('SW');
    const [humidity, setHumidity] = useState('14');
    const [visibility, setVisibility] = useState(5);
    const [waveHeight, setWaveHeight] = useState('2.5');
    const [seaTemp, setSeaTemp] = useState('22');
    const [airTemp, setAirTemp] = useState('23');
    const [weatherDesc, setWeatherDesc] = useState('rainy');
    const [moonPhase, setMoonPhase] = useState('');
    const [barometricPressure, setBarometricPressure] = useState(1013);
    const [weatherCode, setWeatherCode] = useState(1000);
    const [windGust, setWindGust] = useState('1.8KT SW');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const locationParam = queryParams.get('location');
        
        if (locationParam) {
            setMarineLocation(locationParam);
            console.log("Location set from URL:", locationParam);
        }
    }, [location]);

    // Extract data from marineData
    useEffect(() => {
        if (marineData && marineData.length > 0) {
            const todayData = marineData[0];
            
            // Set sunrise/sunset times from astronomy data
            if (todayData.astronomy) {
                const astro = todayData.astronomy;
                if (astro.sunrise) {
                    setSunriseTime(astro.sunrise);
                    console.log("Sunrise time set:", astro.sunrise);
                }
                if (astro.sunset) {
                    setSunsetTime(astro.sunset);
                    console.log("Sunset time set:", astro.sunset);
                }
            }
            
            // Set wind speed, direction, and humidity
            if (todayData.windSpeed) {
                setWindSpeed(todayData.windSpeed);
                console.log("Wind speed set:", todayData.windSpeed);
            }
            if (todayData.windDirection) {
                setWindDirection(todayData.windDirection);
                console.log("Wind direction set:", todayData.windDirection);
            }
            if (todayData.humidity) {
                setHumidity(todayData.humidity);
                console.log("Humidity set:", todayData.humidity);
            }
            // Set visibility with better parsing and logging
            if (todayData.visibility) {
                // Convert to number and handle edge cases
                let vis = parseFloat(todayData.visibility);
                console.log("Raw visibility value:", todayData.visibility, "Type:", typeof todayData.visibility);
                
                // Check if it's a valid number
                if (isNaN(vis)) {
                    console.warn("Invalid visibility value, using default");
                    vis = 5; // Default to good visibility
                } else {
                    // Log the parsed value
                    console.log("Parsed visibility value:", vis);
                }
                
                setVisibility(vis);
            } else {
                console.warn("No visibility data available, using default");
                setVisibility(5); // Default to good visibility
            }
            // Set wave height and sea temperature
            if (todayData.waveHeight) {
                setWaveHeight(todayData.waveHeight);
                console.log("Wave height set:", todayData.waveHeight);
            }
            if (todayData.seaTemp) {
                setSeaTemp(todayData.seaTemp);
                console.log("Sea temperature set:", todayData.seaTemp);
            }
            // Set air temperature
            if (todayData.airTemp) {
                setAirTemp(todayData.airTemp);
                console.log("Air temperature set:", todayData.airTemp);
            }
            // Set weather description for icon
            if (todayData.weatherDesc) {
                setWeatherDesc(todayData.weatherDesc.toLowerCase());
                console.log("Weather description set:", todayData.weatherDesc);
            }
            // Set moon phase if available
            if (todayData.astronomy && todayData.astronomy.moon_phase) {
                setMoonPhase(todayData.astronomy.moon_phase);
                console.log("Moon phase set:", todayData.astronomy.moon_phase);
            } else if (todayData.astronomy && todayData.astronomy.moonPhase) {
                setMoonPhase(todayData.astronomy.moonPhase);
                console.log("Moon phase set:", todayData.astronomy.moonPhase);
            }

            // Extract the new fields
            if (todayData.pressureMb) {
                setBarometricPressure(todayData.pressureMb);
                console.log("Barometric pressure set from WWO API:", todayData.pressureMb);
            }
            
            if (todayData.weatherCode) {
                // WWO uses different weather codes than WeatherAPI, would need conversion
                // For now, set it directly
                setWeatherCode(parseInt(todayData.weatherCode));
                console.log("Weather code set from WWO API:", todayData.weatherCode);
            }
            
            if (todayData.windGustKmph) {
                setWindGust(`${todayData.windGustKmph} kmph`);
                console.log("Wind gust set from WWO API:", todayData.windGustKmph);
            }
        }
    }, [marineData]);
    
    // Comment out weatherAPI-related useEffect
    /*
    useEffect(() => {
        // Simple debugging to check the structure of weatherApiData
        console.log("weatherApiData available:", !!weatherApiData);
        
        if (weatherApiData) {
            // ... All weather API data extraction code ...
        }
    }, [weatherApiData]);
    */

    // Debug: Log barometric pressure changes
    useEffect(() => {
        console.log("Current barometricPressure state:", barometricPressure);
    }, [barometricPressure]);

    return (
        <div>
          <header>
            <Navbar/>
          </header>
          
          {loading ? (
            <div className="text-center p-4">Loading marine data for {marineLocation}...</div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">Error: {error}</div>
          ) : (
            <div className={styles['OceanContainer']}>
              <div className={styles['OceanTop']}>
                <div className={styles['OceanTopLeft']}>
                  <SunriseCard time={sunriseTime} />
                  <TidesCard pressure={barometricPressure.toString()} />
                </div>
                <div className={styles['OceanTopMiddle']}>
                  <ExtraInfoCard location={marineLocation} />
                  {/* Pass isOceanPage prop to display air temp text instead of icon */}
                  <WeatherCard 
                    customTemperature={airTemp} 
                    customWeatherIcon={weatherDesc} 
                    isOceanPage={true} 
                  />
                  <WindCard speed={windSpeed} direction={windDirection} rainPercent={humidity} />
                  <FishingConditions moonPhase={moonPhase || "Not available"} currentFlow={windGust} />
                </div>
                <div className={styles['OceanTopRight']}>
                  <SunsetCard time={sunsetTime} />
                  <WaterCard waveHeight={waveHeight} waterTemp={seaTemp} />
                </div>
              </div>
              <div className={styles['OceanBottom']}>
                {/* Pass the weatherCode from WorldWeatherOnline API */}
                <StormCard weatherCode={weatherCode} />
                <VisibilityCard kilometers={visibility} />
              </div>
            </div>
          )}
        </div> 
    );
}
