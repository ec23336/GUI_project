// This component is responsible for displaying the sunrise time in a card format.

// Import necessary libraries and components
import styles from '../ComponentStyles.module.css';
import SunriseIcon from '../../images/Marine-icons/Sunrise.svg';

// SunriseCard component
function SunriseCard({time}) {
    return (
        <div className={styles['Sun']}>
            {/* Display the sunrise icon */}
            <img src={SunriseIcon} alt="sunrise" className={styles['SunImage']}/>
            
            {/* Display the sunrise label */}
            <p>SUNRISE</p>
            
            {/* Display the actual sunrise time passed as prop */}
            <p>{time}</p>
        </div>

    );
}

// Export the SunriseCard component
export default SunriseCard;