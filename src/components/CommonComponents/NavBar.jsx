import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../ComponentStyles.module.css'; // Importing the styles
import AlertImg from '../../images/AlertImg.png'; // Import the image for the alert

const Navbar = () => {
    return (
        <div>
            <nav className={styles.navbar}>
                {/* Left side logo */}
                <NavLink to="/" className={styles.logo}>
                Nautical Weather
                </NavLink>
        
                {/* Right side links and alert icon */}
                <div className={styles['nav-links']}>
                <ul>
                    <li>
                    <NavLink 
                        to="/ocean" 
                        className={styles.navlink}
                        activeClassName={styles['active-link']}
                    >
                        Ocean
                    </NavLink>
                    </li>
                    <li>
                    <NavLink 
                        to="/map" 
                        className={styles.navlink}
                        activeClassName={styles['active-link']}
                    >
                        Map
                    </NavLink>
                    </li>
                    <li>
                    <NavLink 
                        to="/about" 
                        className={styles.navlink}
                        activeClassName={styles['active-link']}
                    >
                        <img src={AlertImg} alt="alerts" />
                    </NavLink>
                    </li>
                </ul>
                </div>
            </nav>
            <div className={styles['navbar-divider']}></div>
        </div>
    );
  };

export default Navbar;