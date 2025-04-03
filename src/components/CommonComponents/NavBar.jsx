import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../ComponentStyles.module.css';
import AlertBell from './Alert';

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

export default Navbar;