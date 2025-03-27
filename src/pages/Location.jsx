import Navbar from '../components/CommonComponents/NavBar';
import LocationSearchBox from "../components/CommonComponents/LocationSearchBox";

export default function Location() {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <LocationSearchBox />
        </div>
    );
}