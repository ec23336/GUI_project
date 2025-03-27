import React from 'react';
import { useWeather } from '../context/WeatherContext';

function DebugWeather() {
  try {
    const { weatherData } = useWeather();
    
    return (
      <div style={{ 
        position: 'fixed', 
        bottom: '10px', 
        right: '10px', 
        background: 'rgba(0,0,0,0.7)', 
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        maxWidth: '300px',
        zIndex: 9999
      }}>
        <h4>Weather Context Debug</h4>
        <pre style={{ fontSize: '10px' }}>
          {JSON.stringify(weatherData, null, 2)}
        </pre>
      </div>
    );
  } catch (error) {
    return (
      <div style={{ 
        position: 'fixed', 
        bottom: '10px', 
        right: '10px', 
        background: 'rgba(255,0,0,0.7)', 
        color: 'white',
        padding: '10px',
        zIndex: 9999
      }}>
        Context Error: {error.message}
      </div>
    );
  }
}

export default DebugWeather;
