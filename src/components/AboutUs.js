import React from 'react';
import Logo from './images/Logo.png';
import './styles/AboutUs.css';

const AboutUs = () => {
    return (
        <div className="ImpactDisplay aboutUs">
            <img src={Logo}/>
            <p>
                LNHS was established within the Lebanese Armed Forces - Navy in 2014.<br/>
                Designated as the National Point of Contact for all hydrographic and safety of Navigation related issues. Started following a capacity building program under the supervision of the Italian Hydrographic Institute since 2014.
            </p>
        </div>
    )
}

export default AboutUs;