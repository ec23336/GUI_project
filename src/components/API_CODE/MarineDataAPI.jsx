import { useState, useEffect } from 'react';

const MarineDataAPI = ({ marineLocation, updateContext = null }) => {
    const [marineData, setMarineData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarineData = async () => {
            try {
                setLoading(true);
                if (updateContext) {
                    updateContext({
                        location: marineLocation,
                        loading: true,
                        error: null
                    });
                }
                
                // Get coordinates from location name
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
                
                const { lat, lon } = geoInfo[0];
                const coordinates = `${lat},${lon}`;
           
                // Fetch marine data
                const apiUrl = `http://api.worldweatheronline.com/premium/v1/marine.ashx?key=7f4bda632a6e426ea7b164922251903&format=json&q=${coordinates}`;
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();

                if (!data || !data.data || !data.data.weather || !Array.isArray(data.data.weather)) {
                    throw new Error("Invalid data structure from API");
                }

                // Process the forecast data
                const middayForecasts = data.data.weather.map((forecast) => {
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
                
                setMarineData(middayForecasts);
                
                if (updateContext) {
                    updateContext({
                        location: marineLocation,
                        marineForecasts: middayForecasts,
                        loading: false,
                        error: null
                    });
                }
            
            } catch (err) {
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
                setLoading(false);
            }
        };

        fetchMarineData();
    }, [marineLocation, updateContext]);

    return { marineData, loading, error };
};

export default MarineDataAPI;