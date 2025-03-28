import styles from '../ComponentStyles.module.css';

function SunriseCard() {
    return (
        <div className={styles['Sun']}>
            <img src="src\images\Marine-icons\Sunrise.svg" alt="sunrise"/>
            <p>SUNRISE</p>
            <p>6:00</p>
        </div>

    );
}

export default SunriseCard;