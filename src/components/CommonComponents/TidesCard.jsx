import styles from '../ComponentStyles.module.css';

function TidesCard() {
    return (
        <div className={styles['Tides']}>
            <p>High Tide: 14:00</p>
            <img src="src\images\Marine-icons\Tides.svg" alt="tides"/>
            <p>Low Tide: 20:30</p>
        </div>

    );
}

export default TidesCard;