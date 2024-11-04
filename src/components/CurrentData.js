import React, { useState, useEffect } from 'react';
import currentStateImages from './CurrentStateImages.json';
import Arrow from './images/gps.png';

const CurrentData = ({long, lat, cityname}) => {
    const [temp, setTemp] = useState(null);
    const [dayOrNight, setDayOrNight] = useState(null);
    const [weatherCode, setWeatherCode] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [windDirection, setWindDirection] = useState(null);
    const [error, setError] = useState(null);
    const [weatherImage, setWeatherImage] = useState(null);

    const getCurrentData = () => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok!');
                }
                return response.json();
            })
            .then(data => {
                setTemp(data.current.temperature_2m);
                setDayOrNight(data.current.is_day);
                setWeatherCode(data.current.weather_code);
                setWindSpeed(data.current.wind_speed_10m);
                setWindDirection(data.current.wind_direction_10m);
                setWeatherImage(getWeatherImage(data.current.is_day, data.current.weather_code));
            })
            .catch(error => {
                setError(error.message);
            });
    };

    const getWeatherImage = (isDay, weatherCode) => {
        const timeOfDay = isDay ? 'day' : 'night';
        const weatherConditions = {
            0: 'clear',        
            1: 'partly_cloudy',
            2: 'cloudy',       
            3: 'rain',         
            4: 'snow'          
        };
        
        const condition = weatherConditions[weatherCode];
        return currentStateImages[timeOfDay][condition] || null;
    };

    useEffect(() => {
        getCurrentData();
    }); 

    return (
        <div className='CurrentDataDiv'>
            <div className='CurrentDataDivChild'>
                <h2>{cityname}</h2>
            {error && <p>Error: {error}</p>}
            <div className='CurrentDataTemp'>{temp !== null ? `${temp} °C` : 'Loading...'}</div>
            <div className='CurrentDataWind'>Wind Speed: {windSpeed !== null ? `${windSpeed} km/h` : 'Loading...'}
            <img src={Arrow} alt="arrow" 
                style={{
                    transform: `rotate(${windDirection}deg)`,
                    transition: 'transform 0.5s',
                    width: '50px',
                    height: 'auto',
                    padding: '10px',
                    marginLeft: '50px'
                }}
                title = {windDirection}
            />
            </div>
            </div>
            <div className='CurrentDataDivChild'>
            {weatherImage && <img src={weatherImage} alt="Weather condition" />}
            </div>
        </div>
    );
};

export default CurrentData;
