// WaterCard.jsx Displays water-related information including wave height and water temperature
import styles from '../ComponentStyles.module.css';
import WavesIcon from '../../images/Marine-icons/Waves.svg';
import WaterTempIcon from '../../images/Marine-icons/Temperature.svg';


function WaterCard({waveHeight, waterTemp}) {
    return (
        <div className={styles['Water']}>
            {/* Wave Height Section */}
            <div className={styles['WaveHeight']}>
                <div className={styles['WaveHeightIcon']}>
                    <img src={WavesIcon} alt="waves" className={styles['WavesImage']}/>
                </div>
                <div className={styles['WaveHeightText']}>
                    <p>Wave Height: {waveHeight}M</p>
                </div>
            </div>
            
            {/* Water Temperature Section */}
            <div className={styles['WaterTemp']}>
                <div className={styles['WaterTempIcon']}>
                    <img src={WaterTempIcon} alt="water temperature" className={styles['WaterTempImage']}/>
                </div>
                <div className={styles['WaterTempText']}>
                    <p>Water Temperature: {waterTemp}°C</p>
                </div>
            </div>
        </div>
    );
}

export default WaterCard;