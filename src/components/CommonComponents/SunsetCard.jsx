// This component displays the sunset time in a card format with an icon and text.

// Import necessary libraries and components
import styles from '../ComponentStyles.module.css';
import SunsetIcon from '../../images/Marine-icons/Sunset.svg';

// SunsetCard component
function SunsetCard({time}) {
    return (
        <div className={styles['Sun']}>
            <img src={SunsetIcon} alt="sunset" className={styles['SunImage']}/>
            <p>SUNSET</p>
            <p>{time}</p>
        </div>

    );
}

// Export the SunsetCard component
export default SunsetCard;