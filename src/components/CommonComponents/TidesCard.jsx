// FILE: TidesCard.jsx AT ROOT/GUI_project\src\components\CommonComponents\TidesCard.jsx

import styles from '../ComponentStyles.module.css';
import { CircleGauge } from 'lucide-react';

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

export default TidesCard;
