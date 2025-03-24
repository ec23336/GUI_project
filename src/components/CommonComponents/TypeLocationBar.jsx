import React, { useState } from "react";
import styles from "../ComponentStyles.module.css"; // Import CSS
import MagnifyingGlass from "../../images/magnifyingGlass.png"; // Import search icon

function TypeLocationBar({ onSearch }) {
    const [location, setLocation] = useState(""); // Location input state

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(location); // Call the function passed from the parent component to update the location
        setLocation(""); // Clear the input field after submission
    };

    return (
        <form className={styles.typeLocationBar} onSubmit={handleSubmit}>
            {/* Magnifying glass icon (acts as submit button) */}
            <button type="submit" className={styles.searchButton}>
                <img src={MagnifyingGlass} alt="Search" />
            </button>

            {/* Input field */}
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)} // Update location state on user input
                placeholder="Type location..."
                className={styles.inputField}
            />
        </form>
    );
}

export default TypeLocationBar;