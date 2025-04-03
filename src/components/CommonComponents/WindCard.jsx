import styles from '../ComponentStyles.module.css';
import { 
    ArrowUp, 
    ArrowUpRight, 
    ArrowRight, 
    ArrowDownRight,
    ArrowDown,
    ArrowDownLeft,
    ArrowLeft,
    ArrowUpLeft
} from 'lucide-react'; // Import Lucide icons
import WindIcon from '../../images/Marine-icons/Wind.svg';
import RainCloudIcon from '../../images/Marine-icons/RainCloud.svg';

function WindCard({speed, direction, rainPercent}) {
    // Function to get the appropriate Lucide icon based on wind direction
    const getWindDirectionIcon = (dir) => {
        // Common props for all arrow icons
        const arrowProps = {
            className: styles.WindImages, // Use the same class as other icons
            size: 24, // Match size with other icons
            color: "black", // Set color to black
            strokeWidth: 2 // Adjust stroke width for visibility
        };

        switch (dir) {
            case 'N':
                return <ArrowUp {...arrowProps} />;
            case 'NNE':
            case 'NE':
                return <ArrowUpRight {...arrowProps} />;
            case 'ENE':
            case 'E':
                return <ArrowRight {...arrowProps} />;
            case 'ESE':
            case 'SE':
                return <ArrowDownRight {...arrowProps} />;
            case 'SSE':
            case 'S':
                return <ArrowDown {...arrowProps} />;
            case 'SSW':
            case 'SW':
                return <ArrowDownLeft {...arrowProps} />;
            case 'WSW':
            case 'W':
                return <ArrowLeft {...arrowProps} />;
            case 'WNW':
            case 'NW':
            case 'NNW':
                return <ArrowUpLeft {...arrowProps} />;
            default:
                return <ArrowUp {...arrowProps} />; // Default to North
        }
    };

    // Get the appropriate direction icon
    const DirectionIcon = getWindDirectionIcon(direction);

    return (
        <div className={styles.WindCard}>
            <div className={styles.WindSpeed}>
                <img src={WindIcon} alt="Wind speed" className={styles.WindImages}/>
                <p>{speed}KT</p>
            </div>
            <div className={styles.WindDirection}>
                {DirectionIcon}
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

