import styles from '../ComponentStyles.module.css';

function SunsetCard() {
    return (
        <div className={styles['Sun']}>
            <img src="src\images\Marine-icons\Sunset.svg" alt="sunset"/>
            <p>SUNSET</p>
            <p>18:00</p>
        </div>

    );
}

export default SunsetCard;