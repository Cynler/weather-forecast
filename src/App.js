import React, { useState } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faCloudSun, faWind } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const forecastData = [
        { date: 'Mon', conditions: 'Cloudy', temperature: '70\u00B0F', icon: faCloud },
        { date: 'Tue', conditions: 'Rainy', temperature: '63\u00B0F', icon: faCloudRain },
        { date: 'Wed', conditions: 'Sunny', temperature: '75\u00B0F', icon: faSun },
        { date: 'Thu', conditions: 'Partly Cloudy', temperature: '66\u00B0F', icon: faCloudSun },
        { date: 'Fri', conditions: 'Windy', temperature: '68\u00B0F', icon: faWind },
        { date: 'Sat', conditions: 'Rainy', temperature: '61\u00B0F', icon: faCloudRain },
        { date: 'Sun', conditions: 'Sunny', temperature: '73\u00B0F', icon: faSun },
    ];

    return (
        <div className="App">
            <nav>
                <div className="logo">Weather App</div>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for a location..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <button onClick={() => alert(`Searching for: ${searchTerm}`)}>
                        Search
                    </button>
                </div>
            </nav>
            <header>
                <h1>Weather Forecast</h1>
            </header>
            <main>
                <section className="current-weather">
                    <h2>Current Weather</h2>
                    <div className="weather-details">
                        <FontAwesomeIcon icon={faSun} size="4x" className="weather-icon sunny" />
                        <div className="temperature">73&deg;F</div>
                        <div className="conditions">Sunny</div>
                        <div className="location">Boston, MA</div>
                    </div>
                </section>
                <section className="forecast">
                    <h2>7-Day Forecast</h2>
                    <div className="forecast-list">
                        {forecastData.map((day, index) => (
                            <div className="forecast-item" key={index}>
                                <FontAwesomeIcon icon={day.icon} size="2x" className={`weather-icon ${day.conditions.toLowerCase()}`} />
                                <div className="date">{day.date}</div>
                                <div className="conditions">{day.conditions}</div>
                                <div className="temperature">{day.temperature}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <footer>
                <p>Weather Forecasting Website &copy; 2023</p>
            </footer>
        </div>
    );
}

export default App;
