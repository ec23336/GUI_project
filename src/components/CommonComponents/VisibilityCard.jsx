import styles from '../ComponentStyles.module.css';

function VisibilityCard() {
    return (
        <div className={styles['Visibility']}>
            <h3>Visibility</h3>
            <p>4km | Fog Risk: Moderate</p>
        </div>
    );
}

export default VisibilityCard;