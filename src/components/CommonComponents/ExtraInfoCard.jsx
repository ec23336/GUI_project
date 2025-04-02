import styles from '../ComponentStyles.module.css';

function ExtraInfoCard({location}) {
    return (
        <div className={styles['ExtraInfo']}>
            <p>Now Showing Marine Data</p>
            <p>For {location}</p>
        </div>

    );
}

export default ExtraInfoCard;