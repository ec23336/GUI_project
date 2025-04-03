// SunsetCard Component This component displays sunset time information in a card format.
import styles from '../ComponentStyles.module.css';
import SunsetIcon from '../../images/Marine-icons/Sunset.svg';

function SunsetCard({time}) {
    return (
        <div className={styles['Sun']}>
            {/* Display the sunset icon */}
            <img src={SunsetIcon} alt="sunset" className={styles['SunImage']}/>
            
            {/* Display the sunset label */}
            <p>SUNSET</p>
            
            {/* Display the actual sunset time passed as prop */}
            <p>{time}</p>
        </div>
    );
}

export default SunsetCard;