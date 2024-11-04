import React, { useState, useEffect } from 'react';
import CurrentData from './CurrentData';
import WeeklyForecast from './WeeklyForecast';
import locationData from './Locations.json'; 
import './styles/Main.css';

const Main = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const loadedCities = locationData.Lebanon_Coastal_Cities;
        setCities(loadedCities);

        if (loadedCities.length > 0) {
            setSelectedCity(loadedCities[0].city);
            setLatitude(loadedCities[0].latitude);
            setLongitude(loadedCities[0].longitude);
        }
    }, []);

    const handleCityChange = (e) => {
        const cityName = e.target.value;
        const selectedCity = cities.find(city => city.city === cityName);
        
        if (selectedCity) {
            setLatitude(selectedCity.latitude);
            setLongitude(selectedCity.longitude);
            setSelectedCity(cityName);
        }
    };

    return (
        <>
        <div className='MainDisplay'>
            <select onChange={handleCityChange} defaultValue={cities.length > 0 ? cities[0].city : ''}>
                {cities.map((city, index) => (
                    <option key={index} value={city.city}>
                        {city.city}
                    </option>
                ))}
            </select>
            {latitude && longitude && (
                <>
                    <CurrentData cityname={selectedCity} long={longitude} lat={latitude} />
                </>    
            )}
        </div>
        {latitude && longitude && (
                <>
                    <WeeklyForecast lon={longitude} lat={latitude} />
                </>    
            )}
        </>
    );
};

export default Main;
