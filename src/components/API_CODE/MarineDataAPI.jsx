import { useState, useEffect } from 'react';

const MarineDataAPI = ({ marineLocation, updateContext = null }) => {
    const [marineData, setMarineData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Commented out weatherAPI-related state
    // const [weatherApiData, setWeatherApiData] = useState(null);

    useEffect(() => {
        const fetchMarineData = async () => {
            try {
                setLoading(true);
                // If we have an updateContext function, update the loading state
                if (updateContext) {
                    updateContext({
                        location: marineLocation,
                        loading: true,
                        error: null
                    });
                }
                
                let coordinates;
                
                const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${marineLocation}&limit=5&appid=7c852a0f1c711a9f5ba037cc439838a8`);
                
                if (!geoResponse.ok) {
                    throw new Error(`Geocoding API error! Status: ${geoResponse.status}`);
                }
                
                const geoInfo = await geoResponse.json();
                
                if (!geoInfo || geoInfo.length === 0) {
                    throw new Error("Location not found!");
                }
                
                const { lat, lon } = geoInfo[0];

                // log the coordinates and name of the location
                console.log("Latitude: ", lat);
                console.log("Longitude: ", lon);
                console.log("Location: ", marineLocation);

                coordinates = `${lat},${lon}`;
           
                // Fetch marine data from WorldWeatherOnline
                const apiUrl = `http://api.worldweatheronline.com/premium/v1/marine.ashx?key=7f4bda632a6e426ea7b164922251903&format=json&q=${coordinates}`;
                
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();

                // Add this check to prevent the mapping error
                if (!data || !data.data || !data.data.weather || !Array.isArray(data.data.weather)) {
                    throw new Error("Invalid data structure from API");
                }

                const middayForecasts = data.data.weather.map((forecast) => {
                    // First ensure 'hourly' exists and has at least 5 elements
                    if (!forecast.hourly || !Array.isArray(forecast.hourly) || forecast.hourly.length < 5) {
                        // Return a default object with safe values if hourly data is not available
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
                            weatherCode: 113, // Default code for sunny
                            pressureMb: 1013, // Default pressure
                            windGustKmph: "N/A"
                        };
                    }
                    
                    // Now proceed with mapping safely
                    return {
                        date: forecast.date,
                        astronomy: forecast.astronomy && forecast.astronomy[0] ? forecast.astronomy[0] : {},
                        airTemp: forecast.hourly[4].tempC,
                        seaTemp: forecast.hourly[4].waterTemp_C,
                        weatherDesc: forecast.hourly[4].weatherDesc && forecast.hourly[4].weatherDesc[0] ? 
                            forecast.hourly[4].weatherDesc[0].value : "Unknown",
                        weatherIcon: forecast.hourly[4].weatherIconUrl[0].value,
                        windSpeed: forecast.hourly[4].windspeedKmph,
                        windDirection: forecast.hourly[4].winddir16Point,
                        humidity: forecast.hourly[4].humidity,
                        visibility: forecast.hourly[4].visibility,
                        waveHeight: forecast.hourly[4].sigHeight_m,
                        weatherCode: forecast.hourly[4].weatherCode || 113, // Default code for sunny if not available
                        pressureMb: forecast.hourly[4].pressure || 1013, // Default atmospheric pressure at sea level
                        windGustKmph: forecast.hourly[4].WindGustKmph || forecast.hourly[4].windspeedKmph // Fallback to wind speed if gust not available
                    };
                });

                console.log("Midday Forecasts with additional fields:", middayForecasts);
                // Log specific new fields for debugging
                if (middayForecasts.length > 0) {
                    console.log("Weather code:", middayForecasts[0].weatherCode);
                    console.log("Pressure (mb):", middayForecasts[0].pressureMb);
                    console.log("Wind gust (kmph):", middayForecasts[0].windGustKmph);
                }
                
                setMarineData(middayForecasts);
                
                // Update context with all the data if updateContext is provided
                if (updateContext) {
                    updateContext({
                        location: marineLocation,
                        marineForecasts: middayForecasts,
                        // weatherApiData: weatherApiData, // Commented out
                        loading: false,
                        error: null
                    });
                }
            
            } catch (err) {
                setError(err.message);
                console.error("Error fetching marine data:", err);
                
                // Update context with error if updateContext is provided
                if (updateContext) {
                    updateContext({
                        location: marineLocation,
                        loading: false,
                        error: err.message
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMarineData();
    }, [marineLocation, updateContext]);

    // Return the fetched data and loading/error states without weatherApiData
    return { marineData, /* weatherApiData, */ loading, error };
};

export default MarineDataAPI;