import { useState, useEffect } from 'react';

const MarineDataAPI = ({ marineLocation }) => {
    const [marineData, setMarineData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weatherApiData, setWeatherApiData] = useState(null);

    useEffect(() => {
        const fetchMarineData = async () => {
            try {
                setLoading(true);
                
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

                // Fetch data from weatherapi.com
                try {
                    const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=575b8bdcab094c5786400430250204&q=${coordinates}&days=7&aqi=yes&alerts=yes`;
                    const weatherApiResponse = await fetch(weatherApiUrl);
                    
                    if (weatherApiResponse.ok) {
                        const weatherData = await weatherApiResponse.json();
                        console.log("Weather API data:", weatherData);
                        setWeatherApiData(weatherData);
                    } else {
                        console.error("Weather API error:", weatherApiResponse.status);
                    }
                } catch (weatherApiError) {
                    console.error("Error fetching Weather API data:", weatherApiError);
                }

                const middayForecasts = data.data.weather.map((forecast) => ({
                    date: forecast.date,
                    
                    astronomy: forecast.astronomy[0],

                    airTemp: forecast.hourly[4].tempC,
                    seaTemp: forecast.hourly[4].waterTemp_C,

                    weatherDesc: forecast.hourly[4].weatherDesc[0].value,
                    weatherIcon: forecast.hourly[4].weatherIconUrl[0].value,

                    windSpeed: forecast.hourly[4].windspeedKmph,
                    windDirection: forecast.hourly[4].winddir16Point,

                    humidity: forecast.hourly[4].humidity,

                    visibility: forecast.hourly[4].visibility,
                    waveHeight: forecast.hourly[4].sigHeight_m,
                }));

                console.log("Midday Forecasts:", middayForecasts);
                setMarineData(middayForecasts);
            
            } catch (err) {
                setError(err.message);
                console.error("Error fetching marine data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMarineData();
    }, [marineLocation]);

    return (
        <div>
            <h2>Marine Weather Data</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <p>Data successfully fetched! Check the console for details.</p>
                    
                    {weatherApiData && (
                        <div className="weather-api-data">
                            <h3>Weather API Data</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MarineDataAPI;
