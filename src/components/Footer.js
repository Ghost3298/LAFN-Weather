import React from 'react';
import Logo from './images/Logo.png';
import LAF from './images/LAF.png';
import Navy from './images/bahriye-removebg-preview.png';

const Footer = () => {
    return(
        <div className="Footer">
            <a href="/contactUs">
                <img src={Logo} alt="LNHS"/>
            </a>
            <a href="https://www.lebarmy.gov.lb" target="_blank" rel="noreferrer">
            <img src={LAF} alt="LAF"/>
            </a>
            <a href="#">
            <img src={Navy} alt="Navy"/>
            </a>
        </div>
    )
}

export default Footer;