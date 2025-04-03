// FILE: TidesCard.jsx AT ROOT/GUI_project\src\components\CommonComponents\TidesCard.jsx

// Import necessary libraries and components
import styles from '../ComponentStyles.module.css';
import { CircleGauge } from 'lucide-react';

// TidesCard component
function TidesCard({ pressure = "1013" }) {
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
