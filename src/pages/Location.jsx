// Location page component
import Navbar from '../components/CommonComponents/NavBar';


export default function Location() {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <body>
                <h2>Marine Data for {location}</h2>
                <p className="text-lg font-bold italic mb-4">PLEASE VIEW CONSOLE FOR RESULTS</p>
                <GrabAPI location={location}/> 
                <button onClick={() => setView('ocean')}>Back</button>
            </body>
        </div>
    );
}