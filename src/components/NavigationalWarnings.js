import React, { useState, useEffect } from 'react';
import Warnings from './NavigationalWarnings.json';
import WarningImages from './NavigationalWarningSigns.json';
import { useTranslation } from 'react-i18next';

const NavigationalWarnings = () => {
    const { i18n } = useTranslation(); // Get the current language
    const [warnings, setWarnings] = useState([]);
    const currentLanguage = i18n.language || 'en'; // Default to English if no language is set

    useEffect(() => {
        // Get warnings for the current language
        const languageWarnings = Warnings[currentLanguage];
        if (!languageWarnings || !Array.isArray(languageWarnings)) {
            console.error(`No warnings found for language: ${currentLanguage}`);
            setWarnings([]);
            return;
        }

        // Filter warnings based on active status and expiry date
        const today = new Date();
        const filteredWarnings = languageWarnings.filter(warning => {
            const isActive = warning.status?.toLowerCase() === "active";
            const isNotExpired = warning.expiryDate && new Date(warning.expiryDate) >= today;
            return isActive && isNotExpired;
        });

        setWarnings(filteredWarnings);
    }, [currentLanguage]);

    return (
        <div className="NavigationalDisplay">
            {warnings.map((warning, index) => {
                // Get the warning image based on the language and type
                const warningImage = WarningImages[currentLanguage][warning.type] || WarningImages[currentLanguage]["default-warning"];

                return (
                    <div key={index} className="warning">
                        <img 
                            src={warningImage} 
                            alt={`${warning.type} warning`} 
                            className="warning-image"
                        />
                        <div className="warningDetails">
                            <p>
                                <span style={{ color: "red", fontWeight: "bold" }}>
                                    {warning.type || "N/A"}
                                </span>
                                <br />
                                {warning.description || "No description available."}
                            </p>
                            <p style={{ fontSize: '0.75em' }}>
                                {warning.issuedDate || "N/A"} &nbsp; {"->"} &nbsp;
                                {warning.expiryDate || "N/A"}
                            </p>
                            {warning.geometry?.coordinates && (
                                <p style={{ fontSize: '0.8em' }}>
                                    Coordinates: {JSON.stringify(warning.geometry.coordinates)}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default NavigationalWarnings;
