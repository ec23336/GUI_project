import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Ocean from "./pages/Ocean.jsx";
import Map from "./pages/Map.jsx";
import Location from "./pages/Location.jsx";

/**
 * AppRouter - Main router component that handles navigation between pages
 * Sets up routes for the application's different pages:
 * - Home page (default route)
 * - Ocean page
 * - Map page
 * - Location page
 */
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ocean" element={<Ocean />} />
        <Route path="/map" element={<Map />} />
        <Route path="/location" element={<Location />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;