import React, { useState, useEffect } from 'react';
import currentStateImages from './CurrentStateImages.json';
import Sunset from './images/sunset.png';
import Sunrise from './images/sunrise.png';
import locationData from './Locations.json'; 

const CurrentWeather = () => {
    const [location, setLocation] = useState({ lat: 33.8938, lon: 35.5018 }); // Default to Beirut, Lebanon
    const [error, setError] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [windDirection, setWindDirection] = useState(null);
    const [weatherError, setWeatherError] = useState(null);
    const [weatherImage, setWeatherImage] = useState(null);
    const [temp, setTemp] = useState(null);
    const [dayOrNight, setDayOrNight] = useState(null);
    const [weatherCode, setWeatherCode] = useState(null);
    const [sunrise, setSunrise] = useState(null);
    const [sunset, setSunset] = useState(null);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const weatherConditions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Cloudy',
        45: 'Fog',
        48: 'Freezing fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Heavy drizzle',
        56: 'Light freezing drizzle',
        57: 'Heavy freezing drizzle',
        61: 'Light rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Light snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Light showers',
        81: 'Moderate showers',
        82: 'Heavy showers',
        85: 'Light snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorms',
        96: 'Thunderstorms with hail',
        99: 'Severe thunderstorms with hail'
    };    

    const getCurrentData = () => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset&timezone=auto`)
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
                
                // Setting sunrise and sunset from daily data, assuming only one day of data returned
                setSunrise(data.daily.sunrise[0]);
                setSunset(data.daily.sunset[0]);
            })
            .catch(error => {
                setWeatherError(error.message);
            });
    };

    const getWeatherImage = (isDay, weatherCode) => {
        const timeOfDay = isDay ? 'day' : 'night';
        const condition = weatherConditions[weatherCode];
        return currentStateImages[timeOfDay][condition] || null;
    };

    useEffect(() => {
        const loadedCities = locationData.Lebanon_Coastal_Cities;
    setCities(loadedCities);

    const fetchLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        setError("Location permission was denied; showing default (Beirut).");
                    }
                    if (loadedCities.length > 0) {
                        setLocation({
                            lat: loadedCities[0].latitude,
                            lon: loadedCities[0].longitude,
                        });
                        setSelectedCity(loadedCities[0].city);
                    }
                }
            );
        } else {
            setError("Geolocation is not supported by this browser; showing default (Beirut).");
        }
    };

    fetchLocation();
    }, []);

    useEffect(() => {
        getCurrentData();
    }, [location]);

    const handleCityChange = (e) => {
        const cityName = e.target.value;
        if (cityName === 'Your Location' && location) {
            setLocation({
                lat: location.lat,
                lon: location.lon
            });
            setSelectedCity(cityName);
        } else {
            const selectedCity = cities.find(city => city.city === cityName);
            if (selectedCity) {
                setLocation({
                    lat: selectedCity.latitude,
                    lon: selectedCity.longitude
                });
                setSelectedCity(cityName);
            }
        }
    };

    return (
        <div className="CurrentWeatherDiv">
            <div className="CurrentWeatherLocation">
                <select onChange={handleCityChange} value={selectedCity}>
                    <option value="Your Location">Your Location</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city.city}>
                            {city.city}
                        </option>
                    ))}
                </select>
            </div>
            <div className="CurrentWeatherDate">
                <p>{formattedDate}</p>
            </div>
            <div className="CurrentWeatherImg">
                {weatherImage && <span style={{fontSize: '7.5rem'}}>{weatherImage}</span>}
            </div>
            <div className="CurrentWeatherTemp">
                <p>{temp}°C</p>
            </div>
            <div className="CurrentWeatherCode">
                <p>{weatherConditions[weatherCode]}</p>
            </div>
            <div className="CurrentWeatherSunrise">
                <p><img src={Sunrise} alt="Sunrise icon" /> {sunrise && new Date(sunrise).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                <p><img src={Sunset} alt="Sunset icon" /> {sunset && new Date(sunset).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="CurrentWeatherWind">
                <p>Wind:</p>
                <p>{windSpeed} KM/H &nbsp; {windDirection > 180 ? `${windDirection - 180}°` : `${windDirection + 180}°`} </p>
            </div>
        </div>
    );
};

export default CurrentWeather;
