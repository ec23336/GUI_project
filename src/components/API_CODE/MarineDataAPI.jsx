/*
 * MarineDataAPI Component
 * 
 * Fetches marine weather data from World Weather Online API for a specified location.
 * Provides loading, error states, and processed forecast data.
 * 
 * Props:
 * - marineLocation: String representing the location name to fetch data for
 * - updateContext: Optional callback function to update parent context with marine data
 */
import { useState, useEffect } from 'react';

const MarineDataAPI = ({ marineLocation, updateContext = null }) => {
    // State for storing marine data, loading status, and errors
    const [marineData, setMarineData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        /*
         * Fetches marine data when marineLocation changes
         * Process:
         * 1. Convert location name to coordinates using OpenWeatherMap Geocoding API
         * 2. Fetch marine data using World Weather Online API
         * 3. Process and format the forecast data
         * 4. Update local state and parent context if provided
         */
        const fetchMarineData = async () => {
            try {
                setLoading(true);
                // Update parent context with loading state if provided
                if (updateContext) {
                    updateContext({
                        location: marineLocation,
                        loading: true,
                        error: null
                    });
                }
                
                // Get coordinates from location name using OpenWeatherMap Geocoding API
                const geoResponse = await fetch(
                    `http://api.openweathermap.org/geo/1.0/direct?q=${marineLocation}&limit=5&appid=7c852a0f1c711a9f5ba037cc439838a8`
                );
                
                if (!geoResponse.ok) {
                    throw new Error(`Geocoding API error! Status: ${geoResponse.status}`);
                }
                
                const geoInfo = await geoResponse.json();
                
                if (!geoInfo || geoInfo.length === 0) {
                    throw new Error("Location not found!");
                }
                
                // Extract latitude and longitude from geocoding response
                const { lat, lon } = geoInfo[0];
                const coordinates = `${lat},${lon}`;
           
                // Fetch marine data from World Weather Online API
                const apiUrl = `http://api.worldweatheronline.com/premium/v1/marine.ashx?key=7f4bda632a6e426ea7b164922251903&format=json&q=${coordinates}`;
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();

                // Validate API response structure
                if (!data || !data.data || !data.data.weather || !Array.isArray(data.data.weather)) {
                    throw new Error("Invalid data structure from API");
                }

                // Process and format the forecast data (extract midday/12:00 forecasts)
                const middayForecasts = data.data.weather.map((forecast) => {
                    // Handle incomplete or missing hourly data
                    if (!forecast.hourly || !Array.isArray(forecast.hourly) || forecast.hourly.length < 5) {
                        return {
                            date: forecast.date || "Unknown",
                            astronomy: (forecast.astronomy && forecast.astronomy[0]) || {},
                            airTemp: "N/A",
                            seaTemp: "N/A",
                            weatherDesc: "Unknown",
                            weatherIcon: "",
                            windSpeed: "N/A",
                            windDirection: "N/A",
                            humidity: "N/A",
                            visibility: "N/A",
                            waveHeight: "N/A",
                            weatherCode: 113,
                            pressureMb: 1013,
                            windGustKmph: "N/A"
                        };
                    }
                    
                    // Extract noon forecast (index 4 = 12:00)
                    const hourly = forecast.hourly[4];
                    return {
                        date: forecast.date,
                        astronomy: forecast.astronomy?.[0] || {},
                        airTemp: hourly.tempC,
                        seaTemp: hourly.waterTemp_C,
                        weatherDesc: hourly.weatherDesc?.[0]?.value || "Unknown",
                        weatherIcon: hourly.weatherIconUrl[0].value,
                        windSpeed: hourly.windspeedKmph,
                        windDirection: hourly.winddir16Point,
                        humidity: hourly.humidity,
                        visibility: hourly.visibility,
                        waveHeight: hourly.sigHeight_m,
                        weatherCode: hourly.weatherCode || 113,
                        pressureMb: hourly.pressure || 1013,
                        windGustKmph: hourly.WindGustKmph || hourly.windspeedKmph
                    };
                });
                
                // Update local state with processed forecasts
                setMarineData(middayForecasts);
                
                // Update parent context if provided
                if (updateContext) {
                    updateContext({
                        location: marineLocation,
                        marineForecasts: middayForecasts,
                        loading: false,
                        error: null
                    });
                }
            
            } catch (err) {
                // Handle and propagate errors
                setError(err.message);
                console.error("Error fetching marine data:", err);
                
                if (updateContext) {
                    updateContext({
                        location: marineLocation,
                        loading: false,
                        error: err.message
                    });
                }
            } finally {
                // Always update loading state when done
                setLoading(false);
            }
        };

        fetchMarineData();
    }, [marineLocation, updateContext]);

    // Return marine data, loading state, and any errors
    return { marineData, loading, error };
};

export default MarineDataAPI;