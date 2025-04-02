import styles from '../ComponentStyles.module.css';
import moon from '../../images/Marine-icons/moon.svg';
import boat from '../../images/Marine-icons/ship.svg';

function FishingConditions({fishTime, currentFlow}) {
    return (
        <div className={styles.fishingConditions}>
            <div className={styles.conditionsLeft}>
                <img src={moon} alt="moon" className={styles.moonIcon}/>
                <span>Prime Fishing Time:</span>
                <span>{fishTime}</span>
            </div>
            <div className={styles.conditionsRight}>
                <img src={boat} alt="boat" className={styles.boatIcon}/>
                <span>Current Flow:</span>
                <span>{currentFlow}</span>
            </div>
        </div>
    );
}

export default FishingConditions;