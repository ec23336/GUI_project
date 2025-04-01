import styles from '../ComponentStyles.module.css';

function WindCard() {
    return (
        <div className={styles['Wind']}>
            <div className={styles['wind-item']}>
                <span className={styles['wind-icon']}></span>
                <span className={styles['wind-value']}>12KT</span>
                <span className={styles['wind-label']}>Speed</span>
            </div>
            <div className={styles['wind-item']}>
                
                <span className={styles['wind-value']}>NE</span>
                <span className={styles['wind-label']}>Direction</span>
            </div>
            <div className={styles['wind-item']}>
                
                <span className={styles['wind-value']}>38%</span>
                <span className={styles['wind-label']}>Humidity</span>
            </div>
        </div>

    );
}

export default WindCard;