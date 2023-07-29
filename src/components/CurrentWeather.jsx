import "./CurrentWeather.css";
import findIcon from './findIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

library.add(fas)
// Function to find the correct icon for the current weather condition

const CurrentWeather = ({currentData}) => {
  // Show a loading message or any placeholder content while forecastData is not available
  if (!currentData) {
      return <div>Loading forecast...</div>;
  };

  const dateToWords = (date) => {
      date = new Date(date * 1000).toLocaleDateString("en", { month: "short", day: "numeric", });
      return `${date}`;
  };

  return (
    <div className="weather-details">
      <p className="date">{dateToWords(currentData?.dt)}</p>
      <FontAwesomeIcon icon={["fas", findIcon(currentData?.weather?.[0]?.main)]} className="current-weather__icon" />
      <p className="temperature">{currentData?.main?.temp}°C</p>
      <p className="conditions">{currentData?.weather?.[0]?.main}</p>
      <p className="location">{currentData?.name}</p>
    </div>
  )
};

export default CurrentWeather;
