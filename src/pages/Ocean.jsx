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

export default function Ocean() {
    return (
        <div>
          <header>
            <Navbar/>
          </header>
          <div className={styles["ocean-middle"]}>
            <div className={styles["ocean-c"]}>
              <SunriseCard />
              <TidesCard />
            </div>
            <div className={styles["ocean-c"]}>
              <p>Now showing ...</p>
              <WeatherCard temperature={25} weatherIcon="sunny" />
              <WindCard />
              <ExtraInfoCard />
            </div>
            <div className={styles["ocean-c"]}>
              <SunsetCard />
              <WaterCard />
            </div>
          </div>
          <div className={styles["ocean-bottom"]}>
            <StormCard />
            <VisibilityCard />
          </div>
        </div>
    );
}
