import { useEffect } from "react";
import { useWeather } from "../context/WeatherContext";

function GrabAPI() {
    const { weatherData, setWeatherData } = useWeather();
    
    useEffect(() => {
        if (!weatherData.searchLocation) {
            return; // Skip if no search location is set
        }
        
        console.log("GrabAPI useEffect triggered with location:", weatherData.searchLocation);
        
        async function fetchWeatherInfo() {
            try {
                console.log("Fetching weather for:", weatherData.searchLocation);
                setWeatherData(prevData => ({ ...prevData, loading: true, error: null }));

                const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${weatherData.searchLocation}&limit=5&appid=7c852a0f1c711a9f5ba037cc439838a8`);
            
                const geoInfo = await geoResponse.json();
                
                if (!geoInfo.length) {
                    // No location found
                    throw new Error("Location not found. Please check spelling and try again.");
                }
                
                const { name, lat, lon } = geoInfo[0];

                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c852a0f1c711a9f5ba037cc439838a8`);
                const weatherInfo = await weatherResponse.json();
                
                const { temp } = weatherInfo.main; 
                const temperatureC = (temp - 273.15).toFixed(1); 
                const weatherCondition = weatherInfo.weather[0].description; 
                const icon = weatherInfo.weather[0].icon;

                // Get weather icon type
                const weatherType = getWeatherType(icon, weatherCondition);

                const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7c852a0f1c711a9f5ba037cc439838a8`);
                const forecastInfo = await forecastResponse.json();

                const validTimes = ["06:00:00","12:00:00", "18:00:00"];
                const dailyForecasts = forecastInfo.list.filter(entry => validTimes.includes(entry.dt_txt.split(" ")[1]));

                const dayOfTheWeek = {
                    0 : "Sunday",
                    1 : "Monday",
                    2 : "Tuesday",
                    3 : "Wednesday",
                    4 : "Thursday",
                    5 : "Friday",
                    6 : "Saturday"
                };

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

                // Update context with all the data
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
                    loading: false,
                    error: null
                });

            } catch (error){
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

    // Helper function to map OpenWeather icons to our app icons
    function getWeatherType(iconCode, description) {
        if (iconCode.includes('01')) return 'sunny'; // clear sky
        if (iconCode.includes('02') || iconCode.includes('03')) return 'partlyCloudy'; // few/scattered clouds
        if (iconCode.includes('04')) return 'cloudy'; // broken/overcast clouds
        if (iconCode.includes('09') || iconCode.includes('10')) return 'rainy'; // rain
        if (iconCode.includes('11')) return 'lightning'; // thunderstorm
        if (iconCode.includes('13')) return 'snowy'; // snow
        
        // Fallback based on description
        if (description.includes('cloud')) return 'cloudy';
        if (description.includes('rain')) return 'rainy';
        if (description.includes('thunder')) return 'lightning';
        if (description.includes('snow')) return 'snowy';
        
        return 'sunny'; // default
    }

    return null;
}

export default GrabAPI;