import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import backgroundImage from './images/base.png'; // Import the image
import GrabAPI from './components/API';
import { useState } from 'react';
import MarineDataAPI from './components/MarineDataAPI';

function App() {
  const [view, setView] = useState('home'); // 'home', 'ocean', 'location', 'marine'
  const [location, setLocation] = useState(''); // Store the entered location
  const [marineLocation, setMarineLocation] = useState(''); // For marine weather

  return (
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
      <AppRouter /> 
      </div>
  );
};

export default App;