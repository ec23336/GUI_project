// API.jsx Fetches general weather data from multiple APIs when a location search is triggered.

import { useEffect } from "react";
import { useWeather } from "../../context/WeatherContext";

function GrabAPI() {
    // Access weather context for state management
    const { weatherData, setWeatherData } = useWeather();
    
    useEffect(() => {
        // Skip API call if no search location is provided
        if (!weatherData.searchLocation) {
            return;
        }
        
        console.log("GrabAPI useEffect triggered with location:", weatherData.searchLocation);
        
        async function fetchWeatherInfo() {
            try {
                console.log("Fetching weather for:", weatherData.searchLocation);
                // Set loading state
                setWeatherData(prevData => ({ ...prevData, loading: true, error: null }));

                // Convert location name to coordinates using OpenWeatherMap Geocoding API
                const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${weatherData.searchLocation}&limit=5&appid=7c852a0f1c711a9f5ba037cc439838a8`);
            
                const geoInfo = await geoResponse.json();
                
                // Handle case where location isn't found
                if (!geoInfo.length) {
                    throw new Error("Location not found. Please check spelling and try again.");
                }
                
                // Extract location details
                const { name, lat, lon } = geoInfo[0];

                // Fetch current weather data from OpenWeatherMap API
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c852a0f1c711a9f5ba037cc439838a8`);
                const weatherInfo = await weatherResponse.json();
                
                // Process current weather data
                const { temp } = weatherInfo.main; 
                const temperatureC = (temp - 273.15).toFixed(1);  // Convert from Kelvin to Celsius
                const weatherCondition = weatherInfo.weather[0].description; 
                const icon = weatherInfo.weather[0].icon;

                // Determine weather type for UI display
                const weatherType = getWeatherType(icon, weatherCondition);

                // Fetch 5-day forecast data
                const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7c852a0f1c711a9f5ba037cc439838a8`);
                const forecastInfo = await forecastResponse.json();

                // Filter forecast to specific times of day (6AM, 12PM, 6PM)
                const validTimes = ["06:00:00","12:00:00", "18:00:00"];
                const dailyForecasts = forecastInfo.list.filter(entry => validTimes.includes(entry.dt_txt.split(" ")[1]));

                // Define day names for human-readable display
                const dayOfTheWeek = {
                    0 : "Sunday",
                    1 : "Monday",
                    2 : "Tuesday",
                    3 : "Wednesday",
                    4 : "Thursday",
                    5 : "Friday",
                    6 : "Saturday"
                };

                // Process and format forecast data for UI display
                const formattedForecasts = dailyForecasts.map((forecast) => {
                    const date = forecast.dt_txt.split(" ")[0];
                    const time = forecast.dt_txt.split(" ")[1];
                    const day = new Date(date).getDay();
                    const dayName = dayOfTheWeek[day];
                    const temp = forecast.main.temp;
                    const temperatureC = (temp - 273.15).toFixed(1);  // Convert from Kelvin to Celsius
                    const weatherCondition = forecast.weather[0].description;
                    const icon = forecast.weather[0].icon;
                    const weatherType = getWeatherType(icon, weatherCondition);

                    return {
                        date,
                        time,
                        dayName,
                        temperatureC,
                        weatherCondition,
                        weatherType
                    };
                });

                // Fetch additional weather metrics from Tomorrow.io API
                const tomorrowKey = "5AzjYZBIYN50gnL4qrOhiQzcujYX8Ogz";
                const extraRes = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=${tomorrowKey}`);
                const extraData = await extraRes.json();
                const extra = extraData.data?.values || {};

                // Format additional weather data as alerts/notifications
                let alerts = [
                  { event: "Feels Like", description: `Feels like ${extra.temperatureApparent}°C` },
                  { event: "UV Index", description: `UV Index is ${extra.uvIndex}` },
                  { event: "Wind Speed", description: `Wind speed is ${extra.windSpeed} km/h` },
                  { event: "Rain Chance", description: `Chance of rain is ${extra.precipitationProbability}%` },
                  { event: "Humidity", description: `Humidity is ${extra.humidity}%` },
                ];

                // Update global weather context with all processed data
                setWeatherData({
                    searchLocation: null, // Reset search location after successful fetch
                    location: {
                        name,
                        lat,
                        lon
                    },
                    currentWeather: {
                        temperatureC,
                        weatherCondition,
                        weatherType
                    },
                    forecast: formattedForecasts,
                    alerts,
                    loading: false,
                    error: null
                });

            } catch (error){
                // Handle and log errors
                console.error("Error fetching weather data:", error);
                setWeatherData(prevData => ({ 
                    ...prevData, 
                    loading: false, 
                    error: error.message || "Failed to fetch weather data",
                    searchLocation: null // Reset search location on error too
                }));
            }
        }
        
        fetchWeatherInfo();
    }, [weatherData.searchLocation, setWeatherData]);

    /*
     * Helper function to map OpenWeather icon codes to weather type categories
     * Used for determining which weather icon to display in the UI
    */
    function getWeatherType(iconCode, description) {
        // Map icon codes to weather types
        if (iconCode.includes('01')) return 'sunny'; // clear sky
        if (iconCode.includes('02') || iconCode.includes('03')) return 'partlyCloudy'; // few/scattered clouds
        if (iconCode.includes('04')) return 'cloudy'; // broken/overcast clouds
        if (iconCode.includes('09') || iconCode.includes('10')) return 'rainy'; // rain
        if (iconCode.includes('11')) return 'lightning'; // thunderstorm
        if (iconCode.includes('13')) return 'snowy'; // snow
        
        // Fallback mapping based on description text
        if (description.includes('cloud')) return 'cloudy';
        if (description.includes('rain')) return 'rainy';
        if (description.includes('thunder')) return 'lightning';
        if (description.includes('snow')) return 'snowy';
        
        return 'sunny'; // default fallback
    }

    // Component doesn't render anything visible
    return null;
}

export default GrabAPI;
