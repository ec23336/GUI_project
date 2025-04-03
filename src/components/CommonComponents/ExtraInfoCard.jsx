// This component is responsible for showing marine data for a specific location.

// Import necessary libraries and components
import styles from '../ComponentStyles.module.css';

// ExtraInfoCard component
function ExtraInfoCard({location}) {
    return (
        <div className={styles['ExtraInfo']}>
            <p>Now Showing Marine Data</p>
            <p>For {location}</p>
        </div>

    );
}

// Export the ExtraInfoCard component
export default ExtraInfoCard;