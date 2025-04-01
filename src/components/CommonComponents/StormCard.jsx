import styles from '../ComponentStyles.module.css';

function StormCard() {
    return (
        <div className={styles['Storm']}>
            <h3>STORM ALERT</h3>
            <p>Thunderstorm expected in 4 hours</p>
        </div>
    );
}

export default StormCard;