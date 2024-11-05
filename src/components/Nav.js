import React, { useState, useEffect } from "react";
import './styles/Nav.css';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
            if (window.innerWidth > 600) {
                setIsOpen(false); // Close menu if switching back to desktop view
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="NavContainer">
            {isMobile && (
                <button className={`NavToggle ${isMobile && isOpen ? "NavToggleOpen" : ""}`} onClick={toggleMenu}>
                    ☰ Menu
                </button>
            )}
            <ul className={`NavList ${isMobile && isOpen ? "open" : ""}`}>
                <li><a href="/">Home</a></li>
                <li><a href="/predictions">Predictions</a></li>
                <li><a href="/impact">Impact</a></li>
                <li><a href="#">History</a></li>
                <li><a href="#">Navigational Hazards</a></li>
            </ul>
        </nav>
    );
}

export default Nav;
