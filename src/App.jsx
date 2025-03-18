import './App.css'
import GrabAPI from './components/API';
import { useState } from 'react';

function App() {
  const [view, setView] = useState('home'); // 'home', 'ocean', 'location'
  const [location, setLocation] = useState(''); // Store the entered location


  return (
    <div>
      {view === 'home' && (
        <div>
          <h2>Weather Home</h2>
          <button onClick={() => setView('ocean')}>Go to Ocean Forecast</button>
        </div>
      )}

      
      {view === 'ocean' && (
        <div>
          <h2>Ocean Forecast</h2>
          <p>Please enter a location:</p>
          <input 
            type="text" 
            placeholder="Enter location..." 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />
          <button 
            onClick={() => {
              if (location.trim()) { // Ensure location is entered
                setView('location');
              } else {
                alert('Please enter a location first!');
              }
            }}
          >
            Enter Location
          </button>
          <button onClick={() => setView('home')}>Back</button>
        </div>
      )}

      {view === 'location' && (
        <div>
          <h2>Marine Data for {location}</h2>
          <p className="text-lg font-bold italic mb-4">PLEASE VIEW CONSOLE FOR RESULTS</p>
          <GrabAPI location={location}/> 
          <button onClick={() => setView('ocean')}>Back</button>
        </div>
      )}
    </div>
  );

  


  
}

export default App;
