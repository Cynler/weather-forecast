import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';

const API_KEY = `${process.env.REACT_APP_API_KEY}`;
const CITY_NAME = `BOSTON`;
// const API_CITY_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;
const getCurrentPosition = () => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
const getWeather = (lat, lon) => fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`).then(response => response.json());
const getForecast = (lat, lon) => fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`).then(response => response.json());

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [forecastData, setForecastData] = useState([]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // get Current Weather Data
    useEffect(() => {(async () => {
        const { coords: { latitude, longitude } } = await getCurrentPosition();
        const weather = await getWeather(latitude, longitude);
        const forecast = await getForecast(latitude, longitude);
        setWeatherData(weather);
        setForecastData(forecast);
        setLat(latitude);
        setLon(longitude);
    })()}, []);


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
            <main>
                <section className="current-weather">
                    <h2>Current Weather</h2>
                    <CurrentWeather currentData={weatherData}/>
                </section>
                <section className="forecast">
                    <h2>Weather Forecast</h2>
                    <ForecastWeather forecastData={forecastData}/>
                </section>
            </main>
            <footer>
                <p>Weather Forecasting Website &copy; 2023</p>
            </footer>
        </div>
    );
}

export default App;
