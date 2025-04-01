import styles from '../ComponentStyles.module.css';


function FishingConditions() {
    return (
        <div className={styles.fishingConditions}>
            <div className={styles.conditionRow}>
                <div className={styles.conditionItem}>
                  
                    <span className={styles.conditionLabel}>Prime Fishing Time:</span>
                </div>
                <span className={styles.conditionValue}>6AM - 9AM</span>
            </div>
            
            <div className={styles.conditionRow}>
                <div className={styles.conditionItem}>
                    
                    <span className={styles.conditionLabel}>Current Flow:</span>
                </div>
                <div className={styles.currentFlow}>
                    <span className={styles.conditionValue}>L8KT</span>
                    <span className={styles.flowDirection}>5W</span>
                </div>
            </div>
        </div>
    );
}

export default FishingConditions;