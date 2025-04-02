import styles from '../ComponentStyles.module.css';
import bellIcon from '../../images/Marine-icons/Bell.svg';

function VisibilityCard({kilometers}) {
    let risk;

    if (kilometers > 10) {
        risk = 'None';
    } else if (kilometers > 5) {
        risk = 'Low';
    } else if (kilometers > 2) {
        risk = 'Moderate';
    } else {
        risk = 'High';
    }

    return (
        <div className={styles['Visibility']}>
            <img src={bellIcon} alt="bell icon" className={styles['bellIcon']} />
            <p>Visibility: {kilometers}km</p>
            <p>Risk: {risk}</p>
        </div>
    );
}

export default VisibilityCard;
