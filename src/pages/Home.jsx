import React, { useState } from "react";
import Navbar from '../components/CommonComponents/NavBar';
import WeatherCard from '../components/CommonComponents/WeatherCard';
import DateCard from '../components/CommonComponents/DateCard';
import TypeLocationBar from '../components/CommonComponents/TypeLocationBar';
import DisplayLocationCard from '../components/CommonComponents/DisplayLocationCard';
import ForecastList from "../components/CommonComponents/ForecastList";

export default function Home() {
  const [location, setLocation] = useState("Loading..."); // State for local UI updates

  const handleLocationSearch = (newLocation) => {
    if (newLocation.trim() === "") {
      setLocation("Loading...");
    } else {
      setLocation(newLocation);
    }
  };

  return (
    <div>
      <header>
        <Navbar />
        <TypeLocationBar onSearch={handleLocationSearch} />
        <DisplayLocationCard locationProp={location} />
        <DateCard />
        <WeatherCard />
        <ForecastList />
      </header>
    </div>
  );
}