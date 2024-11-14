import React from 'react';

const ForecastDay = ({date, img, temp, code, windSpeed, windDir, waveHeight, waveDir, waveTime}) =>{
    return(
        <div className='ForecastDayDiv CurrentWeatherDiv'>
            <div className="CurrentWeatherDate">
                <p>{date}</p>
            </div>
            <div className="CurrentWeatherImg">
                {<span id="ForecastDayImg">{img}</span>}
            </div>
            <div className="CurrentWeatherTemp">
                <p>{temp}°C</p>
            </div>
            <div className="CurrentWeatherCode">
                <p>{code}</p>
            </div>
            <div className="CurrentWeatherSunrise">
                <p>Wave:</p>
                <table style={{width : '100%'}}>
                <tr>
                <td style={{textAlign: 'left'}}> Height:</td><td style={{textAlign:'right'}}> {waveHeight}m</td>
                </tr>
                <tr>
                <td style={{textAlign: 'left'}}> Direction:</td><td style={{textAlign:'right'}}> {waveDir}°</td>
                </tr>
                <tr>
                <td style={{textAlign: 'left'}}> Period: </td><td style={{textAlign:'right'}}> {waveTime}s</td>
                </tr>
                </table>
            </div>
            <div className="CurrentWeatherWind">
                <p>Wind:</p>
                <p>{windSpeed} KM/H </p>
                <p> {windDir > 180 ? `${windDir - 180}°` : `${windDir + 180}°`} </p>
            </div>
        </div>
    )
};

export default ForecastDay;