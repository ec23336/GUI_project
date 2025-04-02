import styles from '../ComponentStyles.module.css';
import TidesIcon from '../../images/Marine-icons/Tides.svg';

function TidesCard({high, low}) {
    return (
        <div className={styles['Tides']}>
            <p>High Tide: {high}</p>
            <img src={TidesIcon} alt="tides"/>
            <p>Low Tide: {low}</p>
        </div>

    );
}

export default TidesCard;