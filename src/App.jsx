import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';
import TempChart from './components/Graph';

const API_KEY = `${process.env.REACT_APP_API_KEY}`;
// const API_CITY_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`;
const getCurrentPosition = () => new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
const getWeather = (lat, lon) => fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`).then(response => response.json());
const getForecast = (lat, lon) => fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`).then(response => response.json());

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [lat, setLat] = useState('44.34');
    const [lon, setLon] = useState('10.99');
    const [weatherData, setWeatherData] = useState([]);
    const [forecastData, setForecastData] = useState([]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // get Current Weather Data
    useEffect(() => {(async () => {
        try {
            const { coords: { latitude, longitude } } = await getCurrentPosition();
            const weather = await getWeather(latitude, longitude);
            const forecast = await getForecast(latitude, longitude);
            setWeatherData(weather);
            setForecastData(forecast);
            setLat(latitude);
            setLon(longitude);
        } catch (e) {
            // default setting
            setWeatherData(await getWeather('44.34','10.99'));
            setForecastData(await getForecast('44.34','10.99'));
        }
    })()}, []);

    const fetchSearchData = async () => {
        // Make the API call with the searchTerm
        const API_URL_1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}&units=metric`;
        const API_URL_2 = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${API_KEY}&units=metric`;

        try {
            const response_1 = await fetch(API_URL_1);
            const response_2 = await fetch(API_URL_2);
            setWeatherData(await response_1.json());
            setForecastData(await response_2.json());
        }
        catch (e) {
            console.error('Error fetching weather and/or forecast data:', e.message);
            alert(`Be better at spelling, what is: ${searchTerm} ?`);
            // default setting: This doesn't work
            setWeatherData(await getWeather('44.34','10.99'));
            setForecastData(await getForecast('44.34','10.99'));
        }
    };

    const hours = forecastData?.list?.map((x) => new Date(x.dt_txt).getHours()) ?? [];
    const temps = forecastData?.list?.map((x) => x.main.temp) ?? [];

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
                    <button onClick={fetchSearchData}>
                        Search
                    </button>
                </div>
            </nav>
            <main>
                <section className="current-weather">
                    <h2>Current Weather</h2>
                    <CurrentWeather currentData={weatherData}/>
                </section>
                <section className="graph-section">
                  <TempChart hours={hours} temps={temps}/>
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
