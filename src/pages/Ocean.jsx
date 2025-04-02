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
import FishingConditions from '../components/CommonComponents/Conditions';
import { Sun } from 'lucide-react';


export default function Ocean() {
    return (
        <div>
          <header>
            <Navbar/>
          </header>
          <div className={styles['OceanContainer']}>
            <div className={styles['OceanTop']}>
              <div className={styles['OceanTopLeft']}>
                <SunriseCard time="6:00 AM" />
                <TidesCard high="12:00 PM" low="6:00 PM" />
              </div>
              <div className={styles['OceanTopMiddle']}>
                <ExtraInfoCard location="Plymouth" />
                <WeatherCard customTemperature='23' customWeatherIcon='rainy'/>
                <WindCard speed="12" direction="SW" rainPercent="14" />
                <FishingConditions fishTime="5:00 AM - 7:00 AM" currentFlow="1.8KT SW" />
              </div>
              <div className={styles['OceanTopRight']}>
                <SunsetCard time="7:00 PM" />
                <WaterCard waveHeight='2.5' waterTemp='22' />
              </div>
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