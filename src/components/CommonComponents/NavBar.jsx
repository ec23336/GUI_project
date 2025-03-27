import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../ComponentStyles.module.css'; // Importing the styles
import AlertBell from './Alert'; // Import the AlertBell component instead of using the image directly

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
                            <AlertBell /> {/* Replace the direct image with AlertBell component */}
                        </li>
                    </ul>
                </div>
            </nav>
            <div className={styles["navbar-divider"]}></div>
        </div>
    );
};

export default Navbar;