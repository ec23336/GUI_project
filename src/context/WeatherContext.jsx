import React, { createContext, useState, useContext } from 'react';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weatherData, setWeatherData] = useState({
    location: null,
    searchLocation: null, // Add searchLocation for tracking user searches
    currentWeather: null,
    forecast: [],
    alerts: [],
    loading: false,
    error: null,
  });

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
