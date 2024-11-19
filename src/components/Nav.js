import React, { useState, useEffect } from "react";
import Logo from './images/Logo.png';
import { useTranslation } from 'react-i18next';


const Nav = () => {
    const { t } = useTranslation();
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

    const { i18n } = useTranslation();

  const switchLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('i18nextLng', newLanguage); // Save the selected language
  };


    return (
        <nav className="Navbar">
            {!isOpen && <a href="/"><img src={Logo} alt="LNHS" /></a>}
            {isMobile && (
                <button 
                    className={`NavToggle ${isMobile && isOpen ? "NavToggleOpen" : ""}`} 
                    onClick={toggleMenu}
                >
                    ☰ {t('Menu')}
                </button>
            )}
            <ul className={`NavList ${isMobile && isOpen ? "open" : ""}`}>
                <li><a href="/">{t('Home')}</a></li>
                <li><a href="/forecast">{t('Forecast')}</a></li>
                <li><a href="/impact">{t('Impact')}</a></li>
                <li><a href="/history">{t('History')}</a></li>
                <li><a href="/navigational-warnings">{t('Navigational Warnings')}</a></li>
                <li><a href="/documentations">{t('Nautical Charts & Documentations')}</a></li>
                <li><a href="/contactUs">{t('Contact Us')}</a></li>
                <li>
                    <button onClick={switchLanguage}>
                        {i18n.language === 'en' ? 'Ar' : 'En'}
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
