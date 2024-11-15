import React, { useState, useEffect } from "react";
import locationData from './Locations.json';

const History = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null); // City data should be an object
    const [forecastData, setForecastData] = useState(null); // Forecast data state
    const [marineData, setMarineData] = useState(null); // Marine data state
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Set cities from the imported data
        const loadedCities = locationData.Lebanon_Coastal_Cities;
        setCities(loadedCities);
    }, []);

    useEffect(() => {
        // Fetch forecast and marine data if dates and city are selected
        if (startDate && endDate && selectedCity) {
            const validEndDate = new Date(endDate) > new Date('2024-11-14') ? '2024-11-14' : endDate;

            console.log("Fetching forecast data...");
            // Fetch forecast data
            fetch(`https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&start_date=${startDate}&end_date=${validEndDate}&daily=temperature_2m_max,sunrise,sunset,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`)
                .then(response => response.json())
                .then(data => {
                    console.log("Forecast Data Response:", data); // Log the response data
                    if (data && data.daily) {
                        setForecastData(data.daily);
                        console.log("Forecast Data Set:", data.daily); // Log after setting the state
                    } else {
                        setError("Invalid forecast data.");
                        setForecastData(null); // Reset forecastData state
                    }
                })
                .catch(error => {
                    setError("Error fetching weather data.");
                    console.error("Error fetching weather data:", error);
                    setForecastData(null); // Reset on error
                });

            console.log("Fetching marine data...");
            // Fetch marine data
            fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&daily=wave_height_max,wave_direction_dominant,wave_period_max&timezone=auto&start_date=${startDate}&end_date=${validEndDate}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Marine Data Response:", data); // Log the response data
                    if (data && data.daily) {
                        setMarineData(data.daily);
                        console.log("Marine Data Set:", data.daily); // Log after setting the state
                    } else {
                        setError("Invalid marine data.");
                        setMarineData(null); // Reset marineData state
                    }
                })
                .catch(error => {
                    setError("Error fetching marine data.");
                    console.error("Error fetching marine data:", error);
                    setMarineData(null); // Reset on error
                });
        }
    }, [selectedCity, startDate, endDate]);

    const handleCityChange = (e) => {
        const cityName = e.target.value;
        const selectedCityData = cities.find(city => city.city === cityName);
        if (selectedCityData) {
            setSelectedCity(selectedCityData);
        }
    };

    const handleDateChange = (e) => {
        const { id, value } = e.target;
        if (id === "startDate") setStartDate(value);
        if (id === "endDate") setEndDate(value);
    };

    const tabContents = [
        //<div className="tabContent">Tab 1 Content</div>,
        <div className="tabContent">
            {forecastData && marineData ? (
                forecastData.time && marineData.time ? (
                    forecastData.time.map((date, index) => {
                        return (
                            <div key={index} className="dateData">
                                <h3>Date: {date}</h3>
                                <div>
                                    <h4>Weather</h4>
                                    <p>Max Temp: {forecastData.temperature_2m_max[index]}°C</p>
                                    <p>Sunrise: {forecastData.sunrise[index]}</p>
                                    <p>Sunset: {forecastData.sunset[index]}</p>
                                    <p>Precipitation: {forecastData.precipitation_sum[index]}mm</p>
                                    <p>Wind Speed: {forecastData.wind_speed_10m_max[index]} km/h</p>
                                    <p>Wind Direction: {forecastData.wind_direction_10m_dominant[index]}°</p>
                                </div>
                                <div>
                                    <h4>Marine Data</h4>
                                    <p>Wave Height: {marineData.wave_height_max[index]}m</p>
                                    <p>Wave Direction: {marineData.wave_direction_dominant[index]}°</p>
                                    <p>Wave Period: {marineData.wave_period_max[index]} sec</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>Data is still loading...</p>
                )
            ) : (
                <p>Please select a city, start date and end date to get the data <br/> History starts from 1<sup>st</sup> January 2023</p>
            )}
        </div>
    ];

    return (
        <div className="HistoryView">
            <div className="HistoryHead">
                <div>
                    <label>City:</label>
                    <label>Start Date:</label>
                    <label>End Date:</label>
                </div>
                <div>
                    <select onChange={handleCityChange} value={selectedCity?.city || ''}>
                        <option value="">Select a City</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city.city}>
                                {city.city}
                            </option>
                        ))}
                    </select>
                    <input type="date" id="startDate" onChange={handleDateChange} value={startDate} max={new Date().toISOString().split("T")[0]}/>
                    <input type="date" id="endDate" onChange={handleDateChange} value={endDate} max={new Date().toISOString().split("T")[0]}/>
                </div>
            </div>

            <div className="tabs">
                {/*<button onClick={() => setActiveTab(0)} className={activeTab === 0 ? "active" : ""}>
                    Tide
                </button>*/}
                <button onClick={() => setActiveTab(0)} className={activeTab === 1 ? "active" : ""}>
                    Weather
                </button>
            </div>

            <div className="tab-content">
                {tabContents[activeTab]}
            </div>

            {error && <div className="error">{error}</div>} {/* Display error if any */}
        </div>
    );
};

export default History;
