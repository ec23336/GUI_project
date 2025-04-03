import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet"; // Import Leaflet JS - needed by Windy
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/CommonComponents/NavBar";
import './WindyMap.css'; // Custom Windy styles

export default function Map() {
    const windyContainerRef = useRef(null);
    const scriptRef = useRef(null);
    const [isWindyLoaded, setIsWindyLoaded] = useState(false);
    const windyInitializedRef = useRef(false);

    // Handle script loading
    useEffect(() => {
        if (isWindyLoaded || scriptRef.current) {
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://api.windy.com/assets/map-forecast/libBoot.js';
        script.async = true;
        scriptRef.current = script;

        script.onload = () => {
            console.log('Windy script loaded successfully');
            setIsWindyLoaded(true);
        };

        script.onerror = (e) => {
            console.error('Error loading Windy script:', e);
        };

        document.body.appendChild(script);

        return () => {
            if (scriptRef.current && document.body.contains(scriptRef.current)) {
                document.body.removeChild(scriptRef.current);
                scriptRef.current = null;
            }
            setIsWindyLoaded(false);
        };
    }, []);

    // Initialize Windy API
    useEffect(() => {
        if (!isWindyLoaded || windyInitializedRef.current) {
            return;
        }

        if (windyContainerRef.current) {
            windyContainerRef.current.innerHTML = '';
        }

        const options = {
            key: 'HImK56kZl6eiN1o79fql78c7ZDDaXOUv',
            lat: 51.5074,
            lon: -0.1278,
            zoom: 5,
            timestamp: Math.round(Date.now() / 1000),
            hourFormat: '12h',
        };

        const initializeWindy = () => {
            if (!window.windyInit) {
                console.error('Windy API not available');
                return;
            }

            try {
                window.windyInit(options, windyAPI => {
                    console.log('Windy API initialized successfully');
                    windyInitializedRef.current = true;
                    
                    const { store } = windyAPI;
                    store.set('overlay', 'wind');
                    
                    // Apply CSS fixes to ensure UI elements are visible
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

        const timer = setTimeout(initializeWindy, 100);

        return () => {
            clearTimeout(timer);
            windyInitializedRef.current = false;
            
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
            <div 
                id="windy" 
                ref={windyContainerRef}
                className="windy-map-container"
                style={{ width: '100%', height: '700px' }}
            ></div>
        </div>
    );
}
