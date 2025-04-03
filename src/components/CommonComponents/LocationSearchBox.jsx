import React, { useState } from 'react';
import styles from '../ComponentStyles.module.css';

const LocationSearchBox = ({ onSearch }) => {
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.trim()) {
            onSearch(location);
        }
    };

    return (
        <div className={styles['search-container']}>
            <form onSubmit={handleSubmit} className={styles['search-form']}>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location (city, country)"
                    className={styles['search-input']}
                />
                <button 
                    type="submit"
                    className={styles['search-button']}
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default LocationSearchBox;