import styles from '../ComponentStyles.module.css';
import WindN from '../../images/Marine-icons/Arrows/WindN.svg';
import WindNE from '../../images/Marine-icons/Arrows/WindNE.svg';
import WindE from '../../images/Marine-icons/Arrows/WindE.svg';
import WindSE from '../../images/Marine-icons/Arrows/WindSE.svg';
import WindS from '../../images/Marine-icons/Arrows/WindS.svg';
import WindSW from '../../images/Marine-icons/Arrows/WindSW.svg';
import WindW from '../../images/Marine-icons/Arrows/WindW.svg';
import WindNW from '../../images/Marine-icons/Arrows/WindNW.svg';
import WindIcon from '../../images/Marine-icons/Wind.svg';
import RainCloudIcon from '../../images/Marine-icons/RainCloud.svg';


function WindCard({speed, direction, rainPercent}) {
    let windDirectionIcon;

    switch (direction) {
        case 'N':
            windDirectionIcon = WindN;
            break;
        case 'NE':
            windDirectionIcon = WindNE;
            break;
        case 'E':
            windDirectionIcon = WindE;
            break;
        case 'SE':
            windDirectionIcon = WindSE;
            break;
        case 'S':
            windDirectionIcon = WindS;
            break;
        case 'SW':
            windDirectionIcon = WindSW;
            break;
        case 'W':
            windDirectionIcon = WindW;
            break;
        case 'NW':
            windDirectionIcon = WindNW;
            break;
        default:
            windDirectionIcon = WindIcon; // Default icon if direction is not recognized
    }

    return (
        <div className={styles.WindCard}>
            <div className={styles.WindSpeed}>
                <img src={WindIcon} alt="Wind speed" className={styles.WindImages}/>
                <p>{speed}KT</p>
            </div>
            <div className={styles.WindDirection}>
                <img src={windDirectionIcon} alt="Wind direction" className={styles.WindImages}/>
                <p>{direction}</p>
            </div>
            <div className={styles.RainChance}>
                <img src={RainCloudIcon} alt="Rain chance" className={styles.WindImages}/>
                <p>{rainPercent}%</p>
            </div>
        </div>
    );

    
}

export default WindCard;

