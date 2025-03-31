import styles from '../ComponentStyles.module.css';

function WaterCard() {
    return (
        <div className={styles['Water']}>
            <img src="src\images\Marine-icons\Waves.svg" alt="waves"/>
            <p>2.5M Wave Height</p>
            <img src="src\images\Marine-icons\Temperature.svg" alt="thermometer"/>
            <p>Sea Temp: 22°C</p>
        </div>

    );
}

export default WaterCard;