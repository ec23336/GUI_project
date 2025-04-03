// ExtraInfoCard Component This component displays additional information about the data being shown for a location.
import styles from '../ComponentStyles.module.css';

function ExtraInfoCard({location}) {
    return (
        <div className={styles['ExtraInfo']}>
            {/* Display informational header text */}
            <p>Now Showing Marine Data</p>
            
            {/* Display the location for which the data is being shown */}
            <p>For {location}</p>
        </div>

    );
}

export default ExtraInfoCard;