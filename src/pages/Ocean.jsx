import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../components/OceanStyles.module.css';
import styles from '../components/ComponentStyles.module.css';
import Navbar from '../components/CommonComponents/NavBar';
import WeatherCard from '../components/CommonComponents/WeatherCard';
import SunriseCard from '../components/CommonComponents/SunriseCard';
import SunsetCard from '../components/CommonComponents/SunsetCard';
import WindCard from '../components/CommonComponents/WindCard';
import ExtraInfoCard from '../components/CommonComponents/ExtraInfoCard';
import TidesCard from '../components/CommonComponents/TidesCard';
import WaterCard from '../components/CommonComponents/WaterCard';
import StormCard from '../components/CommonComponents/StormCard';
import VisibilityCard from '../components/CommonComponents/VisibilityCard';
import FishingConditions from '../components/CommonComponents/conditions';

export default function Ocean() {
    const location = useLocation();
    const [marineLocation, setMarineLocation] = useState('');

    useEffect(() => {
        // Extract location from URL query parameters
        const queryParams = new URLSearchParams(location.search);
        const locationParam = queryParams.get('location');
        
        if (locationParam) {
            setMarineLocation(locationParam);
            console.log("Location set from URL:", locationParam);
        }
    }, [location]);

    return (
        <div>
          <header>
            <Navbar/>
          </header>
          
          {/* Render MarineDataAPI component to fetch and log data */}
          {marineLocation && <MarineDataAPI marineLocation={marineLocation} />}
          
          <div className={styles["ocean-middle"]}>
            <div className={styles["ocean-c"]}>
              <SunriseCard />
              <TidesCard />
            </div>
            <div className={styles["ocean-c"]}>
              <p>Now showing {marineLocation || '...'}</p>
              <WeatherCard temperature={25} weatherIcon="sunny" />
              <WindCard />
              <FishingConditions/>
              <ExtraInfoCard />
            </div>
            <div className={styles['OceanBottom']}>
              <StormCard hours="None" />
              <VisibilityCard kilometers={5} />
            </div>
          </div>
        </div>
    );
}

// FishingConditions fishTime="5:00 AM - 7:00 AM" currentFlow="1.8KT SW" /
//StormCard hours="None" /
//VisibilityCard kilometers={5} /
//WindCard speed="12" direction="SW" rainPercent="14" /
//SunriseCard time="6:00 AM" /
//SunsetCard time="7:00 PM" /
//WeatherCard customTemperature='23' customWeatherIcon='rainy'/
//TidesCard high="12:00 PM" low="6:00 PM" /
//WaterCard waveHeight='2.5' waterTemp='22' /