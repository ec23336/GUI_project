import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Global styles
import App from './App.jsx';

function AppWithFonts() {
  useEffect(() => {
    // Adding font links to the document head on component mount
    const link1 = document.createElement('link');
    link1.rel = 'preconnect';
    link1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link1);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'true';
    document.head.appendChild(link2);

    const link3 = document.createElement('link');
    link3.href = 'https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Fredoka:wght@300..700&display=swap';
    link3.rel = 'stylesheet';
    document.head.appendChild(link3);

    // Cleanup function to remove links when component unmounts
    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
      document.head.removeChild(link3);
    };
  }, []);

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithFonts />
  </StrictMode>
);