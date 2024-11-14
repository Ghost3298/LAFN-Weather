import React, { useState, useEffect } from 'react';
import locationData from './Locations.json';
import currentStateImages from './CurrentStateImages.json';
import ForecastDay from './ForecastDay';

const Forecast = () => {
    const [forecastData, setForecastData] = useState(null);
    const [marineData, setMarineData] = useState(null);
    const [error, setError] = useState(null);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [location, setLocation] = useState({ lat: 33.8938, lon: 35.5018 }); // Default to Beirut, Lebanon

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

    useEffect(() => {
        const loadedCities = locationData.Lebanon_Coastal_Cities;
        setCities(loadedCities);

        // Fetch weather forecast data
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=weather_code,temperature_2m_max,sunrise,sunset,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`)
            .then((response) => response.json())
            .then((data) => {
                setForecastData(data);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                setError("Error fetching weather data.");
            });

        // Fetch marine data
        fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${location.lat}&longitude=${location.lon}&daily=wave_height_max,wave_direction_dominant,wave_period_max&timezone=auto`)
            .then((response) => response.json())
            .then((data) => setMarineData(data))
            .catch((error) => {
                console.error("Error fetching marine data:", error);
                setError("Error fetching marine data.");
            });
    }, [location.lat, location.lon]);

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

    const getWeatherImage = (weatherCode) => {
        const timeOfDay = 'day';
        const condition = weatherConditions[weatherCode];
        return currentStateImages[timeOfDay][condition] || null;
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    return (
        <div className='ForecastView'>
            <h2>7-Day Forecast for {selectedCity || 'Your Location'}</h2>
            <div className="ForecastLocation">
                <select onChange={handleCityChange} value={selectedCity}>
                    <option value="Your Location">Your Location</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city.city}>
                            {city.city}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p>{error}</p>}

            <div className="ForecastDetails">
                {forecastData && forecastData.daily && forecastData.daily.time && marineData && marineData.daily && marineData.daily.time && (
                    <div>
                        <ul>
                            {forecastData.daily.time.map((time, index) => {
                                const sunrise = new Date(forecastData.daily.sunrise[index]);
                                const sunset = new Date(forecastData.daily.sunset[index]);
                                const currentTime = new Date();
                                const isDayTime = currentTime >= sunrise && currentTime <= sunset;

                                // Get weather icon for the day
                                const weatherIcon = getWeatherImage(forecastData.daily.weather_code[index], isDayTime);

                                return (
                                    <li key={index}>
                                        <ForecastDay
                                            date={formatDate(time)}
                                            img={weatherIcon}
                                            temp={forecastData.daily.temperature_2m_max[index]}
                                            code={weatherConditions[forecastData.daily.weather_code[index]]}
                                            windSpeed={forecastData.daily.wind_speed_10m_max[index]}
                                            windDir={forecastData.daily.wind_direction_10m_dominant[index]}
                                            waveHeight={marineData.daily.wave_height_max[index]}
                                            waveDir={marineData.daily.wave_direction_dominant[index]}
                                            waveTime={marineData.daily.wave_period_max[index]}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Forecast;
