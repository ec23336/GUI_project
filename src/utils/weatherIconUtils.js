/**
 * Determines if it's currently daytime or nighttime based on sunset time
 * @param {number} sunset - Sunset time in Unix timestamp (seconds)
 * @returns {boolean} - True if it's daytime, false if it's nighttime
 */
export const isDaytime = (sunset) => {
  // If sunset information is not available, default to daytime
  if (!sunset) return true;
  
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return currentTime < sunset;
};

/**
 * Maps weather condition codes to icon names
 * @param {number} conditionCode - Weather condition code from API
 * @param {boolean} isDay - Whether it's daytime or nighttime
 * @returns {string} - Icon name to use
 */
export const getWeatherIconName = (conditionCode, isDay = true) => {
  // Prefix for night icons
  const timePrefix = isDay ? '' : 'night-';
  
  // Map condition codes to icon names
  if (conditionCode >= 200 && conditionCode < 300) {
    return `${timePrefix}thunderstorm`; // Thunderstorm
  } else if (conditionCode >= 300 && conditionCode < 400) {
    return `${timePrefix}drizzle`; // Drizzle
  } else if (conditionCode >= 500 && conditionCode < 600) {
    return `${timePrefix}rain`; // Rain
  } else if (conditionCode >= 600 && conditionCode < 700) {
    return `${timePrefix}snow`; // Snow
  } else if (conditionCode >= 700 && conditionCode < 800) {
    return `${timePrefix}mist`; // Atmosphere (mist, fog, etc.)
  } else if (conditionCode === 800) {
    return isDay ? 'clear' : 'night-clear'; // Clear sky
  } else if (conditionCode > 800) {
    return `${timePrefix}clouds`; // Cloudy
  }
  
  return isDay ? 'default' : 'night-default'; // Default icon
};
