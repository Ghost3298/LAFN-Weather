import React, { useState, useEffect } from 'react';
import currentStateImages from './CurrentStateImages.json';
import SunsetImg from './images/sunset.png';
import SunriseImg from './images/sunrise.png';

const WeeklyForecast = ({ lon, lat }) => {
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getWeeklyForecast = async () => {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,sunrise,sunset&timezone=auto`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setForecastData(data.daily);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getWeeklyForecast();
    }, [lat, lon]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="WeeklyForecastDisplay">
            {forecastData && (
                <ul className="WeeklyForecastList">
                    {forecastData.weather_code.map((weatherCode, index) => {
                        const weatherKey = weatherCode === 0 || weatherCode === 1 ? "clear" : weatherCode === 2 ? "partly_cloudy" : weatherCode === 3 ? "cloudy" : weatherCode === 4 ? "rain" : "snow";
                        return (
                            <li className="WeeklyForecastData" key={index}>
                                <div className="forecastItem">
                                    <img
                                        src={currentStateImages.day[weatherKey]}
                                        alt="Weather Icon"
                                        className="weather-icon"
                                    />
                                    <div className="forecastDetails">
                                        <p>{formatDate(forecastData.time[index])}</p>
                                        <p> {forecastData.temperature_2m_max[index]}°C</p>
                                        <p>
                                            <img src={SunriseImg} alt="sunrise"/>
                                            {new Date(forecastData.sunrise[index]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p>
                                            <img src={SunsetImg} alt="sunset"/>
                                            {new Date(forecastData.sunset[index]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default WeeklyForecast;
