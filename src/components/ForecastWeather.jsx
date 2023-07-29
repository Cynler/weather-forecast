import React, { useState } from 'react';
import './ForecastWeather.css';
import findIcon from './findIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

const ForecastWeather = ({ forecastData }) => {
    if (!forecastData || forecastData.length === 0) {
        return <div>Loading forecast...</div>;
    }

    const forecastList = forecastData.list.map((item, index) => ({
        date: item?.dt,
        temp: item?.main?.temp,
        cond: item?.weather?.[0]?.main,
    })).filter((item, index) => index % 8 === 0);

    const dateToWords = (date) => {
        date = new Date(date * 1000).toLocaleDateString("en", { month: "short", day: "numeric", });
        return `${date}`;
    };

  return (
    <div className="forecast-list">
        {forecastList.map((item, index) => (
            <div className="forecast-item" key={index}>
                <p className="date">{dateToWords(item.date)}</p>
                <FontAwesomeIcon icon={["fas", findIcon(item.cond)]} className="current-weather__icon" />
                <p className="temperature">{item.temp} °C</p>
                <p className="conditions">{item.cond}</p>
            </div>
        ))}
    </div>
    );
};

export default ForecastWeather;
