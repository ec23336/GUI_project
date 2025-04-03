// Ocean.jsx - Marine weather dashboard page displaying detailed nautical information

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
    // Access the current URL and routing information
    const location = useLocation();
    // State to track the marine location with default value 'Plymouth'
    const [marineLocation, setMarineLocation] = useState('Plymouth'); 

    // Fetch marine data using the dedicated API hook
    const { marineData, weatherApiData, loading, error } = MarineDataAPI({ marineLocation });
    
    // State for marine weather data elements
    // Default sunrise time state
    const [sunriseTime, setSunriseTime] = useState('6:00 AM');
    // Default sunset time state
    const [sunsetTime, setSunsetTime] = useState('7:00 PM');
    // Wind speed in knots/mph
    const [windSpeed, setWindSpeed] = useState('12');
    // Wind direction (compass direction)
    const [windDirection, setWindDirection] = useState('SW');
    // Humidity percentage
    const [humidity, setHumidity] = useState('14');
    // Visibility in kilometers
    const [visibility, setVisibility] = useState(5);
    // Wave height in meters
    const [waveHeight, setWaveHeight] = useState('2.5');
    // Sea temperature in celsius
    const [seaTemp, setSeaTemp] = useState('22');
    // Air temperature in celsius
    const [airTemp, setAirTemp] = useState('23');
    // Weather description for icon selection
    const [weatherDesc, setWeatherDesc] = useState('rainy');
    // Moon phase for fishing conditions
    const [moonPhase, setMoonPhase] = useState('');
    // Atmospheric pressure in millibars
    const [barometricPressure, setBarometricPressure] = useState(1013);
    // Weather code for storm alerts
    const [weatherCode, setWeatherCode] = useState(1000);
    // Wind gust speed and direction
    const [windGust, setWindGust] = useState('1.8KT SW');

    // Extract location from URL query parameters if available
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const locationParam = queryParams.get('location');
        
        if (locationParam) {
            setMarineLocation(locationParam);
            console.log("Location set from URL:", locationParam);
        }
    }, [location]);

    // Process marine data when it's available
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
            
            // Extract wind and atmospheric information
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
            
            // Process visibility data with validation
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
            
            // Extract water conditions data
            if (todayData.waveHeight) {
                setWaveHeight(todayData.waveHeight);
                console.log("Wave height set:", todayData.waveHeight);
            }
            if (todayData.seaTemp) {
                setSeaTemp(todayData.seaTemp);
                console.log("Sea temperature set:", todayData.seaTemp);
            }
            if (todayData.airTemp) {
                setAirTemp(todayData.airTemp);
                console.log("Air temperature set:", todayData.airTemp);
            }
            
            // Set weather description for icon selection
            if (todayData.weatherDesc) {
                setWeatherDesc(todayData.weatherDesc.toLowerCase());
                console.log("Weather description set:", todayData.weatherDesc);
            }
            
            // Extract moon phase data for fishing conditions
            if (todayData.astronomy && todayData.astronomy.moon_phase) {
                setMoonPhase(todayData.astronomy.moon_phase);
                console.log("Moon phase set:", todayData.astronomy.moon_phase);
            } else if (todayData.astronomy && todayData.astronomy.moonPhase) {
                setMoonPhase(todayData.astronomy.moonPhase);
                console.log("Moon phase set:", todayData.astronomy.moonPhase);
            }

            // Extract additional meteorological data
            if (todayData.pressureMb) {
                setBarometricPressure(todayData.pressureMb);
                console.log("Barometric pressure set from WWO API:", todayData.pressureMb);
            }
            
            if (todayData.weatherCode) {
                setWeatherCode(parseInt(todayData.weatherCode));
                console.log("Weather code set from WWO API:", todayData.weatherCode);
            }
            
            if (todayData.windGustKmph) {
                setWindGust(`${todayData.windGustKmph} kmph`);
                console.log("Wind gust set from WWO API:", todayData.windGustKmph);
            }
        }
    }, [marineData]);

    // Debug: Log barometric pressure changes
    useEffect(() => {
        console.log("Current barometricPressure state:", barometricPressure);
    }, [barometricPressure]);

    return (
        <div>
          <header>
            <Navbar/>
          </header>
          
          {/* Conditional rendering based on data loading state */}
          {loading ? (
            <div className="text-center p-4">Loading marine data for {marineLocation}...</div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">Error: {error}</div>
          ) : (
            <div className={styles['OceanContainer']}>
              {/* Top section with three columns of marine information */}
              <div className={styles['OceanTop']}>
                <div className={styles['OceanTopLeft']}>
                  <SunriseCard time={sunriseTime} />
                  <TidesCard pressure={barometricPressure.toString()} />
                </div>
                <div className={styles['OceanTopMiddle']}>
                  <ExtraInfoCard location={marineLocation} />
                  {/* Display air temperature with appropriate styling */}
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
              {/* Bottom section with alert cards */}
              <div className={styles['OceanBottom']}>
                <StormCard weatherCode={weatherCode} />
                <VisibilityCard kilometers={visibility} />
              </div>
            </div>
          )}
        </div> 
    );
}
