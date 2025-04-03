import { useEffect } from "react";
import { useWeather } from "../../context/WeatherContext";

/**
 * Component that handles fetching weather data from various APIs
 * and updates the global weather context with the results
 */
function GrabAPI() {
    const { weatherData, setWeatherData } = useWeather();
    
    useEffect(() => {
        // Only fetch weather data when a search location is provided
        if (!weatherData.searchLocation) {
            return;
        }
        
        console.log("GrabAPI useEffect triggered with location:", weatherData.searchLocation);
        
        async function fetchWeatherInfo() {
            try {
                console.log("Fetching weather for:", weatherData.searchLocation);
                // Set loading state while fetching data
                setWeatherData(prevData => ({ ...prevData, loading: true, error: null }));

                // Step 1: Convert location name to coordinates using OpenWeatherMap Geocoding API
                const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${weatherData.searchLocation}&limit=5&appid=7c852a0f1c711a9f5ba037cc439838a8`);
                const geoInfo = await geoResponse.json();
                
                if (!geoInfo.length) {
                    throw new Error("Location not found. Please check spelling and try again.");
                }
                
                const { name, lat, lon } = geoInfo[0];

                // Step 2: Fetch current weather data using the coordinates
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c852a0f1c711a9f5ba037cc439838a8`);
                const weatherInfo = await weatherResponse.json();
                
                const { temp } = weatherInfo.main; 
                const temperatureC = (temp - 273.15).toFixed(1); // Convert Kelvin to Celsius
                const weatherCondition = weatherInfo.weather[0].description; 
                const icon = weatherInfo.weather[0].icon;

                // Map API icon code to our application's weather type
                const weatherType = getWeatherType(icon, weatherCondition);

                // Step 3: Fetch 5-day forecast data
                const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7c852a0f1c711a9f5ba037cc439838a8`);
                const forecastInfo = await forecastResponse.json();

                // Filter forecasts to get data only for morning, noon, and evening
                const validTimes = ["06:00:00","12:00:00", "18:00:00"];
                const dailyForecasts = forecastInfo.list.filter(entry => validTimes.includes(entry.dt_txt.split(" ")[1]));

                // Map numeric days to day names
                const dayOfTheWeek = {
                    0 : "Sunday",
                    1 : "Monday",
                    2 : "Tuesday",
                    3 : "Wednesday",
                    4 : "Thursday",
                    5 : "Friday",
                    6 : "Saturday"
                };

                // Format forecast data for our application
                const formattedForecasts = dailyForecasts.map((forecast) => {
                    const date = forecast.dt_txt.split(" ")[0];
                    const time = forecast.dt_txt.split(" ")[1];
                    const day = new Date(date).getDay();
                    const dayName = dayOfTheWeek[day];
                    const temp = forecast.main.temp;
                    const temperatureC = (temp - 273.15).toFixed(1);
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

                // Step 4: Fetch additional weather data from Tomorrow.io API
                const tomorrowKey = "5AzjYZBIYN50gnL4qrOhiQzcujYX8Ogz";
                const extraRes = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=${tomorrowKey}`);
                const extraData = await extraRes.json();
                const extra = extraData.data?.values || {};

                // Create alerts for display in the UI
                let alerts = [
                    { event: "Feels Like", description: `Feels like ${extra.temperatureApparent}°C` },
                    { event: "UV Index", description: `UV Index is ${extra.uvIndex}` },
                    { event: "Wind Speed", description: `Wind speed is ${extra.windSpeed} km/h` },
                    { event: "Rain Chance", description: `Chance of rain is ${extra.precipitationProbability}%` },
                    { event: "Humidity", description: `Humidity is ${extra.humidity}%` },
                ];

                // Update global weather context with all collected data
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
                console.error("Error fetching weather data:", error);
                // Update context with error information
                setWeatherData(prevData => ({ 
                    ...prevData, 
                    loading: false, 
                    error: error.message || "Failed to fetch weather data",
                    searchLocation: null // Reset search location on error
                }));
            }
        }
        
        fetchWeatherInfo();
    }, [weatherData.searchLocation, setWeatherData]);

    /**
     * Maps OpenWeatherMap icon codes and descriptions to our application's weather types
     * @param {string} iconCode - The icon code from OpenWeatherMap API
     * @param {string} description - The weather description from OpenWeatherMap API
     * @returns {string} - Weather type used by our application
     */
    function getWeatherType(iconCode, description) {
        // Primary mapping based on icon code
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

    // This component doesn't render anything, it just fetches data
    return null;
}

export default GrabAPI;
