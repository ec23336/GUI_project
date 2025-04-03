// SunriseCard Component This component displays sunrise time information in a card format.
import styles from '../ComponentStyles.module.css';
import SunriseIcon from '../../images/Marine-icons/Sunrise.svg';

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

export default SunriseCard;