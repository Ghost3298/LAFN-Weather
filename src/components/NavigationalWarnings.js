import React, { useState, useEffect } from 'react';
import Warnings from './NavigationalWarnings.json';
import WarningImages from './NavigationalWarningSigns.json';

const NavigationalWarnings = () => {
    const [warnings, setWarnings] = useState([]);

    useEffect(() => {
        // Filter the warnings based on active status and expiry date
        const today = new Date();
        const activeWarnings = Warnings.filter(warning => {
            const isActive = warning.status?.toLowerCase() === "active";
            const isNotExpired = warning.expiryDate && new Date(warning.expiryDate) >= today;
            return isActive && isNotExpired;
        });

        setWarnings(activeWarnings);
    }, []);

    return (
        <div className='NavigationalDisplay'>
            {warnings.map((warning, index) => {
                // Get the image based on the warning type
                const warningImage = WarningImages[0][warning.type] || "images/default-warning.png";

                return (
                    <div key={index} className="warning">
                        <img 
                            src={warningImage} 
                            alt={`${warning.type} warning`} 
                            className="warning-image"
                        />
                        <div className="warningDetails">
                        <p><span  style={{color: "red", fontWeight: "bold"}} >{warning.type || "N/A"} </span><br/>
                        {warning.description || "No description available."}</p>
                        <p> {warning.issuedDate || "N/A"} &nbsp; {"->"} &nbsp;
                            {warning.expiryDate || "N/A"}</p>
                        {warning.geometry?.coordinates && (
                            <p>Coordinates: {JSON.stringify(warning.geometry.coordinates)}</p>
                        )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default NavigationalWarnings;
