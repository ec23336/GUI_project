import styles from '../ComponentStyles.module.css';
import SunriseIcon from '../../images/Marine-icons/Sunrise.svg';

function SunriseCard({time}) {
    return (
        <div className={styles['Sun']}>
            <img src={SunriseIcon} alt="sunrise" className={styles['SunImage']}/>
            <p>SUNRISE</p>
            <p>{time}</p>
        </div>

    );
}

export default SunriseCard;