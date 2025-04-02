import styles from '../ComponentStyles.module.css';
import alertIcon from '../../images/Marine-icons/OctAlert.svg';

function StormCard({ hours }) {
    let message;
    
    if (hours === 'None') {
        message = "No storm alerts at this time.";
    } else {
        message = "Thunderstorm expected in " + hours + " hours.";
    }
    
    return (
        <div className={styles['Storm']}>
            <img src={alertIcon} alt="alert icon" className={styles['alertIcon']} />
            <h3>STORM ALERT</h3>
            <p>{message}</p>
        </div>
    );
}

export default StormCard;