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
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const loadedCities = locationData.Lebanon_Coastal_Cities;
        setCities(loadedCities);

        // Try to get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ city: 'Your Location', latitude, longitude });
                    setLatitude(latitude);
                    setLongitude(longitude);
                    setSelectedCity('Your Location');
                },
                () => {
                    // Fallback to first city in list if location access is denied
                    if (loadedCities.length > 0) {
                        setLatitude(loadedCities[0].latitude);
                        setLongitude(loadedCities[0].longitude);
                        setSelectedCity(loadedCities[0].city);
                    }
                }
            );
        }
    }, []);

    const handleCityChange = (e) => {
        const cityName = e.target.value;
        if (cityName === 'Your Location' && userLocation) {
            setLatitude(userLocation.latitude);
            setLongitude(userLocation.longitude);
            setSelectedCity(cityName);
        } else {
            const selectedCity = cities.find(city => city.city === cityName);
            if (selectedCity) {
                setLatitude(selectedCity.latitude);
                setLongitude(selectedCity.longitude);
                setSelectedCity(cityName);
            }
        }
    };

    return (
        <>
            <div className='MainDisplay'>
                <select onChange={handleCityChange} value={selectedCity}>
                    {userLocation && (
                        <option value="Your Location">Your Location</option>
                    )}
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
