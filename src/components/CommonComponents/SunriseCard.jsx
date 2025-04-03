// This component is responsible for displaying the sunrise time in a card format.

// Import necessary libraries and components
import styles from '../ComponentStyles.module.css';
import SunriseIcon from '../../images/Marine-icons/Sunrise.svg';

// SunriseCard component
function SunriseCard({time}) {
    return (
        <div className={styles['Sun']}>
            <img src={SunriseIcon} alt="sunrise" className={styles['SunImage']}/>
            <p>SUNRISE</p>
            <p>{time}</p>
        </div>

    );
}

// Export the SunriseCard component
export default SunriseCard;