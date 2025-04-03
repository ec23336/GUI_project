import styles from '../ComponentStyles.module.css';
import { 
    ArrowUp, ArrowUpRight, ArrowRight, ArrowDownRight,
    ArrowDown, ArrowDownLeft, ArrowLeft, ArrowUpLeft
} from 'lucide-react';
import WindIcon from '../../images/Marine-icons/Wind.svg';
import RainCloudIcon from '../../images/Marine-icons/RainCloud.svg';

function WindCard({speed, direction, rainPercent}) {
    // Common props for all arrow icons
    const arrowProps = {
        className: styles.WindImages,
        size: 24,
        color: "black",
        strokeWidth: 2
    };

    // Get the appropriate direction icon
    const getDirectionIcon = () => {
        switch (direction) {
            case 'N': return <ArrowUp {...arrowProps} />;
            case 'NNE':
            case 'NE': return <ArrowUpRight {...arrowProps} />;
            case 'ENE':
            case 'E': return <ArrowRight {...arrowProps} />;
            case 'ESE':
            case 'SE': return <ArrowDownRight {...arrowProps} />;
            case 'SSE':
            case 'S': return <ArrowDown {...arrowProps} />;
            case 'SSW':
            case 'SW': return <ArrowDownLeft {...arrowProps} />;
            case 'WSW':
            case 'W': return <ArrowLeft {...arrowProps} />;
            case 'WNW':
            case 'NW':
            case 'NNW': return <ArrowUpLeft {...arrowProps} />;
            default: return <ArrowUp {...arrowProps} />;
        }
    };

    return (
        <div className={styles.WindCard}>
            <div className={styles.WindSpeed}>
                <img src={WindIcon} alt="Wind speed" className={styles.WindImages}/>
                <p>{speed}KT</p>
            </div>
            <div className={styles.WindDirection}>
                {getDirectionIcon()}
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

