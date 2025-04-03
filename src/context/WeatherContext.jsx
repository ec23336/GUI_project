// WeatherContext.jsx - Creates a context for managing weather data across the application

import React, { createContext, useState, useContext } from 'react';

// Create a context for weather data
const WeatherContext = createContext();

// Provider component that wraps parts of the app that need access to weather data
export function WeatherProvider({ children }) {
  // Initialize state with default values
  const [weatherData, setWeatherData] = useState({
    location: null,           // Current location data
    searchLocation: null,     // Location searched by the user
    currentWeather: null,     // Current weather conditions
    forecast: [],             // Weather forecast data
    alerts: [],               // Weather alerts/warnings
    loading: false,           // Loading state for API requests
    error: null,              // Error state for failed requests
  });

  // Provide the weather data and update function to child components
  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
}

// Custom hook to easily access weather context in components
export function useWeather() {
  return useContext(WeatherContext);
}
