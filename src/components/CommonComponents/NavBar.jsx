// This component is responsible for displaying the navigation bar of the application. 
// It includes links to different sections of the app and an alert bell icon.

// Import necessary libraries and components
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../ComponentStyles.module.css';
import AlertBell from './Alert';

// Navbar component
const Navbar = () => {
    return (
        <div>
            <nav className={styles.navbar}>
                <NavLink to="/" className={styles.logo}> 
                    Nautical Weather
                </NavLink>
        
                <div className={styles["nav-links"]}>
                    <ul>
                        <li>
                            <NavLink 
                                to="/location" 
                                className={({ isActive }) => isActive ? styles["active-link"] : styles.navlink}
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
                            <AlertBell />
                        </li>
                    </ul>
                </div>
            </nav>
            <div className={styles["navbar-divider"]}></div>
        </div>
    );
};

// Export the Navbar component
export default Navbar;