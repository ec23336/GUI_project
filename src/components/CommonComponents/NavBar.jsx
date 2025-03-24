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
                <div className={styles["nav-links"]}>
                    <ul>
                        <li>
                            {/* If using React Router v6, replace activeClassName as shown below */}
                            <NavLink 
                                to="/location" 
                                className={({ isActive }) => isActive ? styles["active-link"] : styles.navlink}
                                // activeClassName={styles["active-link"]}  // Use this if using React Router v5 or earlier
                            >
                                Ocean
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/map" 
                                className={({ isActive }) => isActive ? styles["active-link"] : styles.navlink}
                            >
                                Map
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about" 
                                className={({ isActive }) => isActive ? styles["active-link"] : styles.navlink}
                            >
                                <img src={AlertImg} alt="alerts" />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className={styles["navbar-divider"]}></div>
        </div>
    );
};

export default Navbar;