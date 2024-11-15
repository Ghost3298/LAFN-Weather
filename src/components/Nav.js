import React, { useState, useEffect } from "react";
import Logo from './images/Logo.png';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 884);
            if (window.innerWidth > 884) {
                setIsOpen(false); 
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="Navbar">
            {!isOpen && <a href="/"><img src={Logo} alt="LNHS" /></a>}
            {isMobile && (
                <button 
                    className={`NavToggle ${isMobile && isOpen ? "NavToggleOpen" : ""}`} 
                    onClick={toggleMenu}
                >
                    ☰ Menu
                </button>
            )}
            <ul className={`NavList ${isMobile && isOpen ? "open" : ""}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/forecast">Forecast</a></li>
                <li><a href="/impact">Impact</a></li>
                <li><a href="/history">History</a></li>
                <li><a href="/navigational-warnings">Navigational Warnings</a></li>
                <li><a href="/documentations">Nautical Charts & Documentations</a></li>
                <li><a href="/contactUs">Contact Us</a></li>
            </ul>
        </nav>
    );
};

export default Nav;
