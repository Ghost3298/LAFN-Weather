import React, { useState, useEffect } from "react";
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

    // Function to categorize impact based on H/L ratio
    const getImpact = (waveHeight, vesselLength) => {
        const ratio = waveHeight / vesselLength;

        if (ratio < 0.1) return 'Low Impact';
        if (ratio >= 0.1 && ratio <= 0.3) return 'Medium Impact';
        return 'High Impact';
    };

    // Function to get the corresponding color for each impact level
    const getImpactColor = (impact) => {
        switch (impact) {
            case 'Low Impact':
                return 'green';
            case 'Medium Impact':
                return 'orange';
            case 'High Impact':
                return 'red';
            default:
                return 'black';
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
                
                <div className="ImpactDetails">
                    <p title="Wave Height"><img src={WaveHeightImg} alt="wave height" /> {waveHeight || "N/A"}</p>
                    <p title="Wave Direction"><img src={WaveDirectionImg} alt="wave direction" 
                        style={{
                            transform: `rotate(${waveDirection-90}deg)`,
                            transition: 'transform 0.5s',
                        }}
                    />{waveDirection || "N/A"}</p>
                    <p title="Wave Period"><img src={WavePeriodImg} alt="wave period" /> {wavePeriod || "N/A"}</p>
                </div>
            </div>

            <div className="ImpactData">
                <table>
                    <thead>
                        <tr>
                            <th>Vessel Length</th>
                            <th>Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { length: 5 },
                            { length: 10 },
                            { length: 20 },
                            { length: 50 },
                            { length: 100 }
                        ].map((vessel, index) => {
                            const impact = getImpact(waveHeight, vessel.length);
                            return (
                                <tr key={index}>
                                    <td>&lt;{vessel.length}m</td>
                                    <td style={{ color: getImpactColor(impact) }}>{impact}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Impact;
