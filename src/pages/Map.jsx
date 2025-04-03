// Map.jsx - Interactive weather map page using Windy API for detailed visualizations
// This component integrates the Windy.com API to provide an interactive weather map
// with multiple data layers including wind, rain, temperature, and marine conditions

import "leaflet/dist/leaflet.css"; 
import L from "leaflet"; 
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/CommonComponents/NavBar";
import './WindyMap.css';

export default function Map() {  
    // References and state for managing the Windy map instance
    // Reference to the DOM element where the Windy map will be rendered
    const windyContainerRef = useRef(null); 
    // Reference to track the script element for the Windy API
    const scriptRef = useRef(null); 
    // State to track whether the Windy API script has loaded
    const [isWindyLoaded, setIsWindyLoaded] = useState(false); 
    // Reference to track whether the Windy map has been initialized
    const windyInitializedRef = useRef(false); 
    
    // First useEffect: Load the Windy API script
    // This handles the dynamic script loading and cleanup
    useEffect(() => {
        if (isWindyLoaded || scriptRef.current) {
            return;
        }

        // Create and configure the script element
        const script = document.createElement('script');
        script.src = 'https://api.windy.com/assets/map-forecast/libBoot.js';
        script.async = true;
        scriptRef.current = script;

        // Set up event handlers for script loading
        script.onload = () => {
            console.log('Windy script loaded successfully');
            setIsWindyLoaded(true);
        };

        script.onerror = (e) => {
            console.error('Error loading Windy script:', e);
        };

        // Add script to document
        document.body.appendChild(script);

        // Cleanup function to remove script when component unmounts
        return () => {
            if (scriptRef.current && document.body.contains(scriptRef.current)) {
                document.body.removeChild(scriptRef.current);
                scriptRef.current = null;
            }
            setIsWindyLoaded(false);
        };
    }, []);

    // Second useEffect: Initialize the Windy map when script is loaded
    // This configures and renders the actual map instance once the API is available
    useEffect(() => {
        if (!isWindyLoaded || windyInitializedRef.current) {
            return;
        }

        // Clear container if it exists
        if (windyContainerRef.current) {
            windyContainerRef.current.innerHTML = '';
        }

        // Configure Windy API options
        // These settings control the initial map view and display preferences
        const options = {
            key: 'HImK56kZl6eiN1o79fql78c7ZDDaXOUv', // API key for Windy services
            lat: 51.5074, // Default latitude (London)
            lon: -0.1278, // Default longitude (London)
            zoom: 5, // Initial zoom level
            timestamp: Math.round(Date.now() / 1000), // Current timestamp for forecast
            hourFormat: '12h', // 12-hour time format
        };

        // Initialize Windy map with options
        const initializeWindy = () => {
            if (!window.windyInit) {
                console.error('Windy API not available');
                return;
            }

            try {
                // Initialize the Windy API with our configuration
                window.windyInit(options, windyAPI => {
                    console.log('Windy API initialized successfully');
                    windyInitializedRef.current = true;
                    
                    const { store } = windyAPI;
                    store.set('overlay', 'wind'); // Set default overlay to wind data
                    
                    // Apply CSS fixes to ensure UI elements are visible
                    // This addresses z-index and visibility issues with the Windy controls
                    setTimeout(() => {
                        const elementsToFix = [
                            '.menu-controls', 
                            '.picker-content',
                            '.leaflet-control-zoom',
                            '.leaflet-control',
                            '#bottom',
                            '.main-controls',
                            '.select-container',
                            '.dropdown-menu',
                            '.options',
                            '#detail',
                            '.controls'
                        ];
                        
                        // Fix visibility of each element
                        elementsToFix.forEach(selector => {
                            document.querySelectorAll(selector).forEach(el => {
                                if (el) {
                                    el.style.display = 'block';
                                    el.style.visibility = 'visible';
                                    el.style.opacity = '1';
                                    el.style.zIndex = '1000';
                                    el.style.pointerEvents = 'auto';
                                }
                            });
                        });
                        
                        // Ensure Leaflet controls are visible
                        document.querySelectorAll('.leaflet-control-container').forEach(control => {
                            if (control) {
                                control.style.display = 'block';
                                control.style.visibility = 'visible';
                                control.style.zIndex = '1000';
                            }
                        });
                    }, 1000);
                });
            } catch (error) {
                console.error('Error initializing Windy:', error);
            }
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(initializeWindy, 100);

        // Cleanup function
        return () => {
            clearTimeout(timer);
            windyInitializedRef.current = false;
            
            // Clean up Windy map instance if it exists
            try {
                if (window.W && window.W.map) {
                    window.W.map.remove();
                }
            } catch (e) {
                console.warn('Error cleaning up Windy map:', e);
            }
        };
    }, [isWindyLoaded]);

    return (
        <div>
            <header>
                <Navbar />
            </header>
            {/* Windy map container - styled with custom CSS to ensure UI visibility */}
            <div 
                id="windy" 
                ref={windyContainerRef}
                className="windy-map-container"
                style={{ width: '100%', height: '700px' }}
            ></div>
        </div>
    );
}
