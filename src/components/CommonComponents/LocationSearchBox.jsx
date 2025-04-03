// This component is responsible for providing a search box for users to input a location (city or country) 
// and trigger a search action.

// Import necessary libraries and components
import React, { useState } from 'react';
import styles from '../ComponentStyles.module.css';

// LocationSearchBox component
const LocationSearchBox = ({ onSearch }) => {
    const [location, setLocation] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.trim()) {
            onSearch(location);
        }
    };

    // Render the search box
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

// Export the LocationSearchBox 
export default LocationSearchBox;