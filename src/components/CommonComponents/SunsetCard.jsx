import styles from '../ComponentStyles.module.css';
import SunsetIcon from '../../images/Marine-icons/Sunset.svg';

function SunsetCard({time}) {
    return (
        <div className={styles['Sun']}>
            <img src={SunsetIcon} alt="sunset" className={styles['SunImage']}/>
            <p>SUNSET</p>
            <p>{time}</p>
        </div>

    );
}

export default SunsetCard;