// This component is responsible for displaying marine data such as wave height and water temperature in a card format.

// Import necessary libraries and components
import styles from '../ComponentStyles.module.css';
import WavesIcon from '../../images/Marine-icons/Waves.svg';
import WaterTempIcon from '../../images/Marine-icons/Temperature.svg';

// WaterCard component
function WaterCard({waveHeight, waterTemp}) {
    return (
        <div className={styles['Water']}>
            <div className={styles['WaveHeight']}>
                <div className={styles['WaveHeightIcon']}>
                    <img src={WavesIcon} alt="waves" className={styles['WavesImage']}/>
                </div>
                <div className={styles['WaveHeightText']}>
                    <p>Wave Height: {waveHeight}M</p>
                </div>
            </div>
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

// Export the WaterCard component
export default WaterCard;