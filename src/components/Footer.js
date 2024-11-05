import React, { useState, useEffect } from 'react';
import './styles/Footer.css';
import Logo from './images/Logo.png';

const Footer = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="Footer">
            <a href="/aboutUs" style={{textDecoration: "none",}}>
            <img src={Logo} alt="Logo" />
            {isMobile && <p>Lebanese Navy Hydrographic Service</p>}
            </a>
        </div>
    );
};

export default Footer;
