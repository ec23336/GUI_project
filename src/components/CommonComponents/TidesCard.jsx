
// TidesCard Component This component displays barometric pressure information in a card format.

// Import necessary libraries and components
import styles from '../ComponentStyles.module.css';
import { CircleGauge } from 'lucide-react';

// TidesCard component
function TidesCard({ pressure = "1013" }) {
    // This component displays the barometric pressure in millibars (mb)
    // Default pressure is set to 1013 mb which is average sea level pressure
    return (
        <div className={styles['Tides']}>
            <CircleGauge 
                size={48}
                className={styles['circle-gauge-icon']}
            />
            <p>BAROMETRIC PRESSURE: {pressure} mb</p>
        </div>
    );
}

// Export the TidesCard component
export default TidesCard;
