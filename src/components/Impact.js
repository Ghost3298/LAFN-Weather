import React, { useState, useEffect } from "react";
import './styles/Impact.css';
import locationData from './Locations.json'; 
import WaveHeightImg from './images/sea-level.png';
import WavePeriodImg from './images/time.png';
import WaveDirectionImg from './images/arrow.png';

const Impact = () => {
    const [waveHeight, setWaveHeight] = useState(null);
    const [waveDirection, setWaveDirection] = useState(null);
    const [wavePeriod, setWavePeriod] = useState(null);
    const [error, setError] = useState(null);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [userLocation, setUserLocation] = useState(null);

    function getWaveData() {
        if (lat && lon) {
            fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_direction,wave_period&timezone=auto`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok!');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.current) {
                        setWaveHeight(data.current.wave_height);
                        setWaveDirection(data.current.wave_direction);
                        setWavePeriod(data.current.wave_period);
                    } else {
                        setError('No wave data available.');
                    }
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    }

    useEffect(() => {
        if (locationData && locationData.Lebanon_Coastal_Cities) {
            const loadedCities = locationData.Lebanon_Coastal_Cities;
            setCities(loadedCities);

            // Try to get user's current location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ city: 'Your Location', latitude, longitude });
                        setLat(latitude);
                        setLon(longitude);
                        setSelectedCity('Your Location');
                    },
                    () => {
                        // Fallback to first city in list if location access is denied
                        if (loadedCities.length > 0) {
                            const firstCity = loadedCities[0];
                            setLat(firstCity.latitude);
                            setLon(firstCity.longitude);
                            setSelectedCity(firstCity.city);
                        }
                    }
                );
            }
        } else {
            setError("Location data not available.");
        }
    }, []);

    useEffect(() => {
        getWaveData();
    }, [lat, lon]);

    const handleCityChange = (e) => {
        const cityName = e.target.value;
        if (cityName === 'Your Location' && userLocation) {
            setLat(userLocation.latitude);
            setLon(userLocation.longitude);
            setSelectedCity(cityName);
        } else {
            const selectedCityData = cities.find(city => city.city === cityName);
            if (selectedCityData) {
                setLat(selectedCityData.latitude);
                setLon(selectedCityData.longitude);
                setSelectedCity(cityName);
            }
        }
    };

    return (
        <div className="ImpactDisplay">
            <div className="ImpactHeader">
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
                
                {error && <p className="error">{error}</p>}
                 
                <p title="Wave Height"><img src={WaveHeightImg} alt="wave height" /> {waveHeight || "N/A"}</p>
                <p title="Wave Direction"><img src={WaveDirectionImg} alt="wave direction" 
                    style={{
                        transform: `rotate(${waveDirection-90}deg)`,
                        transition: 'transform 0.5s',
                    }}
                />{waveDirection || "N/A"}</p>
                <p title="Wave Period"><img src={WavePeriodImg} alt="wave period" /> {wavePeriod || "N/A"}</p>
            </div>

            <div className="ImpactData">
                <table>
                    <thead>
                        <tr>
                            <td>Vessel</td>
                            <td>Impact</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>LCU</td>
                            <td>
                                {waveHeight > 1.5 ? (
                                    <span style={{ color: 'red' }}>High Impact</span>
                                ) : waveHeight > 1 ? (
                                    <span style={{ color: 'orange' }}>Medium Impact</span>
                                ) : (
                                    <span style={{ color: 'green' }}>Low Impact</span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>PB</td>
                            <td>
                                {waveHeight > 1.2 ? (
                                    <span style={{ color: 'red' }}>High Impact</span>
                                ) : waveHeight > 0.7 ? (
                                    <span style={{ color: 'orange' }}>Medium Impact</span>
                                ) : (
                                    <span style={{ color: 'green' }}>Low Impact</span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>RHIB</td>
                            <td>
                                {waveHeight > 0.8 ? (
                                    <span style={{ color: 'red' }}>High Impact</span>
                                ) : waveHeight > 0.4 ? (
                                    <span style={{ color: 'orange' }}>Medium Impact</span>
                                ) : (
                                    <span style={{ color: 'green' }}>Low Impact</span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Hydrographic Services</td>
                            <td>
                                {waveHeight > 1.0 ? (
                                    <span style={{ color: 'red' }}>High Impact</span>
                                ) : waveHeight > 0.5 ? (
                                    <span style={{ color: 'orange' }}>Medium Impact</span>
                                ) : (
                                    <span style={{ color: 'green' }}>Low Impact</span>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Impact;
