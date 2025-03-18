import { useEffect } from "react";

function GrabAPI({location}) {
    useEffect(() => {
        async function fetchWeatherInfo() {
            try {
                if (!location) return;

                const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=7c852a0f1c711a9f5ba037cc439838a8`);
            
                const geoInfo = await geoResponse.json();
                const { name, lat, lon } = geoInfo[0];
                console.log("Name: ", name);
                console.log("Latitude: ", lat); 
                console.log("Longitude: ", lon);

                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c852a0f1c711a9f5ba037cc439838a8`)
        
                const weatherInfo = await weatherResponse.json();
                
                const { temp } = weatherInfo.main; 
                const temperatureC = (temp - 273.15).toFixed(1); 
                const weatherCondition = weatherInfo.weather[0].description; 
                const icon = weatherInfo.weather[0].icon;

                console.log("Temperature: ", temperatureC);
                console.log("Weather Condition: ", weatherCondition);
                console.log("Icon: ", icon);

                const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7c852a0f1c711a9f5ba037cc439838a8`)
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
                }

                dailyForecasts.forEach((forecast) => {
                    const date = forecast.dt_txt.split(" ")[0];
                    const time = forecast.dt_txt.split(" ")[1];
                    const day = new Date(date).getDay();
                    const dayName = dayOfTheWeek[day];
                    const temp = forecast.main.temp;
                    const temperatureC = (temp - 273.15).toFixed(1);
                    const weatherCondition = forecast.weather[0].description;
                    const icon = forecast.weather[0].icon;

                    console.log("Day Of The Week: ", dayName);
                    console.log("Time ", time);
                    console.log("Temperature: ", temperatureC);
                    console.log("Weather Condition: ", weatherCondition);
                    console.log("Icon: ", icon);
                });

            } catch (error){
                console.log(error);
            }

        }
        
       fetchWeatherInfo();
    }, [location]);

    return null;
}

export default GrabAPI;