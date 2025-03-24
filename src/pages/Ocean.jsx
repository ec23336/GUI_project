// Ocean page component
import Navbar from '../components/CommonComponents/NavBar';


export default function Ocean() {
    return (
        <div>
        <header>
            <Navbar />
        </header>
        <body>
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
          
        </body>
        </div>
    );
}
