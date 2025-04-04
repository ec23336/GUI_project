// This component displays the current date in a specific format: "Tuesday, 25th February".

// Import necessary libraries and components
import React, { useState, useEffect } from 'react';

// CurrentDate component
function CurrentDate() {
  const [date, setDate] = useState(new Date());

  // Set up an interval to update the date every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to get the correct suffix for the day (st, nd, rd, th)
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Special case for 11th, 12th, 13th, etc.
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  // Format the date as "Tuesday, 25th February"
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const weekday = date.toLocaleString('en-US', { weekday: 'long' });
  const dayWithSuffix = `${day}${getDaySuffix(day)}`;

  const formattedDate = `${weekday}, ${dayWithSuffix} ${month}`;

  return (
    <div className="current-date">
      <p>{formattedDate}</p>
    </div>
  );
}

// Export the CurrentDate component
export default CurrentDate;
