// This component is responsible for displaying weather alerts with a bell icon.

// Import necessary libraries and components
import styles from '../ComponentStyles.module.css';
import moon from '../../images/Marine-icons/moon.svg';
import { Tornado } from 'lucide-react'; // Import Tornado icon from Lucide

// FishingConditions component
function FishingConditions({moonPhase, currentFlow}) {
    return (
        <div className={styles.fishingConditions}>
            <div className={styles.conditionsLeft}>
                <img src={moon} alt="moon" className={styles.moonIcon}/>
                <span>Moon Phase:</span>
                <span>{moonPhase}</span>
            </div>
            <div className={styles.conditionsRight}>
                {/* Tornado icon with blue color to match previous ship icon */}
                <Tornado 
                    size={24}  
                    color="blue" 
                    className={styles.boatIcon} 
                />
                <span>Wind Gust:</span>
                <span>{currentFlow}</span>
            </div>
        </div>
    );
}

// Export the FishingConditions component
export default FishingConditions;