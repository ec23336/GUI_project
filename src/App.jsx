import './App.css'
import GrabAPI from './components/API';
import { useState } from 'react';
import MarineDataAPI from './components/MarineDataAPI';

function App() {
  const [view, setView] = useState('home'); // 'home', 'ocean', 'location', 'marine'
  const [location, setLocation] = useState(''); // Store the entered location
  const [marineLocation, setMarineLocation] = useState(''); // For marine weather

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

          <button onClick={() => setView('marine')}>Go to Marine Data</button>
          <button onClick={() => setView('home')}>Back</button>
          
        </div>
      )}

      {view === 'location' && (
        <div>
          <h2>Weather Data for {location}</h2>
          <p className="text-lg font-bold italic mb-4">PLEASE VIEW CONSOLE FOR RESULTS</p>
          <GrabAPI location={location}/> 
          <button onClick={() => setView('ocean')}>Back</button>
        </div>
      )}

      {view === 'marine' && (
        <div>
          <h2>Marine Weather Data</h2>
          <p>Enter a coastal location for marine weather data:</p>
          <input 
            type="text" 
            placeholder="Enter location..." 
            value={marineLocation} 
            onChange={(e) => setMarineLocation(e.target.value)} 
          />
          <button
            onClick={() => {
              if (marineLocation.trim()) {
                setView('marineData');
              } else {
                alert('Please enter a location first!');
              }
            }}
          >
            Get Marine Data
          </button>
          <button onClick={() => setView('ocean')}>Back</button>
        </div>
      )}

      {view === 'marineData' && (
        <div>
          <h2>Marine Weather Data for {marineLocation}</h2>
          <p className="text-lg font-bold italic mb-4">PLEASE VIEW CONSOLE FOR RESULTS</p>
          <MarineDataAPI marineLocation={marineLocation}/>
          <button onClick={() => setView('marine')}>Back</button>
        </div>
      )}
    </div>

  );

  


  
}

export default App;
