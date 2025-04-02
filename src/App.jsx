import React, { useState } from 'react';
import './App.css';
import AppRouter from './AppRouter';
import backgroundImage from './images/base.png'; // Import the image
import GrabAPI from './components/API_CODE/API'; // Fixed import path
import MarineDataAPI from './components/API_CODE/MarineDataAPI';
import { WeatherProvider } from './context/WeatherContext';

function App() {
  // Add a default location - this was missing before
  const [location, setLocation] = useState('London');
  const [view, setView] = useState('home'); // 'home', 'ocean', 'location', 'marine'
  const [marineLocation, setMarineLocation] = useState(''); // For marine weather

  return (
    <WeatherProvider>
      <div
        className="App"
        style={{
          backgroundImage: `url(${backgroundImage})`, // Apply the background image dynamically
          backgroundSize: 'cover',                    // Ensures the background covers the full area
          backgroundPosition: 'center',               // Centers the background image
          backgroundRepeat: 'no-repeat',              // Prevents the image from repeating
          minHeight: '100vh',                          // Ensures it covers the full viewport height
          width: '100%',                               // Ensures the div stretches across the full width
          overflowX: 'hidden',                        // Prevents horizontal scrolling
        }}
      >
        <GrabAPI location={location} />
        <AppRouter /> 
      </div>
    </WeatherProvider>
  );
};

export default App;