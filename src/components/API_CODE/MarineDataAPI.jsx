import { useState, useEffect } from 'react';

/**
 * MarineDataAPI component - Fetches and processes marine weather data
 * This component handles the entire data flow from location name to formatted marine weather data
 * @param {string} marineLocation - Location name to fetch marine data for
 * @param {function} updateContext - Optional callback to update parent component context
 * @returns {object} - Marine data, loading state, and error information
 */
const MarineDataAPI = ({ marineLocation, updateContext = null }) => {
    // State to store processed marine data for the specified location
    const [marineData, setMarineData] = useState(null);
    // State to track API request loading status
    const [loading, setLoading] = useState(true);
    // State to store any error messages during data fetching
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch marine data from API
        const fetchMarineData = async () => {
            try {
                setLoading(true);
                // If a context update callback is provided, inform parent component about loading state
                if (updateContext) {
                    updateContext({
                        location: marineLocation,
                        loading: true,
                        error: null
                    });
                }
                
                // Step 1: Convert location name to coordinates using OpenWeatherMap Geocoding API
                // This is necessary since the marine API requires lat/lon coordinates
                const geoResponse = await fetch(
                    `http://api.openweathermap.org/geo/1.0/direct?q=${marineLocation}&limit=5&appid=7c852a0f1c711a9f5ba037cc439838a8`
                );
                
                if (!geoResponse.ok) {
                    throw new Error(`Geocoding API error! Status: ${geoResponse.status}`);
                }
                
                const geoInfo = await geoResponse.json();
                
                // Verify that the location exists in the geocoding results
                if (!geoInfo || geoInfo.length === 0) {
                    throw new Error("Location not found!");
                }
                
                // Extract latitude and longitude for the marine API
                // We use the first result as it's typically the most relevant match
                const { lat, lon } = geoInfo[0];
                const coordinates = `${lat},${lon}`;
           
                // Step 2: Fetch marine weather data from World Weather Online API
                // This API provides specialized marine data including wave heights, sea temperatures, etc.
                const apiUrl = `http://api.worldweatheronline.com/premium/v1/marine.ashx?key=7f4bda632a6e426ea7b164922251903&format=json&q=${coordinates}`;
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();

                // Validate API response structure to prevent runtime errors
                if (!data || !data.data || !data.data.weather || !Array.isArray(data.data.weather)) {
                    throw new Error("Invalid data structure from API");
                }

                // Step 3: Process and normalize the forecast data
                // We extract midday forecasts (index 4 corresponds to 12:00)
                // The API provides hourly data in 3-hour intervals (0=00:00, 1=03:00, 2=06:00, etc.)
                const middayForecasts = data.data.weather.map((forecast) => {
                    // Handle potentially missing or malformed data
                    // This ensures the app doesn't crash if the API returns unexpected data
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
                            weatherCode: 113, // Default code for clear/sunny weather
                            pressureMb: 1013, // Default standard pressure in millibars
                            windGustKmph: "N/A"
                        };
                    }
                    
                    // Extract midday data (index 4 = 12:00)
                    const hourly = forecast.hourly[4];
                    // Transform the raw API data into a more usable format for the application
                    return {
                        date: forecast.date,
                        astronomy: forecast.astronomy?.[0] || {}, // Sun/moon data
                        airTemp: hourly.tempC,                    // Air temperature in Celsius
                        seaTemp: hourly.waterTemp_C,              // Sea temperature in Celsius
                        weatherDesc: hourly.weatherDesc?.[0]?.value || "Unknown",
                        weatherIcon: hourly.weatherIconUrl[0].value,
                        windSpeed: hourly.windspeedKmph,          // Wind speed in km/h
                        windDirection: hourly.winddir16Point,     // Wind direction in 16-point compass format
                        humidity: hourly.humidity,                // Relative humidity percentage
                        visibility: hourly.visibility,            // Visibility in km
                        waveHeight: hourly.sigHeight_m,           // Significant wave height in meters
                        weatherCode: hourly.weatherCode || 113,   // Numerical code for weather condition
                        pressureMb: hourly.pressure || 1013,      // Atmospheric pressure in millibars
                        windGustKmph: hourly.WindGustKmph || hourly.windspeedKmph // Wind gust speed
                    };
                });
                
                // Update local state with processed data
                setMarineData(middayForecasts);
                
                // Update parent context if callback provided
                // This allows parent components to access and display the marine data
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
                
                // Inform parent component about the error if callback provided
                if (updateContext) {
                    updateContext({
                        location: marineLocation,
                        loading: false,
                        error: err.message
                    });
                }
            } finally {
                // Always set loading to false regardless of success or failure
                setLoading(false);
            }
        };

        // Execute the fetch function when component mounts or location changes
        // This ensures data is refreshed whenever the user selects a new location
        fetchMarineData();
    }, [marineLocation, updateContext]);

    // Return processed data, loading state, and any errors for consumer components
    return { marineData, loading, error };
};

export default MarineDataAPI;