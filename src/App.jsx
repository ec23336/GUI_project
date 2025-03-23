import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import backgroundImage from './images/base.png'; // Import the image

const App = () => {
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