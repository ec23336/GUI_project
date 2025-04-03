import { useEffect } from "react";
import { useWeather } from "../../context/WeatherContext";

function GrabAPI() {
    const { weatherData, setWeatherData } = useWeather();
    
    useEffect(() => {
        if (!weatherData.searchLocation) return;
        
        async function fetchWeatherInfo() {
            try {
                setWeatherData(prevData => ({ ...prevData, loading: true, error: null }));

                const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${weatherData.searchLocation}&limit=5&appid=7c852a0f1c711a9f5ba037cc439838a8`);
                const geoInfo = await geoResponse.json();
                
                if (!geoInfo.length) {
                    throw new Error("Location not found. Please check spelling and try again.");
                }
                
                const { name, lat, lon } = geoInfo[0];

                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c852a0f1c711a9f5ba037cc439838a8`);
                const weatherInfo = await weatherResponse.json();
                
                const temperatureC = (weatherInfo.main.temp - 273.15).toFixed(1); 
                const weatherCondition = weatherInfo.weather[0].description; 
                const icon = weatherInfo.weather[0].icon;
                const weatherType = getWeatherType(icon, weatherCondition);

                const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7c852a0f1c711a9f5ba037cc439838a8`);
                const forecastInfo = await forecastResponse.json();

                const validTimes = ["06:00:00", "12:00:00", "18:00:00"];
                const dailyForecasts = forecastInfo.list.filter(entry => validTimes.includes(entry.dt_txt.split(" ")[1]));

                const dayOfTheWeek = {
                    0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 
                    4: "Thursday", 5: "Friday", 6: "Saturday"
                };

                const formattedForecasts = dailyForecasts.map((forecast) => {
                    const date = forecast.dt_txt.split(" ")[0];
                    const time = forecast.dt_txt.split(" ")[1];
                    const dayName = dayOfTheWeek[new Date(date).getDay()];
                    const temperatureC = (forecast.main.temp - 273.15).toFixed(1);
                    const weatherCondition = forecast.weather[0].description;
                    const weatherType = getWeatherType(forecast.weather[0].icon, weatherCondition);

                    return { date, time, dayName, temperatureC, weatherCondition, weatherType };
                });

                const tomorrowKey = "5AzjYZBIYN50gnL4qrOhiQzcujYX8Ogz";
                const extraRes = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=${tomorrowKey}`);
                const extraData = await extraRes.json();
                const extra = extraData.data?.values || {};

                let alerts = [
                    { event: "Feels Like", description: `Feels like ${extra.temperatureApparent}°C` },
                    { event: "UV Index", description: `UV Index is ${extra.uvIndex}` },
                    { event: "Wind Speed", description: `Wind speed is ${extra.windSpeed} km/h` },
                    { event: "Rain Chance", description: `Chance of rain is ${extra.precipitationProbability}%` },
                    { event: "Humidity", description: `Humidity is ${extra.humidity}%` },
                ];

                setWeatherData({
                    searchLocation: null,
                    location: { name, lat, lon },
                    currentWeather: { temperatureC, weatherCondition, weatherType },
                    forecast: formattedForecasts,
                    alerts,
                    loading: false,
                    error: null
                });

            } catch (error){
                console.error("Error fetching weather data:", error);
                setWeatherData(prevData => ({ 
                    ...prevData, 
                    loading: false, 
                    error: error.message || "Failed to fetch weather data",
                    searchLocation: null
                }));
            }
        }
        
        fetchWeatherInfo();
    }, [weatherData.searchLocation, setWeatherData]);

    function getWeatherType(iconCode, description) {
        if (iconCode.includes('01')) return 'sunny';
        if (iconCode.includes('02') || iconCode.includes('03')) return 'partlyCloudy';
        if (iconCode.includes('04')) return 'cloudy';
        if (iconCode.includes('09') || iconCode.includes('10')) return 'rainy';
        if (iconCode.includes('11')) return 'lightning';
        if (iconCode.includes('13')) return 'snowy';
        
        if (description.includes('cloud')) return 'cloudy';
        if (description.includes('rain')) return 'rainy';
        if (description.includes('thunder')) return 'lightning';
        if (description.includes('snow')) return 'snowy';
        
        return 'sunny';
    }

    return null;
}

export default GrabAPI;
