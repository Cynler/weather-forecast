import React from 'react';
import './App.css';

function App() {
    const forecastData = [
        { date: 'Mon', conditions: 'Cloudy', temperature: '70\u00B0F' },
        { date: 'Tue', conditions: 'Rainy', temperature: '63\u00B0F' },
        { date: 'Wed', conditions: 'Sunny', temperature: '75\u00B0F' },
        { date: 'Thu', conditions: 'Partly Cloudy', temperature: '66\u00B0F' },
        { date: 'Fri', conditions: 'Windy', temperature: '68\u00B0F' },
        { date: 'Sat', conditions: 'Rainy', temperature: '61\u00B0F' },
        { date: 'Sun', conditions: 'Sunny', temperature: '73\u00B0F' },
    ];

    return (
        <div className="App">
            <header>
                <h1>Weather Forecast</h1>
            </header>
            <main>
                <section className="current-weather">
                    <h2>Current Weather</h2>
                    <div className="weather-details">
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
